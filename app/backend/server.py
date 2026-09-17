from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import uuid
import logging
from pathlib import Path
from datetime import datetime, timezone
from typing import List
from pydantic import BaseModel, Field, ConfigDict
from fastapi.responses import Response
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import asyncio
import json
from html import escape

import resend

logging.basicConfig(level=logging.INFO)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.getenv('MONGO_URL')
db_name = os.getenv('DB_NAME')
if not mongo_url or not db_name:
    raise RuntimeError('Missing required environment variables: MONGO_URL and DB_NAME')

client = AsyncIOMotorClient(
    mongo_url,
    serverSelectionTimeoutMS=8000,
    connectTimeoutMS=5000,
    socketTimeoutMS=8000,
)
db = client[db_name]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")
GOOGLE_PLACE_ID = os.getenv("GOOGLE_PLACE_ID")
GOOGLE_PLACE_QUERY = "7 Plus Fitness Gym, Sithalapakkam"
OWNER_EMAIL = os.getenv("OWNER_EMAIL")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "onboarding@resend.dev")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def clean(value, max_len=120):
    return str(value).strip()[:max_len]


EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')


class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    class_id: str = ""
    class_name: str = ""
    day: str = ""
    time: str = ""
    trainer: str = ""
    name: str
    email: str
    phone: str
    experience: str = "Beginner"
    created_at: str = Field(default_factory=now_iso)


class ReservationCreate(BaseModel):
    class_id: str
    class_name: str = ""
    day: str = ""
    time: str = ""
    trainer: str = ""
    name: str
    email: str
    phone: str
    experience: str = "Beginner"


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    goal: str = "General Fitness"
    preferred_time: str = ""
    message: str = ""
    created_at: str = Field(default_factory=now_iso)


class InquiryCreate(BaseModel):
    name: str
    phone: str
    email: str
    goal: str = "General Fitness"
    preferred_time: str = ""
    message: str = ""


class LeadCreate(BaseModel):
    name: str
    phone: str
    email: str
    service: str = ""
    goal: str = ""
    date: str = ""
    time: str = ""
    preferred_time: str = ""
    message: str = ""


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    service: str = ""
    goal: str = ""
    date: str = ""
    time: str = ""
    message: str = ""
    created_at: str = Field(default_factory=now_iso)


@api_router.get("/")
async def root():
    return {"status": "ok", "service": "7plus-fitness-api"}


def google_request(endpoint, params):
    query = urlencode({**params, "key": GOOGLE_PLACES_API_KEY})
    request = Request(f"https://maps.googleapis.com/maps/api/{endpoint}?{query}")
    with urlopen(request, timeout=8) as response:
        return json.loads(response.read().decode("utf-8"))


@api_router.get("/google-business")
async def get_google_business():
    if not GOOGLE_PLACES_API_KEY:
        raise HTTPException(status_code=503, detail="Google Places is not configured.")

    try:
        if GOOGLE_PLACE_ID:
            place = await asyncio.to_thread(
                google_request,
                "place/details/json",
                {
                    "place_id": GOOGLE_PLACE_ID,
                    "fields": "name,rating,user_ratings_total,reviews",
                },
            )
            result = place.get("result", {})
        else:
            search = await asyncio.to_thread(
                google_request,
                "place/textsearch/json",
                {"query": GOOGLE_PLACE_QUERY},
            )
            match = (search.get("results") or [None])[0]
            if not match or not match.get("place_id"):
                raise HTTPException(status_code=404, detail="Fitness studio not found on Google.")
            place = await asyncio.to_thread(
                google_request,
                "place/details/json",
                {
                    "place_id": match["place_id"],
                    "fields": "name,rating,user_ratings_total,reviews",
                },
            )
            result = place.get("result", {})

        if place.get("status") not in {None, "OK"}:
            logger.error(
                "Google Places returned status=%s error=%s",
                place.get("status"),
                place.get("error_message", "none"),
            )
            raise HTTPException(status_code=502, detail="Google Places returned an error.")

        reviews = [
            {
                "name": review.get("author_name", "Google user"),
                "rating": review.get("rating", 0),
                "text": review.get("text", ""),
                "photo": review.get("profile_photo_url", ""),
                "relativeTime": review.get("relative_time_description", ""),
            }
            for review in result.get("reviews", [])
            if review.get("rating", 0) in {4, 5}
        ]
        return {
            "name": result.get("name", GOOGLE_PLACE_QUERY),
            "rating": result.get("rating"),
            "reviewCount": result.get("user_ratings_total", 0),
            "reviews": reviews,
        }
    except HTTPException:
        raise
    except Exception:
        logger.exception("Google Places request failed")
        raise HTTPException(status_code=502, detail="Could not load Google business data.")


