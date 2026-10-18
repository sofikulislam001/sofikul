# Sofikul Islam - Portfolio Website

React + Vite + Tailwind CSS + Framer Motion দিয়ে তৈরি একটি আধুনিক, অ্যানিমেটেড পার্সোনাল পোর্টফোলিও।

> **গুরুত্বপূর্ণ:** সাইটের এখনকার ছবি, bio, skill ও project হলো **placeholder** (নমুনা)। আপনার আসল তথ্য কোথায় বসাবেন তা জানতে [ASSET-GUIDE.md](./ASSET-GUIDE.md) পড়ুন।

## কী কী আছে

- Sticky navbar (স্ক্রল করলে স্টাইল বদলায়, বর্তমান সেকশন হাইলাইট হয়, মোবাইল মেনু আছে)
- Dark / Light থিম টগল (আপনার পছন্দ মনে রাখে)
- Hero সেকশন: অ্যানিমেটেড হেডলাইন, নরম নড়াচড়া করা ব্যাকগ্রাউন্ড, প্রোফাইল ছবি
- About, Skills, Featured Projects (ক্যাটাগরি ফিল্টারসহ), Contact, Footer
- Services, Experience, সংখ্যা/অর্জন: আপনি তথ্য দিলে তবেই দেখাবে, নাহলে লুকানো থাকবে
- `prefers-reduced-motion` মেনে চলে (যাদের অ্যানিমেশন বন্ধ করা আছে তাদের জন্য কম নড়াচড়া)
- কীবোর্ড দিয়ে চালানো যায়, ফোকাস দেখা যায়, "Skip to content" লিংক আছে

## কী কী নেই (সৎভাবে)

- **যোগাযোগ ফর্ম এখনো কোনো সার্ভারের সাথে যুক্ত নয়।** ইমেইল না দিলে ফর্ম বন্ধ থাকে ও কারণ দেখায়। ইমেইল দিলে ফর্ম আগন্তুকের ইমেইল অ্যাপ (mailto) খুলবে। সরাসরি ইনবক্সে মেসেজ পেতে নিচের "যোগাযোগ ফর্ম চালু করা" অংশ দেখুন।
- Testimonial, ভুয়া সংখ্যা বা skill শতাংশ ইচ্ছা করেই রাখা হয়নি।

## ১. কী কী সফটওয়্যার লাগবে

**Node.js** (সংস্করণ 18 বা তার বেশি)। আছে কিনা দেখতে টার্মিনালে লিখুন:

```bash
node -v
```

কোনো সংখ্যা (যেমন `v22.0.0`) এলে আছে। না এলে https://nodejs.org থেকে LTS সংস্করণ নামিয়ে ইনস্টল করুন। এডিটর হিসেবে VS Code (https://code.visualstudio.com) ভালো।

## ২. VS Code-এ প্রজেক্ট খোলা

1. GitHub থেকে প্রজেক্ট কম্পিউটারে নামান: `git clone https://github.com/sofikulislam001/sofikul.git`
2. VS Code খুলুন, **File → Open Folder** দিয়ে `sofikul` ফোল্ডার বেছে নিন।
3. **Terminal → New Terminal** চাপুন।

## ৩. চালানোর কমান্ড

```bash
npm install
npm run dev
```

- প্রথম কমান্ড দরকারি প্যাকেজ নামায় (একবারই লাগে)।
- দ্বিতীয় কমান্ডের পর ব্রাউজারে খুলুন: **http://localhost:5173**
- সাইট বন্ধ করতে টার্মিনালে `Ctrl + C` চাপুন।

## ৪. প্রোডাকশন বিল্ড

```bash
npm run build
npm run preview
```

`build` করলে `dist/` ফোল্ডারে চূড়ান্ত ফাইল তৈরি হয়। `preview` দিয়ে সেটা ব্রাউজারে দেখে নিতে পারবেন।

## ৫. সাধারণ সমস্যা ও সমাধান

