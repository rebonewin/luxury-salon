import type { ImageKey } from "./images";

export const site = {
  name: "Luxury Salon",
  legalName: "Luxury Salon",
  descriptor: "The Beauty Atelier",
  tagline: "Beauty, style & confidence",
  description:
    "A private luxury salon in Masuri, Meerut, offering considered hair, skin and bridal artistry. Book a personal appointment with our specialists.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://luxury-salon-masuri.vercel.app",
  phone: "9917654510",
  phoneDisplay: "+91 99176 54510",
  phoneHref: "tel:+919917654510",
  whatsappNumber: "919917654510",
  whatsappMessage:
    "Hello Luxury Salon, I would like to book an appointment. Could you please share your availability?",
  email: "",
  address: {
    street: "Tejasvi Enclave, Daurala–Masuri Road",
    locality: "Masuri",
    district: "Meerut",
    region: "Uttar Pradesh",
    postalCode: "250001",
    country: "IN",
    full: "Tejasvi Enclave, Daurala–Masuri Road, Masuri, Meerut, Uttar Pradesh 250001",
    short: "Masuri, Meerut",
  },
  geo: { lat: 29.0693261, lng: 77.8241976 },
  maps: {
    directions: "https://maps.app.goo.gl/Rn4AyCQG2xDcwWXi9?g_st=ac",
    embed:
      "https://www.google.com/maps?q=29.0693261,77.8241976&z=16&output=embed",
  },
  hours: [
    { days: "Tuesday – Sunday", time: "10:00 – 20:00" },
    { days: "Monday", time: "By appointment" },
  ],
  hoursNote: "Private appointments are recommended. Last booking at 19:00.",
  priceNote:
    "Starting prices are indicative. Your final quote is confirmed after a personal consultation.",
  cancellationNote:
    "We kindly ask for 24 hours' notice for cancellations or rescheduling.",
} as const;

export const whatsappHref = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  number: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: ImageKey;
  imageAlt: string;
};

export type ServiceCategory = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ImageKey;
  imageAlt: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "hair",
    number: "01",
    name: "Hair",
    eyebrow: "Cut · Style · Colour · Care",
    title: "Hair, considered from every angle.",
    description:
      "Every appointment begins with a conversation about your hair, your routine and the way you want to feel. The result is a cut, colour or finish that grows out beautifully and feels effortless to wear.",
    image: "styling",
    imageAlt: "Glossy, hand-styled waves created at our Masuri atelier",
    services: [
      {
        number: "01",
        name: "Hair Cut",
        description:
          "A precision cut shaped to your bone structure, hair texture and the way you actually wear it.",
        duration: "45 – 60 min",
        price: "From ₹1,200",
        image: "cut",
        imageAlt: "Close-up of a precision haircut in progress",
      },
      {
        number: "02",
        name: "Hair Styling",
        description:
          "Blowouts, soft waves and event-ready finishes with movement that lasts well beyond the evening.",
        duration: "45 – 90 min",
        price: "From ₹1,500",
        image: "styling",
        imageAlt: "Stylist creating a polished wave finish",
      },
      {
        number: "03",
        name: "Hair Coloring",
        description:
          "Dimensional colour, balayage and gloss work, mixed for your skin tone and maintained with care.",
        duration: "2 – 3 hrs",
        price: "From ₹3,500",
        image: "color",
        imageAlt: "Foil highlights being applied in the salon",
      },
      {
        number: "04",
        name: "Hair Treatment",
        description:
          "Restorative rituals for strength, shine and scalp health, tailored after a close diagnosis.",
        duration: "60 – 90 min",
        price: "From ₹2,500",
        image: "treatment",
        imageAlt: "A relaxing hair wash and treatment ritual",
      },
    ],
  },
  {
    slug: "beauty",
    number: "02",
    name: "Beauty",
    eyebrow: "Skin · Makeup · Glow",
    title: "Skin first. Makeup second.",
    description:
      "Our beauty room is calm, private and led by skin health. We work in natural light, with a light hand and a focus on looking rested, luminous and entirely yourself.",
    image: "makeup",
    imageAlt: "Makeup artist applying a soft eye look",
    services: [
      {
        number: "01",
        name: "Facial",
        description:
          "A deeply cleansing, sculpting facial designed around your skin's needs, never a one-size ritual.",
        duration: "60 min",
        price: "From ₹1,800",
        image: "facial",
        imageAlt: "A serene facial treatment with a soft clay mask",
      },
      {
        number: "02",
        name: "Makeup",
        description:
          "Soft-focus, editorial or occasion makeup with a finish that still feels like you.",
        duration: "60 – 90 min",
        price: "From ₹4,000",
        image: "makeup",
        imageAlt: "Close-up of a makeup artist working on the eye",
      },
      {
        number: "03",
        name: "Skin Care",
        description:
          "Ongoing skin guidance, exfoliation and hydration rituals for a calmer, more luminous complexion.",
        duration: "45 – 60 min",
        price: "From ₹2,200",
        image: "skin",
        imageAlt: "Gua sha facial massage at the atelier",
      },
    ],
  },
  {
    slug: "bridal",
    number: "03",
    name: "Bridal",
    eyebrow: "Trials · Weddings · Occasions",
    title: "For the day you will remember.",
    description:
      "Bridal work should feel personal, calm and beautifully photographed. We build your look together over a trial, then stay close on the day so every detail holds from the first photograph to the last.",
    image: "bridal-makeup",
    imageAlt: "Bridal makeup with traditional gold jewellery",
    services: [
      {
        number: "01",
        name: "Bridal Makeup",
        description:
          "A considered bridal look built through a trial, with long-wear artistry that photographs beautifully.",
        duration: "2 – 3 hrs",
        price: "From ₹15,000",
        image: "bridal-makeup",
        imageAlt: "Bridal portrait with gold jewellery and soft makeup",
      },
      {
        number: "02",
        name: "Wedding Packages",
        description:
          "Hair, makeup and on-the-day touch-ups for the bride and her inner circle, planned around your schedule.",
        duration: "Half / full day",
        price: "From ₹25,000",
        image: "wedding",
        imageAlt: "A joyful bride in traditional red and gold",
      },
    ],
  },
];

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({ ...service, category: category.name })),
);