@api_router.get("/google-review-photo")
async def get_google_review_photo(photo_reference: str):
    if not GOOGLE_PLACES_API_KEY or not photo_reference:
        raise HTTPException(status_code=404, detail="Review photo unavailable.")
    try:
        body = await asyncio.to_thread(
            lambda: urlopen(
                Request(
                    "https://maps.googleapis.com/maps/api/place/photo?"
                    + urlencode({"maxwidth": 160, "photo_reference": photo_reference, "key": GOOGLE_PLACES_API_KEY})
                ),
                timeout=8,
            ).read()
        )
        return Response(content=body, media_type="image/jpeg", headers={"Cache-Control": "public, max-age=86400"})
    except Exception:
        raise HTTPException(status_code=404, detail="Review photo unavailable.")


def lead_email_html(lead: Lead):
    rows = [
        ("Name", lead.name),
        ("Phone", lead.phone),
        ("Email", lead.email),
        ("Service", lead.service or lead.goal or "Not specified"),
        ("Date", lead.date or "Not specified"),
        ("Time", lead.time or "Not specified"),
        ("Message", lead.message or "Not provided"),
    ]
    cells = "".join(
        f"<tr><td style='padding:8px 12px;font-weight:700'>{escape(label)}</td>"
        f"<td style='padding:8px 12px'>{escape(value)}</td></tr>"
        for label, value in rows
    )
    return (
        "<h2>New 7plus Fitness lead</h2>"
        "<table style='border-collapse:collapse;font-family:Arial,sans-serif' border='1' cellpadding='0'>"
        f"{cells}</table>"
    )


async def notify_owner(lead: Lead):
    if not RESEND_API_KEY or not OWNER_EMAIL:
        logger.warning("Lead saved but email notification is not configured.")
        return
    try:
        response = await asyncio.to_thread(
            resend.Emails.send,
            {
                "from": f"7plus Fitness <{RESEND_FROM_EMAIL}>",
                "to": [OWNER_EMAIL],
                "subject": f"New lead from {lead.name}",
                "reply_to": [lead.email],
                "html": lead_email_html(lead),
            },
        )
        logger.warning("Owner notification accepted by Resend: %s", response.get("id", response))
    except Exception:
        logger.exception("Lead saved but owner notification email failed")


async def create_lead(input: LeadCreate):
    name = clean(input.name, 80)
    email = clean(input.email, 120).lower()
    phone = clean(input.phone, 20)
    if not name or not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Please enter a valid name and email.")
    if len(re.sub(r"\D", "", phone)) < 10:
        raise HTTPException(status_code=422, detail="Please enter a valid phone number.")
    lead = Lead(
        name=name,
        email=email,
        phone=phone,
        service=clean(input.service or input.goal),
        goal=clean(input.goal),
        date=clean(input.date),
        time=clean(input.time or input.preferred_time),
        message=clean(input.message, 500),
    )
    try:
        await db.leads.insert_one(lead.model_dump())
    except Exception:
        logger.exception("Could not save lead to MongoDB")
        raise HTTPException(status_code=503, detail="Lead service is temporarily unavailable.")
    await notify_owner(lead)
    logger.info("New lead %s from %s", lead.id, lead.name)
    return lead


@api_router.post("/booking", response_model=Lead)
async def create_booking(input: LeadCreate):
    return await create_lead(input)


@api_router.post("/contact", response_model=Lead)
async def create_contact(input: LeadCreate):
    return await create_lead(input)


@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(input: ReservationCreate):
    name = clean(input.name, 80)
    email = clean(input.email, 120).lower()
    phone = clean(input.phone, 20)
    if not name or not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Please enter a valid name and email.")
    digits = re.sub(r'\D', '', phone)
    if len(digits) < 10:
        raise HTTPException(status_code=422, detail="Please enter a valid phone number.")
    doc = input.model_dump()
    doc.update(name=name, email=email, phone=phone)
    doc = {k: clean(v) if isinstance(v, str) else v for k, v in doc.items()}
    reservation = Reservation(**doc)
    await db.reservations.insert_one(reservation.model_dump())
    logger.info(f"New reservation {reservation.id} for {reservation.class_name} ({reservation.day})")
    return reservation


@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations():
    items = await db.reservations.find({}, {"_id": 0}).to_list(2000)
    return [Reservation(**item) for item in items]


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(input: InquiryCreate):
    name = clean(input.name, 80)
    email = clean(input.email, 120).lower()
    phone = clean(input.phone, 20)
    if not name or not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Please enter a valid name and email.")
    digits = re.sub(r'\D', '', phone)
    if len(digits) < 10:
        raise HTTPException(status_code=422, detail="Please enter a valid phone number.")
    doc = input.model_dump()
    doc.update(name=name, email=email, phone=phone)
    doc = {k: clean(v, 500) if isinstance(v, str) else v for k, v in doc.items()}
    inquiry = Inquiry(**doc)
    await db.inquiries.insert_one(inquiry.model_dump())
    logger.info(f"New inquiry {inquiry.id} from {inquiry.name}")
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries():
    items = await db.inquiries.find({}, {"_id": 0}).to_list(2000)
    return [Inquiry(**item) for item in items]


app.include_router(api_router)

cors_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000')
allowed_origins = [origin.strip() for origin in cors_origins.split(',') if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
