// =====================================================================
//  এই ফাইলটাই আপনার পোর্টফোলিওর সব তথ্য। শুধু এখানে বদলালেই সাইট বদলে যাবে।
//  This single file holds ALL your portfolio content.
//
//  - "PLACEHOLDER" লেখা জায়গাগুলো আপনার আসল তথ্য দিয়ে বদলান।
//  - কোনো জায়গা খালি ("" বা []) রাখলে সেই অংশ সাইটে দেখাবে না।
// =====================================================================

export const profile = {
  name: "Sofikul Islam", // নামের বানান ঠিক আছে কিনা দেখে নিন
  firstName: "Sofikul",
  initials: "SI",

  // PLACEHOLDER: আপনার পছন্দের পদবি/রোল লিখুন
  role: "Web Developer & Digital Creator",

  intro: "Welcome to my portfolio. Explore my projects and get in touch.",

  // ছবি: public/images/profile.jpg নামে ফাইল রাখলেই দেখাবে।
  // ফাইল না থাকলে নিজে থেকে placeholder ছবি দেখাবে।
  photo: "/images/profile.jpg",
  photoPlaceholder: "/images/profile-placeholder.svg",

  // লোগো: নিজের লোগো দিলে এখানে পথ দিন, যেমন "/images/logo.svg"।
  // খালি রাখলে "SI" লেখা লোগো দেখাবে।
  logo: "",

  // CV PDF: public/files/cv.pdf রাখুন, তারপর এখানে "/files/cv.pdf" লিখুন।
  cvFile: "",

  // শহর/দেশ: নিশ্চিত হলে লিখুন, যেমন "Dhaka, Bangladesh"। খালি থাকলে দেখাবে না।
  location: "",
};

// যোগাযোগ। email খালি থাকলে যোগাযোগ ফর্মে স্পষ্ট করে জানানো হবে।
export const contact = {
  email: "", // যেমন "name@example.com"
  phone: "", // ঐচ্ছিক
  whatsapp: "", // ঐচ্ছিক: দেশের কোডসহ সংখ্যা, যেমন "8801XXXXXXXXX"
};

// সোশ্যাল লিংক। শুধু যেগুলোর url দেবেন সেগুলোই দেখাবে।
export const socials = [
  { id: "github", label: "GitHub", url: "" },
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
];

// About। bio হলো প্যারাগ্রাফের তালিকা।
export const about = {
  // PLACEHOLDER: নিজের সম্পর্কে ২-৩টি প্যারাগ্রাফ লিখুন
  bio: [
    "Placeholder: write a short introduction about yourself here. Who you are, what you enjoy building, and how you like to work.",
    "Placeholder: add a second paragraph about your background, your interests, or what you are learning right now.",
  ],
  // ঐচ্ছিক: [{ label: "Education", value: "..." }]
  facts: [],
};

// Skills। প্রতিটি গ্রুপে title আর items থাকে।
// PLACEHOLDER: আপনার আসল skill দিয়ে বদলান। কোনো শতাংশ (%) দেখানো হয় না।
export const skills = [
  {
    title: "Frontend",
    items: ["Your skill 1", "Your skill 2", "Your skill 3"],
    placeholder: true,
  },
  {
    title: "Tools",
    items: ["Your tool 1", "Your tool 2", "Your tool 3"],
    placeholder: true,
  },
];

// Services। শুধু যে সার্ভিস সত্যিই দেন সেগুলো লিখুন। খালি থাকলে সেকশন লুকানো থাকবে।
// উদাহরণ: { title: "Website Development", text: "..." }
export const services = [];

// Projects। category দিয়ে ফিল্টার কাজ করে।
// image: public/images/ এ ছবি রেখে এখানে "/images/project-1.jpg" লিখুন (ঐচ্ছিক)
// live / source: লিংক থাকলে বাটন দেখাবে, না থাকলে দেখাবে না।
export const projects = [
  {
    title: "Project One",
    summary: "Placeholder: describe the problem, your solution and the result.",
    category: "Web",
    tags: ["Tag", "Tag"],
    image: "",
    live: "",
    source: "",
    placeholder: true,
  },
  {
    title: "Project Two",
    summary: "Placeholder: describe the problem, your solution and the result.",
    category: "Web",
    tags: ["Tag", "Tag"],
    image: "",
    live: "",
    source: "",
    placeholder: true,
  },
  {
    title: "Project Three",
    summary: "Placeholder: describe the problem, your solution and the result.",
    category: "Design",
    tags: ["Tag", "Tag"],
    image: "",
    live: "",
    source: "",
    placeholder: true,
  },
];

// Experience / Education। সঠিক তথ্য থাকলেই দিন, নাহলে খালি রাখুন।
// উদাহরণ: { period: "2023 - 2024", title: "Role", place: "Company" }
export const experience = [];

// সংখ্যা/অর্জন: যাচাই করা সত্যি তথ্য থাকলেই দিন।
// উদাহরণ: { value: "10+", label: "Projects" }
export const stats = [];