export type GalleryCategory = "Bridal" | "Hair" | "Skin" | "Atelier";

export type GalleryItem = {
  image: ImageKey;
  title: string;
  category: GalleryCategory;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  {
    image: "veil",
    title: "Behind the veil",
    category: "Bridal",
    alt: "Bride beneath a gold veil and traditional jewellery",
  },
  {
    image: "profile",
    title: "Gold, at golden hour",
    category: "Bridal",
    alt: "Bridal profile with gold jewellery and warm makeup",
  },
  {
    image: "radiance",
    title: "A quiet glow",
    category: "Skin",
    alt: "Beauty portrait with luminous skin and gold jewellery",
  },
  {
    image: "celebration",
    title: "The celebration",
    category: "Bridal",
    alt: "Joyful bride in traditional red and gold attire",
  },
  {
    image: "golden",
    title: "Modern muse",
    category: "Bridal",
    alt: "South Asian beauty portrait with gold jewellery",
  },
  {
    image: "ritual",
    title: "The ritual",
    category: "Skin",
    alt: "Client enjoying a hair wash and scalp ritual",
  },
  {
    image: "colour",
    title: "Colour in progress",
    category: "Hair",
    alt: "Foil highlights being applied to dark hair",
  },
  {
    image: "atelier",
    title: "The atelier",
    category: "Atelier",
    alt: "A styling station inside Luxury Salon",
  },
  {
    image: "waves",
    title: "Soft wave study",
    category: "Hair",
    alt: "Glossy blonde waves created by a stylist",
  },
  {
    image: "detail",
    title: "Bridal detail",
    category: "Bridal",
    alt: "Close-up of bridal jewellery and glowing makeup",
  },
  {
    image: "scissors",
    title: "The art of the cut",
    category: "Hair",
    alt: "Scissors cutting dark hair in a close-up",
  },
  {
    image: "space-gallery",
    title: "A room to exhale",
    category: "Atelier",
    alt: "Warm, welcoming interior at Luxury Salon",
  },
  {
    image: "salonEntrance",
    title: "The entrance",
    category: "Atelier",
    alt: "The illuminated Luxury Salon shopfront in Masuri, Meerut",
  },
];

export const galleryFilters = [
  "All",
  "Bridal",
  "Hair",
  "Skin",
  "Atelier",
] as const;

