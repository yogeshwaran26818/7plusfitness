const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function parseDate(value) {
  if (!value) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value
    ? null
    : value;
}

function getRequestBody(body) {
  if (body && typeof body === "object" && !Array.isArray(body)) return body;
  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed
        : null;
    } catch {
      return null;
    }
  }
  return null;
}

function validationError(message) {
  return { detail: message };
}

function emailHtml(lead) {
  const rows = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Goal", lead.goal || "Not specified"],
    ["Preferred Date", lead.date || "Not specified"],
    ["Preferred Time", lead.preferredTime || "Not specified"],
    ["Message", lead.message || "Not provided"],
  ];

  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:700">${escapeHtml(label)}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<h2>New 7plus Fitness free trial lead</h2><table style="border-collapse:collapse;font-family:Arial,sans-serif" border="1" cellpadding="0">${cells}</table>`;
}

function validateLead(body) {
  const name = clean(body.name, 80);
  const email = clean(body.email, 120).toLowerCase();
  const phoneInput = clean(body.phone, 30);
  const phone = phoneInput.replace(/[^\d+().\-\s]/g, "");
  const digits = phone.replace(/\D/g, "");
  const goal = clean(body.goal, 120);
  const date = parseDate(clean(body.date, 10));
  const preferredTime = clean(body.preferred_time, 120);
  const message = clean(body.message, 500);

  if (!name) return validationError("Please enter your name.");
  if (!email || !EMAIL_RE.test(email)) {
    return validationError("Please enter a valid name and email.");
  }
  if (digits.length < 10) return validationError("Please enter a valid phone number.");
  if (digits.length > 15) return validationError("Please enter a valid phone number.");
  if (date === null) return validationError("Please enter a valid preferred date.");

  return {
    name,
    phone,
    email,
    goal,
    date,
    preferredTime,
    message,
  };
}

module.exports = async function bookingHandler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  const body = getRequestBody(req.body);
  if (!body) return res.status(400).json({ detail: "Request body must be valid JSON." });

  const lead = validateLead(body);
  if (lead.detail) return res.status(400).json(lead);

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, OWNER_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !OWNER_EMAIL) {
    console.error("Booking email service is not configured.");
    return res.status(503).json({ detail: "Booking service is temporarily unavailable." });
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `7plus Fitness <${RESEND_FROM_EMAIL}>`,
        to: [OWNER_EMAIL],
        subject: `New Free Trial Lead - ${lead.name}`,
        reply_to: [lead.email],
        html: emailHtml(lead),
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend rejected booking email", resendResponse.status, resendError);
      return res.status(502).json({ detail: "Could not send your inquiry. Please try again." });
    }

    return res.status(200).json({
      success: true,
      message: "Booking request submitted successfully",
    });
  } catch (error) {
    console.error("Booking email request failed", error);
    return res.status(502).json({ detail: "Could not send your inquiry. Please try again." });
  }
};