| সমস্যা | সমাধান |
| --- | --- |
| `npm: command not found` | Node.js ইনস্টল হয়নি। উপরের ধাপ ১ দেখুন। |
| `npm install` এ error | ইন্টারনেট চেক করুন, তারপর `node_modules` ফোল্ডার মুছে আবার `npm install` দিন। |
| পোর্ট ব্যস্ত (`5173 is in use`) | আগের সার্ভার বন্ধ করুন (`Ctrl + C`), বা Vite অন্য পোর্ট দেখালে সেটা ব্যবহার করুন। |
| ছবি দেখাচ্ছে না | ফাইলের নাম ও ফোল্ডার ঠিক আছে কিনা দেখুন (ASSET-GUIDE.md)। নাম বড়/ছোট হাতের অক্ষরে মিলতে হবে। |
| বদলানো তথ্য দেখা যাচ্ছে না | ফাইল Save করেছেন কিনা দেখুন (`Ctrl + S`), তারপর ব্রাউজার রিফ্রেশ করুন। |

## ৬. অনলাইনে প্রকাশ (Deploy)

### Vercel (সহজ)

1. https://vercel.com এ GitHub দিয়ে সাইন আপ করুন।
2. **Add New → Project** চাপুন, `sofikul` রিপোজিটরি বেছে নিন।
3. Vercel নিজে Vite চিনে নেয়। **Build Command:** `npm run build`, **Output Directory:** `dist` (ডিফল্টই থাকে)।
4. **Deploy** চাপুন। কয়েক মিনিটে লাইভ লিংক পাবেন।
5. এরপর GitHub-এ কোড push করলেই সাইট নিজে থেকে আপডেট হবে।

অফিসিয়াল গাইড: https://vercel.com/docs/frameworks/vite

### Netlify (বিকল্প)

1. https://netlify.com এ সাইন আপ করুন, **Add new site → Import an existing project** চাপুন।
2. Build command: `npm run build`, Publish directory: `dist`।

অফিসিয়াল গাইড: https://docs.netlify.com/

## ৭. নিজের ডোমেইন যুক্ত করা (যদি থাকে)

- **Vercel:** Project → **Settings → Domains** এ ডোমেইন লিখে Add করুন। Vercel যে DNS রেকর্ড দেখায় সেটা ডোমেইন কেনার জায়গার DNS সেটিংসে বসান।
- গাইড: https://vercel.com/docs/domains

## ৮. যোগাযোগ ফর্ম চালু করা

**সবচেয়ে সহজ:** `src/data/content.js` ফাইলে `contact.email` এ আপনার ইমেইল লিখুন। ফর্ম তখন আগন্তুকের ইমেইল অ্যাপ খুলবে।

**সরাসরি ইনবক্সে মেসেজ পেতে (ঐচ্ছিক):**

1. https://formspree.io এ অ্যাকাউন্ট খুলে একটি ফর্ম বানান, আপনাকে একটি URL দেবে।
2. প্রজেক্টের মূল ফোল্ডারে `.env` নামে ফাইল বানান (`.env.example` কপি করে):
   ```
   VITE_FORM_ENDPOINT=আপনার-ফর্ম-url
   ```
3. Vercel-এ ব্যবহার করলে: **Settings → Environment Variables** এ একই নাম ও মান যোগ করে আবার Deploy করুন।

এই URL কোনো গোপন চাবি নয়, তবু `.env` ফাইল গিটে যায় না (`.gitignore` এ আছে)।

## প্রজেক্টের গঠন

```
sofikul/
  public/
    images/        <- প্রোফাইল ছবি, লোগো, প্রজেক্টের স্ক্রিনশট
    files/         <- CV (PDF)
    favicon.svg    <- ব্রাউজার ট্যাবের আইকন
  src/
    data/content.js  <- আপনার সব তথ্য (এটাই বদলাবেন)
    sections/        <- Hero, About, Skills, Projects, Contact ...
    components/      <- Navbar, Logo, ThemeToggle ...
    index.css        <- রং ও থিম
  archive/old-index.html  <- রিপোজিটরির আগের পুরোনো ফাইল (মোছা হয়নি)
  ASSET-GUIDE.md
```

## কেন এই প্রযুক্তি

- **React + Vite:** দ্রুত চালু হয়, সেটআপ সহজ, নতুনদের জন্য ভালো।
- **Tailwind CSS:** সব রং ও থিম এক জায়গায় থাকে, লাইট/ডার্ক সহজে বদলায়।
- **Framer Motion:** স্ক্রল-রিভিল ও মেনু অ্যানিমেশন, reduced-motion সমর্থনসহ।
- **Lucide:** হালকা ও একই ধরনের আইকন।
- **JavaScript (TypeScript নয়):** শুরুতে সেটআপ কম জটিল রাখতে।
