// =====================================================================
//  এই ফাইলটাই আপনার পোর্টফোলিওর সব তথ্য। শুধু এখানে বদলালেই সাইট বদলে যাবে।
//  This single file holds ALL your portfolio content.
//
//  - লেখাগুলো { en: "English", bn: "বাংলা" } আকারে, দুই ভাষায় আছে।
//  - কোনো জায়গা খালি ("" বা []) রাখলে সেই অংশ সাইটে দেখাবে না।
//  - ফিক্সড বাটন/লেবেলের লেখা আছে src/data/ui.js ফাইলে।
// =====================================================================

export const profile = {
  name: "Sofikul Islam", // নামের বানান ঠিক আছে কিনা দেখে নিন
  firstName: "Sofikul",
  initials: "SI",
  handle: "sofikul", // টার্মিনালের প্রম্পটে দেখায়: sofikul@portfolio

  role: {
    en: "Web Developer & Digital Creator",
    bn: "ওয়েব ডেভেলপার ও ডিজিটাল ক্রিয়েটর",
  },

  intro: {
    en: "I build clean, fast and useful websites that solve real problems.",
    bn: "আমি পরিচ্ছন্ন, দ্রুত ও কাজের ওয়েবসাইট বানাই, যা বাস্তব সমস্যার সমাধান করে।",
  },

  // ছবি: public/images/profile.jpg
  // ফাইল না থাকলে নিজে থেকে placeholder ছবি দেখাবে।
  photo: "/images/profile.jpg",
  photoPlaceholder: "/images/profile-placeholder.svg",

  // লোগো: নিজের লোগো দিলে এখানে পথ দিন, যেমন "/images/logo.svg"।
  // খালি রাখলে "SI" লেখা লোগো দেখাবে।
  logo: "",

  // CV PDF: public/files/cv.pdf রাখুন, তারপর এখানে "/files/cv.pdf" লিখুন।
  cvFile: "",

  // শহর/দেশ: নিশ্চিত হলে লিখুন, যেমন { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" }।
  // খালি ("") থাকলে দেখাবে না।
  location: "",
};

// যোগাযোগ। email খালি থাকলে যোগাযোগ ফর্ম বন্ধ থাকবে ও কারণ দেখাবে।
export const contact = {
  email: "sofik213456@gmail.com",
  phone: "", // ঐচ্ছিক
  whatsapp: "", // ঐচ্ছিক: দেশের কোডসহ সংখ্যা, যেমন "8801XXXXXXXXX"
};

// সোশ্যাল লিংক। শুধু যেগুলোর url দেবেন সেগুলোই দেখাবে।
export const socials = [
  { id: "github", label: "GitHub", url: "https://github.com/sofikulislam001" },
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "facebook", label: "Facebook", url: "https://web.facebook.com/evanchowdhuryofficiall" },
  { id: "youtube", label: "YouTube", url: "" },
];

export const about = {
  bio: [
    {
      en: "I'm Sofikul Islam, a web developer who enjoys turning ideas into clean, fast and useful websites. One of my projects is Lost & Found Bangladesh, a platform I built with Next.js, TypeScript and Supabase to help people across Bangladesh report and find lost items.",
      bn: "আমি Sofikul Islam, একজন ওয়েব ডেভেলপার। আমি আইডিয়াকে পরিচ্ছন্ন, দ্রুত ও কাজের ওয়েবসাইটে রূপ দিতে ভালোবাসি। আমার একটি প্রজেক্ট Lost & Found Bangladesh। Next.js, TypeScript ও Supabase দিয়ে বানানো এই প্ল্যাটফর্মে বাংলাদেশের মানুষ হারানো জিনিসের খবর দিতে ও খুঁজে পেতে পারে।",
    },
    {
      en: "I care about responsive design, smooth interactions and interfaces that are easy to use. If you have an idea, a project or an opportunity, feel free to get in touch.",
      bn: "রেসপনসিভ ডিজাইন, মসৃণ ইন্টারঅ্যাকশন আর সহজে ব্যবহার করা যায় এমন ইন্টারফেস আমার কাছে গুরুত্বপূর্ণ। আপনার কোনো আইডিয়া, প্রজেক্ট বা সুযোগ থাকলে নির্দ্বিধায় যোগাযোগ করুন।",
    },
  ],
  // ঐচ্ছিক: [{ label: { en: "Education", bn: "শিক্ষা" }, value: "..." }]
  facts: [],
};

