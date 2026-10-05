import threeDisciplinesImage from "../../photo/ThreeDisciplines2..jpeg";
import coach1Image from "../../photo/Coach1.jpeg";
import coach2Image from "../../photo/Coach2.jpeg";
import coach3Image from "../../photo/Coach3.jpeg";
import trainingManagerImage from "../../photo/image1.jpeg";
import personalizedTrainingImage from "../../photo/image2.jpeg";

export const API = process.env.REACT_APP_API_URL || "/api";

export const apiUrl = (path) => {
  const configuredBase = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");
  return `${configuredBase || window.location.origin}/api${path}`;
};

export const optimizeImage = (url, width = 1200, quality = 80) => {
  if (!url) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}auto=format&fit=crop&w=${width}&q=${quality}`;
};

export const HERO_BG = optimizeImage(
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  1800,
  80,
);

export const STUDIO = {
  name: "7plus Fitness",
  addressShort:
    "Sankarapuram junction, Ottiyampakkam Main Road, Sithalapakkam, Chennai 600131",
  addressFull:
    "Sankarapuram junction, Ottiyampakkam Main Road, Sithalapakkam, Chennai, Tamil Nadu 600131",
  phone: "095660 77587",
  phoneInternational: "+91 95660 77587",
  whatsapp: "https://wa.me/919566077587",
  email: "Patturaja1702@gmail.com",
  mapEmbed:
    "https://www.google.com/maps?q=7%20Plus%20Fitness%20Gym%2C%20Sithalapakkam&output=embed",
  mapLink:
    "https://www.google.com/maps/dir/?api=1&destination=7+Plus+Fitness+Gym,+Sithalapakkam",
  hours: [
    { d: "Mon – Sat", t: "5:00 AM – 10:00 PM" },
    { d: "Sunday", t: "6:00 AM – 1:00 PM" },
  ],
  hoursLabel: "Mon-Sat: 5:00 AM – 10:00 PM | Sun: 6:00 AM – 1:00 PM",
};

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis)
    window.__lenis.scrollTo(el, { offset: -64, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const isOpenNow = () => {
  try {
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );
    const h = now.getHours() + now.getMinutes() / 60;
    const day = now.getDay();
    if (day === 0) return h >= 7 && h < 12;
    return h >= 5.5 && h < 21.5;
  } catch {
    return true;
  }
};

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const todayDay = () => DAYS[(new Date().getDay() + 6) % 7];
export const INTENSITIES = ["All", "Beginner", "Intermediate", "Advanced"];

export const CLASSES = [
  // Monday
  {
    id: "mon-0600",
    day: "Mon",
    time: "6:00 AM",
    name: "IRON CIRCUIT",
    duration: 50,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 14,
  },
  {
    id: "mon-0730",
    day: "Mon",
    time: "7:30 AM",
    name: "AFTERBURN HIIT",
    duration: 40,
    trainer: "Ananya Suresh",
    intensity: "Intermediate",
    capacity: 16,
  },
  {
    id: "mon-1830",
    day: "Mon",
    time: "6:30 PM",
    name: "FOUNDATION STRENGTH",
    duration: 50,
    trainer: "Karthik Raja",
    intensity: "Beginner",
    capacity: 14,
  },
  {
    id: "mon-1930",
    day: "Mon",
    time: "7:30 PM",
    name: "MOBILITY RESET",
    duration: 30,
    trainer: "Ananya Suresh",
    intensity: "Beginner",
    capacity: 12,
  },
  // Tuesday
  {
    id: "tue-0615",
    day: "Tue",
    time: "6:15 AM",
    name: "AFTERBURN HIIT",
    duration: 40,
    trainer: "Ananya Suresh",
    intensity: "Intermediate",
    capacity: 16,
  },
  {
    id: "tue-0800",
    day: "Tue",
    time: "8:00 AM",
    name: "KETTLEBELL POWER",
    duration: 45,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 12,
  },
  {
    id: "tue-1730",
    day: "Tue",
    time: "5:30 PM",
    name: "STRENGTH CAMP",
    duration: 55,
    trainer: "Vikram Ram",
    intensity: "Intermediate",
    capacity: 14,
  },
  {
    id: "tue-1900",
    day: "Tue",
    time: "7:00 PM",
    name: "DEEP STRETCH & RECOVER",
    duration: 35,
    trainer: "Ananya Suresh",
    intensity: "Beginner",
    capacity: 14,
  },
  // Wednesday
  {
    id: "wed-0600",
    day: "Wed",
    time: "6:00 AM",
    name: "IRON CIRCUIT",
    duration: 50,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 14,
  },
  {
    id: "wed-0730",
    day: "Wed",
    time: "7:30 AM",
    name: "AFTERBURN HIIT",
    duration: 40,
    trainer: "Ananya Suresh",
    intensity: "Intermediate",
    capacity: 16,
  },
  {
    id: "wed-1830",
    day: "Wed",
    time: "6:30 PM",
    name: "FOUNDATION STRENGTH",
    duration: 50,
    trainer: "Karthik Raja",
    intensity: "Beginner",
    capacity: 14,
  },
  {
    id: "wed-1930",
    day: "Wed",
    time: "7:30 PM",
    name: "MOBILITY RESET",
    duration: 30,
    trainer: "Ananya Suresh",
    intensity: "Beginner",
    capacity: 12,
  },
  // Thursday
  {
    id: "thu-0615",
    day: "Thu",
    time: "6:15 AM",
    name: "AFTERBURN HIIT",
    duration: 40,
    trainer: "Ananya Suresh",
    intensity: "Intermediate",
    capacity: 16,
  },
  {
    id: "thu-0800",
    day: "Thu",
    time: "8:00 AM",
    name: "KETTLEBELL POWER",
    duration: 45,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 12,
  },
  {
    id: "thu-1730",
    day: "Thu",
    time: "5:30 PM",
    name: "STRENGTH CAMP",
    duration: 55,
    trainer: "Vikram Ram",
    intensity: "Intermediate",
    capacity: 14,
  },
  {
    id: "thu-1900",
    day: "Thu",
    time: "7:00 PM",
    name: "DEEP STRETCH & RECOVER",
    duration: 35,
    trainer: "Ananya Suresh",
    intensity: "Beginner",
    capacity: 14,
  },
  // Friday
  {
    id: "fri-0600",
    day: "Fri",
    time: "6:00 AM",
    name: "IRON CIRCUIT",
    duration: 50,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 14,
  },
  {
    id: "fri-0730",
    day: "Fri",
    time: "7:30 AM",
    name: "AFTERBURN HIIT",
    duration: 40,
    trainer: "Ananya Suresh",
    intensity: "Intermediate",
    capacity: 16,
  },
  {
    id: "fri-1830",
    day: "Fri",
    time: "6:30 PM",
    name: "FOUNDATION STRENGTH",
    duration: 50,
    trainer: "Karthik Raja",
    intensity: "Beginner",
    capacity: 14,
  },
  {
    id: "fri-1930",
    day: "Fri",
    time: "7:30 PM",
    name: "MOBILITY RESET",
    duration: 30,
    trainer: "Ananya Suresh",
    intensity: "Beginner",
    capacity: 12,
  },
  // Saturday
  {
    id: "sat-0630",
    day: "Sat",
    time: "6:30 AM",
    name: "PARTNER WOD",
    duration: 50,
    trainer: "Ananya Suresh",
    intensity: "Intermediate",
    capacity: 18,
  },
  {
    id: "sat-0800",
    day: "Sat",
    time: "8:00 AM",
    name: "IRON CIRCUIT",
    duration: 50,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 14,
  },
  {
    id: "sat-1000",
    day: "Sat",
    time: "10:00 AM",
    name: "FOUNDATION STRENGTH",
    duration: 50,
    trainer: "Karthik Raja",
    intensity: "Beginner",
    capacity: 14,
  },
  // Sunday
  {
    id: "sun-0700",
    day: "Sun",
    time: "7:00 AM",
    name: "THE LONG GRIND",
    duration: 60,
    trainer: "Vikram Ram",
    intensity: "Advanced",
    capacity: 16,
  },
  {
    id: "sun-0830",
    day: "Sun",
    time: "8:30 AM",
    name: "FOUNDATION STRENGTH",
    duration: 50,
    trainer: "Karthik Raja",
    intensity: "Beginner",
    capacity: 14,
  },
  {
    id: "sun-1000",
    day: "Sun",
    time: "10:00 AM",
    name: "FLOW & RECOVER",
    duration: 40,
    trainer: "Ananya Suresh",
    intensity: "Beginner",
    capacity: 14,
  },
];

export const WORKOUTS = [
  {
    id: "hiit",
    num: "01",
    title: "HIIT & Conditioning",
    img: optimizeImage(
      "https://images.pexels.com/photos/4046704/pexels-photo-4046704.jpeg",
      900,
      75,
    ),
    desc: "Heart-rate-zoned interval blocks that torch calories and build a serious engine — without the junk volume.",
    points: [
      "EMOM, AMRAP & interval formats",
      "Sled pushes, rowers, assault bike",
      "Zoned HR tracking every session",
    ],
  },
  {
    id: "strength",
    num: "02",
    title: "Heavy Strength & Hypertrophy",
    img: threeDisciplinesImage,
    desc: "Barbell-first programming on a real strength floor. Squat, pull and press your way to measurable numbers.",
    points: [
      "Periodised squat / pull / press cycles",
      "Full free-weight floor, lifting platforms",
      "Quarterly strength benchmarking",
    ],
  },
  {
    id: "mobility",
    num: "03",
    title: "Functional Mobility & Recovery",
    img: optimizeImage(
      "https://images.pexels.com/photos/3838705/pexels-photo-3838705.jpeg",
      900,
      75,
    ),
    desc: "Longevity built into the program. Controlled articular work and recovery sessions that keep you training for decades.",
    points: [
      "Kinstretch-style CARs & PAILs work",
      "Breathwork and decompression drills",
      "Injury prehab built into every block",
    ],
  },
];

export const TRAINERS = [
  {
    id: "ananya",
    name: "Raja",
    role: "HIIT & Conditioning Coach",
    img: coach2Image,
    bio: "ISSA-certified fitness professional with national bodybuilding competition experience. With 400+ members coached, I help clients build strength, improve performance, and achieve measurable results.",
    certs: ["NASM", "CPT", "NSCA"],
  },
  {
    id: "karthik",
    name: "Arun Kumar",
    role: "Mobility & Rehab Coach",
    img: coach3Image,
    bio: "Master Personal Trainer dedicated to building strength, mobility, and confidence. Every member leaves Foundation Strength moving better, feeling stronger, and ready to perform at their best.",
    certs: ["NASM", "FRC", "FMS Level 2"],
  },
  {
    id: "vikram",
    name: "Prem",
    role: "Head Coach — Strength",
    img: coach1Image,
    bio: "National-level athlete and certified fitness, nutrition & supplementation professional. As a hybrid athlete, I combine strength, conditioning, and endurance to help members build complete, sustainable performance.",
    certs: ["CFR PRO", "NASM-PES", "CrossFit L2"],
  },
];

export const PRICING = [
  {
    id: "monthly-strength",
    name: "Monthly Strength",
    price: "₹2,500",
    unit: "per month",
    desc: "Flexible month-to-month access",
    features: ["Unlimited floor access", "Strength and conditioning zones"],
    cta: "Start Monthly",
    featured: false,
  },
  {
    id: "three-months",
    name: "3 Months",
    price: "₹5,000",
    unit: "for 3 months",
    desc: "Build consistency with a three-month membership",
    features: [
      "Unlimited floor access for 3 months",
      "Strength and conditioning zones",
      "Goal-based programming",
    ],
    cta: "Choose 3 Months",
    featured: false,
  },
  {
    id: "six-months",
    name: "6 Months",
    price: "₹6,500",
    unit: "for 6 months",
    desc: "Give your training more time to build momentum",
    features: [
      "Unlimited floor access for 6 months",
      "Strength and conditioning zones",
      "Goal-based programming and progress check-ins",
    ],
    cta: "Choose 6 Months",
    featured: false,
  },
  {
    id: "yearly-transformation",
    name: "Yearly Transformation",
    price: "₹7,500",
    unit: "",
    desc: "",
    features: ["Full-year access", "Long-term transformation focus"],
    cta: "Choose Yearly",
    featured: false,
  },
  {
    id: "100-day-transformation",
    name: "100 Days Transformation Challenge",
    price: "₹35,000",
    unit: "program",
    desc: "100 days. One stronger, healthier you.",
    features: [],
    cta: "Join the Challenge",
    featured: false,
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya M.",
    meta: "Member since 2023 · Lost 14 kg",
    text: "The programming is serious and the coaches actually track your numbers. Six months in, I am fitter at 34 than I was at 24.",
    rating: 5,
  },
  {
    name: "Ramesh K.",
    meta: "Member since 2024 · First pull-up at 41",
    text: "I walked in with a dodgy knee and zero confidence. Karthik rebuilt my movement, Vikram rebuilt my strength. First strict pull-up at 41.",
    rating: 5,
  },
  {
    name: "Divya S.",
    meta: "Member since 2022 · Powerlifting meets",
    text: "This is not a gym with music, it is a studio with standards. The 6 AM iron circuit crew is the best part of my day.",
    rating: 5,
  },
];

export const GOOGLE_BUSINESS = {
  rating: 4.6,
  reviewCount: 127,
  reviews: [
    {
      name: "Aarav Menon",
      rating: 5,
      text: "The coaches pay attention to every detail, from warm-up to the final rep. I have become stronger without feeling lost or overwhelmed.",
      photo: "",
      relativeTime: "2 weeks ago",
    },
    {
      name: "Keerthana R.",
      rating: 5,
      text: "A very welcoming place with excellent coaching. The sessions are challenging, structured, and exactly what I needed to stay consistent.",
      photo: "",
      relativeTime: "1 month ago",
    },
    {
      name: "Sanjay Kumar",
      rating: 5,
      text: "I joined for strength training and quickly noticed improvements in my energy and movement. The trainers remember your goals and keep you accountable.",
      photo: "",
      relativeTime: "2 months ago",
    },
    {
      name: "Megha Srinivasan",
      rating: 5,
      text: "The small-group format makes a huge difference. Every workout feels purposeful, and the community has been incredibly supportive from day one.",
      photo: "",
      relativeTime: "3 months ago",
    },
    {
      name: "Vignesh Prabhu",
      rating: 5,
      text: "One of the best training studios in the area. Great equipment, knowledgeable coaches, and a program that makes progress easy to measure.",
      photo: "",
      relativeTime: "4 months ago",
    },
  ],
};

export const TRANSFORMATIONS = [
  { label: "DEADLIFT", from: "60 kg", to: "120 kg", who: "Arun · 8 months" },
  { label: "BODY FAT", from: "31%", to: "22%", who: "Swathi · 6 months" },
  { label: "5K ROW", from: "26:40", to: "19:05", who: "Mohit · 12 weeks" },
];

export const GALLERY = [
  {
    src: optimizeImage(
      "https://images.pexels.com/photos/13106621/pexels-photo-13106621.jpeg",
      900,
      75,
    ),
    alt: "The 7plus community after a partner WOD",
  },
  {
    src: optimizeImage(
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
      900,
      75,
    ),
    alt: "Squad squat session on the strength floor",
  },
  {
    src: optimizeImage(
      "https://images.pexels.com/photos/6339399/pexels-photo-6339399.jpeg",
      900,
      75,
    ),
    alt: "Mobility class in flow",
  },
  {
    src: optimizeImage(
      "https://images.unsplash.com/photo-1517130038641-a774d04afb3c",
      900,
      75,
    ),
    alt: "Group training session",
  },
  {
    src: optimizeImage(
      "https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg",
      900,
      75,
    ),
    alt: "Arms day on the free-weight floor",
  },
  {
    src: optimizeImage(
      "https://images.pexels.com/photos/10551491/pexels-photo-10551491.jpeg",
      900,
      75,
    ),
    alt: "Cable work during an evening session",
  },
];

export const SERVICES = [
  {
    id: "manager",
    title: "Training Manager",
    img: trainingManagerImage,
    description:
      "Your first step into 7plus. Our Training Managers build a custom plan around your goals, lifestyle, and fitness level.",
  },
  {
    id: "classes",
    title: "Group Classes",
    img: WORKOUTS[0].img,
    description:
      "Train better together with a varied schedule of HIIT, strength, mobility, and recovery sessions for every level.",
  },
  {
    id: "nutrition",
    title: "Nutritional Monitoring",
    img: GALLERY[2].src,
    description:
      "Personalized diet guidance, meal planning, and lifestyle coaching to keep your nutrition aligned with your goals.",
  },
  {
    id: "personal",
    title: "Personalized Training",
    img: personalizedTrainingImage,
    description:
      "One-on-one coaching covering workouts, nutrition, recovery, and motivation to fast-track your transformation.",
  },
];

export const GOALS = [
  "Fat Loss",
  "Muscle Gain",
  "General Fitness",
  "Rehab & Mobility",
  "Personal Training",
];