export const reviews = [
  {
    quote:
      "I have never left a salon feeling so completely myself. The colour is quiet, expensive-looking and exactly what I asked for, only better.",
    name: "Ananya S.",
    service: "Balayage & gloss",
  },
  {
    quote:
      "The team listened more than they talked. My bridal trial felt like a conversation, not a checklist. On the wedding day I felt calm, and I still looked like me.",
    name: "Priya M.",
    service: "Bridal makeup",
  },
  {
    quote:
      "The best facial I have had in Meerut. My skin looked rested for weeks, and the aftercare advice was genuinely useful.",
    name: "Rhea K.",
    service: "Signature facial",
  },
  {
    quote:
      "A haircut that still works six weeks later. That is the difference. The attention to detail is worth every rupee.",
    name: "Simran B.",
    service: "Precision cut",
  },
  {
    quote:
      "From the moment you walk in, everything feels considered. The space, the products, the way they handle your hair. I have finally found my salon.",
    name: "Neha T.",
    service: "Colour & treatment",
  },
];

export const stats = [
  { value: "12+", label: "Years of artistry" },
  { value: "1:1", label: "Private appointments" },
  { value: "500+", label: "Brides styled" },
  { value: "4.9", label: "Average client rating" },
];

export const values = [
  {
    number: "01",
    title: "Listen first",
    body: "Every appointment begins with a proper consultation. Your hair history, your skin, your routine and your expectations shape everything that follows.",
  },
  {
    number: "02",
    title: "Precision over trends",
    body: "We are not interested in a look that only works for a photograph. We build beauty that sits well on you and grows out gracefully.",
  },
  {
    number: "03",
    title: "Care beyond the chair",
    body: "You leave with a clear aftercare plan, honest product advice and a team who remembers the details before your next visit.",
  },
];

export const reasons = [
  {
    title: "Private, unhurried appointments",
    body: "A quiet atelier with one-to-one attention, never a crowded floor or a rushed finish.",
  },
  {
    title: "Specialists, not generalists",
    body: "Cutting, colour, skin and bridal artistry are led by people who live in their craft.",
  },
  {
    title: "Considered, skin-first products",
    body: "Professional formulas chosen for performance, comfort and long-term hair and skin health.",
  },
  {
    title: "Bridal artistry with a trial",
    body: "A calm, structured bridal process with a trial, a timeline and on-the-day support.",
  },
  {
    title: "Immaculate hygiene standards",
    body: "Tools are sanitised between every guest and single-use items are used where it matters.",
  },
  {
    title: "Aftercare that continues at home",
    body: "Clear guidance, honest recommendations and a team you can return to with questions.",
  },
];

export const timeline = [
  {
    marker: "The beginning",
    title: "One chair, one idea",
    body: "Luxury Salon began with a simple intention: make the salon experience feel slower, calmer and more personal.",
  },
  {
    marker: "The atelier",
    title: "A room of our own",
    body: "We created a private space in Masuri where light, texture and quiet detail could shape the experience.",
  },
  {
    marker: "The craft",
    title: "A team of specialists",
    body: "Hair, skin and bridal artistry came together under one roof, each led by specialists who train continuously.",
  },
  {
    marker: "Today",
    title: "Still personal",
    body: "A decade of appointments later, the promise is the same: time, attention and work that feels like you.",
  },
];

export const serviceFaqs = [
  {
    q: "Do you offer a consultation before booking?",
    a: "Yes. Every appointment includes a consultation. For colour corrections, bridal work or a significant change, we recommend a separate consultation so we can plan the right approach.",
  },
  {
    q: "How far in advance should I book?",
    a: "For bridal appointments, four to six weeks is ideal, especially during wedding season. For cuts, colour and skin appointments, three to five days is usually enough. Same-day appointments are best confirmed by phone.",
  },
  {
    q: "What products do you use?",
    a: "We use professional, salon-grade products chosen for performance and hair health. If you have allergies or a sensitive scalp, please tell us at booking so we can prepare alternatives.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We kindly ask for 24 hours' notice to cancel or reschedule. Bridal bookings are confirmed with a retainer and have a separate timeline, which we share before you commit.",
  },
];

export const contactFaqs = [
  {
    q: "How do I confirm my appointment?",
    a: "Send your request through the booking form. It opens WhatsApp with your details filled in. Our team will confirm the date and time personally, usually within two hours during salon hours.",
  },
  {
    q: "Do you take walk-ins?",
    a: "We prefer appointments so every guest gets unhurried attention. If you are nearby, call us and we will gladly check for a same-day opening.",
  },
  {
    q: "Can I bring inspiration photos?",
    a: "Please do. References help us understand the feeling you want. We will always translate them for your hair texture, skin tone and lifestyle rather than repeat them exactly.",
  },
  {
    q: "Do you offer bridal trials?",
    a: "Yes. Bridal makeup and hair include a trial where possible. We plan the look, test longevity and build a timeline for your wedding morning.",
  },
];