// Skills। এগুলো আপনার GitHub প্রজেক্টে সত্যিই ব্যবহার হওয়া টেকনোলজি।
// নতুন কিছু শিখলে এখানে যোগ করুন। কোনো শতাংশ (%) দেখানো হয় না।
export const skills = [
  {
    title: { en: "Frontend", bn: "ফ্রন্টএন্ড" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: { en: "Backend & data", bn: "ব্যাকএন্ড ও ডেটা" },
    items: ["Supabase", "PostgreSQL", "Authentication", "File storage"],
  },
  {
    title: { en: "Tools", bn: "টুল" },
    items: ["Git", "GitHub", "Vite"],
  },
];

// Services। শুধু যে সার্ভিস সত্যিই দেন সেগুলো লিখুন। খালি থাকলে সেকশন লুকানো থাকবে।
// উদাহরণ: { title: { en: "Website Development", bn: "ওয়েবসাইট তৈরি" }, text: { en: "...", bn: "..." } }
export const services = [];

// Projects। category.en দিয়ে ফিল্টার কাজ করে (একাধিক ক্যাটাগরি হলে ফিল্টার বাটন আসে)।
// image: public/images/ এ স্ক্রিনশট রেখে এখানে "/images/lost-found.jpg" লিখুন (ঐচ্ছিক)
// live / source: লিংক থাকলে বাটন দেখাবে, না থাকলে দেখাবে না।
export const projects = [
  {
    title: "Lost & Found Bangladesh",
    summary: {
      en: "A Bangladesh-wide lost & found platform. People can post lost or found items, browse and filter reports, upload photos and get smart matches by category, district, date and text. It includes accounts, a dashboard, notifications, messaging and an admin dashboard.",
      bn: "সারা বাংলাদেশের জন্য হারানো-পাওয়া জিনিসের প্ল্যাটফর্ম। এখানে হারানো বা পাওয়া জিনিসের পোস্ট করা, রিপোর্ট খোঁজা ও ফিল্টার করা, ছবি আপলোড এবং ক্যাটাগরি, জেলা, তারিখ ও লেখার মিল দেখে স্মার্ট ম্যাচ পাওয়া যায়। আছে অ্যাকাউন্ট, ড্যাশবোর্ড, নোটিফিকেশন, মেসেজিং ও অ্যাডমিন ড্যাশবোর্ড।",
    },
    category: { en: "Web", bn: "ওয়েব" },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image: "",
    live: "", // লাইভ লিংক থাকলে এখানে দিন
    source: "https://github.com/sofikulislam001/Lost-Found-Bangladesh-",
  },
  {
    title: { en: "This Portfolio", bn: "এই পোর্টফোলিও" },
    summary: {
      en: "A bilingual, hacker-style personal portfolio with a boot intro, matrix background, glitch effects and a working terminal, built with React, Vite, Tailwind CSS and Framer Motion.",
      bn: "দুই ভাষার হ্যাকার-স্টাইল পার্সোনাল পোর্টফোলিও। আছে বুট ইন্ট্রো, ম্যাট্রিক্স ব্যাকগ্রাউন্ড, গ্লিচ ইফেক্ট ও কাজ-করা টার্মিনাল। React, Vite, Tailwind CSS ও Framer Motion দিয়ে বানানো।",
    },
    category: { en: "Web", bn: "ওয়েব" },
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    image: "",
    live: "",
    source: "https://github.com/sofikulislam001/sofikul",
  },
];

// Experience / Education। সঠিক তথ্য থাকলেই দিন, নাহলে খালি রাখুন।
// উদাহরণ: { period: "2023 - 2024", title: { en: "Role", bn: "পদ" }, place: { en: "Company", bn: "প্রতিষ্ঠান" } }
export const experience = [];

// সংখ্যা/অর্জন: যাচাই করা সত্যি তথ্য থাকলেই দিন।
// উদাহরণ: { value: "10+", label: { en: "Projects", bn: "প্রজেক্ট" } }
export const stats = [];

// FAQ (প্রশ্নোত্তর)। শুধু সত্যি তথ্য লিখুন। খালি ([]) থাকলে সেকশন লুকানো থাকবে।
export const faq = [
  {
    q: { en: "What do you build?", bn: "আপনি কী বানান?" },
    a: {
      en: "Websites and web apps. One example is Lost & Found Bangladesh, a platform with accounts, photo uploads, smart matching and an admin dashboard, built with Next.js, TypeScript and Supabase.",
      bn: "ওয়েবসাইট ও ওয়েব অ্যাপ। একটি উদাহরণ Lost & Found Bangladesh। Next.js, TypeScript ও Supabase দিয়ে বানানো এই প্ল্যাটফর্মে আছে অ্যাকাউন্ট, ছবি আপলোড, স্মার্ট ম্যাচিং ও অ্যাডমিন ড্যাশবোর্ড।",
    },
  },
  {
    q: { en: "Which technologies do you use?", bn: "কোন কোন টেকনোলজি ব্যবহার করেন?" },
    a: {
      en: "React, Next.js, TypeScript, Tailwind CSS and Framer Motion on the frontend, and Supabase (PostgreSQL, authentication and file storage) on the backend.",
      bn: "ফ্রন্টএন্ডে React, Next.js, TypeScript, Tailwind CSS ও Framer Motion, আর ব্যাকএন্ডে Supabase (PostgreSQL, অথেনটিকেশন ও ফাইল স্টোরেজ)।",
    },
  },
  {
    q: { en: "Can I see your code?", bn: "আপনার কোড কি দেখা যাবে?" },
    a: {
      en: "Yes. My public projects are on GitHub. Use the GitHub link on this page.",
      bn: "হ্যাঁ। আমার পাবলিক প্রজেক্টগুলো GitHub-এ আছে। এই পেজের GitHub লিংকে যান।",
    },
  },
  {
    q: { en: "How can I contact you?", bn: "কীভাবে যোগাযোগ করব?" },
    a: {
      en: "Use the contact form below, email me, or send a message on Facebook. The links are in the contact section.",
      bn: "নিচের যোগাযোগ ফর্ম ব্যবহার করুন, ইমেইল করুন, অথবা Facebook-এ মেসেজ দিন। লিংকগুলো যোগাযোগ সেকশনে আছে।",
    },
  },
];
