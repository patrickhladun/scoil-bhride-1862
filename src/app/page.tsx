"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";
import Gallery from "@components/Gallery/Gallery";
import Link from "@components/Link/Link";
import Icon from "@components/Icon/Icon";

const navItems = [
  "ourSchool",
  "gallery",
  "downloads",
  "newsletter",
  "calendar",
  "contact",
];

const mobileNavItems = ["helpfulLinks"];

const downloads = {
  policies: [
    { label: "Admission Policy 2025", fileName: "Admission Policy 2025.docx" },
    {
      label: "Anti Bullying Policy 2025-2026",
      fileName: "Anti Bullying Policy Scoil Bríde 2025-2026.docx",
    },
    {
      label: "Polasaí Frith-Bhulaíocht",
      fileName: "Polasaí Frith-Bhulaíocht.docx",
    },
    {
      label: "Bí Cineálta Policy",
      fileName: "Bí Cineálta Policy.docx",
    },
    {
      label: "Bí Cinealta Anti‑Bullying Policy",
      fileName:
        "Bí Cinealta Policy to Prevent and Address Bullying Behaviour.docx",
    },
    { label: "Code of Behaviour", fileName: "Code of Behaviour" },
    { label: "CCTV Policy 2022", fileName: "CCTV Policy 2022.docx" },
    {
      label: "Child Safeguarding Statement 25/26",
      fileName: "Child Safeguarding Statement 25_26.docx",
    },
    {
      label: "Intimate Care and Toileting Policy",
      fileName: "Intimate Care and Toileting Policy.docx",
    },
    {
      label: "Health and Safety Statement 2025",
      fileName: "Scoil Bhríde Health and Safety Statement 2025.docx",
    },
    {
      label: "GDPR and Data Protection",
      fileName: "Eolas Tábhachtach _ Important Information.pdf",
    },
  ],
  important: [
    {
      label: "Data Protection Policy 2022",
      fileName: "Data Protection Policy 2022.docx",
    },
    { label: "GDPR Statement 2022", fileName: "GDPR Statement 2022.docx" },
  ],
  enrolment: [
    {
      label: "Clárú do Scoil Bhríde Enrolment Form",
      fileName: "Clárú do Scoil Bhríde Enrolment Form.pdf",
    },
    { label: "Bóín Dé Registration Form", fileName: "Bóín Dé Reg form.pdf" },
  ],
  calendar: {
    label: "Calendar",
    fileName: "Calendar 2025 - 2026.pdf",
  },
};

const socialLinks = [
  {
    label: "Instagram",
    icon: "instagram",
    iconStyles: "fill-white",
    wrapperStyles: "bg-orange-300 hover:bg-orange-400",
    href: "https://www.instagram.com/menlo.n.s?igsh=dGNsZ2Q3a3FpNDcy&utm_source=qr",
  },
  {
    label: "Facebook",
    icon: "facebook",
    iconStyles: "fill-white",
    wrapperStyles: "bg-orange-300 hover:bg-orange-400",
    href: "https://www.facebook.com/ScoilBhrideMenlo",
  },
];

const helpfulLinks = [
  { label: "Gaeloideachas", href: "https://gaeloideachas.ie/" },
  { label: "Gaeilge don Teaghlach", href: "https://gaeilgedonteaghlach.com/" },
  { label: "Léigh Anois", href: "https://www.leighanois.com/canuint.php" },
  { label: "TG4", href: "https://www.tg4.ie/ga/" },
  { label: "Irish for Parents", href: "https://irishforparents.ie/" },
  { label: "COGG", href: "https://cogg.ie/" },
  { label: "Gaelbhratach", href: "https://gaelbhratach.ie/" },
];
const sliderImages = [
  "/assets/gallery/gallery-d8uw.webp",
  "/assets/gallery/gallery-dt3s.webp",
  "/assets/gallery/gallery-gbdh.webp",
  "/assets/gallery/gallery-gs5t.webp",
];
const galleryImages = [
  "/assets/gallery/gallery-d8uw.webp",
  "/assets/gallery/gallery-dt3s.webp",
  "/assets/gallery/gallery-gbdh.webp",
  "/assets/gallery/gallery-gs5t.webp",
  "/assets/gallery/gallery-o7ew.webp",
];
const galleryItems = [
  {
    type: "video" as const,
    vimeoId: "1158785895",
    thumbnail: "/assets/videos/scoil-bhride-video-du7w-thumb.webp",
    label: "Scoil Bhríde video",
  },
  ...galleryImages.map((src) => ({
    type: "image" as const,
    src,
    label: "Scoil Bhríde gallery",
  })),
];

const downloadHref = (file: string) => encodeURI(`/downloads/${file}`);

export default function Home() {
  const [lang, setLang] = useState<"ga" | "en">("en");
  const { t, i18n } = useTranslation();
  const [showSlider, setShowSlider] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    const enableSlider = () => setShowSlider(true);
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    if (typeof window !== "undefined") {
      const requestIdle = (
        window as typeof window & {
          requestIdleCallback?: (
            callback: () => void,
            options?: { timeout: number },
          ) => number;
        }
      ).requestIdleCallback;

      if (requestIdle) {
        idleId = requestIdle(enableSlider, { timeout: 3000 });
      } else {
        timeoutId = window.setTimeout(enableSlider, 2000);
      }
    }

    return () => {
      if (typeof window === "undefined") {
        return;
      }
      if (idleId !== undefined) {
        (
          window as typeof window & {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 bg-primary-700">
        <div className="max-w-5xl mx-auto py-4 px-8">
          <div className="flex gap-8 items-center">
            <div className="text-white mr-auto">
              <a href="/" className="my-0 font-bold text-lg">
                Scoil Bhríde 1862
              </a>
            </div>
            <nav className="hidden md:flex gap-4 text-xs font-semibold">
              {navItems.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="whitespace-nowrap text-white/90 transition hover:text-white"
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setLang("ga");
                  i18n.changeLanguage("ga");
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  lang === "ga"
                    ? "bg-white"
                    : "border border-white/40 text-white"
                }`}
                aria-pressed={lang === "ga"}
              >
                GA
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang("en");
                  i18n.changeLanguage("en");
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  lang === "en"
                    ? "bg-white"
                    : "border border-white/40 text-white"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:text-white"
            >
              <span className="sr-only">Open menu</span>
              <div className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 rounded-full bg-white"></span>
                <span className="block h-0.5 w-4 rounded-full bg-white"></span>
                <span className="block h-0.5 w-4 rounded-full bg-white"></span>
              </div>
            </button>
          </div>
        </div>
        <div
          className={`fixed inset-0 z-[55] transition-opacity duration-300 md:hidden ${
            isMobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!isMobileNavOpen}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileNavOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            id="mobile-navigation"
            className={`absolute right-0 top-0 h-full w-full max-w-xs bg-primary-700 px-6 pb-8 pt-6 text-white shadow-xl transition-transform duration-300 ease-out ${
              isMobileNavOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide">
                Scoil Bhríde 1862
              </span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMobileNavOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>
            <div className="mt-8 space-y-4 text-sm font-semibold">
              {navItems.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block text-white/90 transition hover:text-white"
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
              {mobileNavItems.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="block text-white/90 transition hover:text-white"
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setLang("ga");
                  i18n.changeLanguage("ga");
                  setIsMobileNavOpen(false);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  lang === "ga"
                    ? "bg-white text-primary-700"
                    : "border border-white/40 text-white"
                }`}
                aria-pressed={lang === "ga"}
              >
                GA
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang("en");
                  i18n.changeLanguage("en");
                  setIsMobileNavOpen(false);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  lang === "en"
                    ? "bg-white text-primary-700"
                    : "border border-white/40 text-white"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
            <div className="mt-10 text-xs text-white/70">
              Tap a section to jump to content.
            </div>
          </div>
        </div>
      </header>

      <section id="hero">
        <div className="relative min-h-[40vh] w-full overflow-hidden pt-16 pb-24 text-white">
          {showSlider ? (
            sliderImages.map((src, index) => (
              <div key={src} className={`hero-slide hero-slide-${index + 1}`}>
                <Image
                  src={src}
                  alt="Scoil Bhríde campus"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <div className="absolute inset-0">
              <Image
                src={sliderImages[0]}
                alt="Scoil Bhríde campus"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-primary-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-40" />
          <div className="relative max-w-5xl mx-auto flex px-8">
            <div className="flex flex-col md:w-[50%]">
              <Image
                src="/assets/brand/logo-512x512.webp"
                alt="Scoil Bhríde logo"
                width={180}
                height={180}
                className="mb-8"
              />
              <div>
                <p>{t("hero.tag")}</p>
                <h1 className="text-white">{t("hero.heading")}</h1>
                <p>{t("hero.lead")}</p>
              </div>
              <div>
                <a href="#contact" className="button button__primary mr-4">
                  {t("hero.ctaPrimary")}
                </a>
                <a href="#gallery" className="button button__outline">
                  {t("hero.ctaSecondary")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="-mt-[59px]">
        <div className="relative flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 max-w-[24px]">
            <svg
              className="w-full fill-secondary-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 29"
            >
              <path d="M11,28.6C5.2,28.6.4,24.1.4,18.5v-8C.4,4.9,5.2.4,11,.4s10.6,4.5,10.6,10.1v8c0,5.6-4.7,10.1-10.6,10.1ZM11,2.4C6.3,2.4,2.4,6,2.4,10.5v8c0,4.5,3.9,8.1,8.6,8.1s8.6-3.6,8.6-8.1v-8c0-4.5-3.8-8.1-8.6-8.1Z" />
              <path
                className="mouse-wheel"
                d="M11,13.8c-.5,0-1-.4-1-.9v-4.7c0-.5.4-.9,1-.9s1,.4,1,.9v4.7c0,.5-.4.9-1,.9Z"
              />
            </svg>
          </div>
          <div className="relative z-10 h-[60px]">
            <svg
              className="w-full h-full fill-neutral-100"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 204 61"
            >
              <path d="M170.6,48.1l-35.4-34.4h0c-.4-.3-.8-.7-1.2-1.1C125.6,4.8,114.2,0,101.7,0s-23.9,4.8-32.5,12.7c-.4.4-.8.8-1.2,1.1h0s-35.4,34.3-35.4,34.3c-8.6,8-20,12.9-32.7,12.9h203.3c-12.6,0-24.1-4.9-32.7-12.9Z" />
            </svg>
          </div>
        </div>
      </div>

      <section id="ourSchool" className="bg-neutral-100">
        <div className="max-w-3xl mx-auto pt-16 pb-2 px-8">
          <h2>{t("ourSchool.heading")}</h2>
          <p className="h5 text-primary-900">{t("ourSchool.subheading")}</p>
          <p>{t("ourSchool.body.0")}</p>
          <p>{t("ourSchool.body.1")}</p>
          <p>{t("ourSchool.body.2")}</p>
          <p>{t("ourSchool.body.3")}</p>
        </div>
      </section>

      <div className="bg-tertiary-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 129.25">
          <path
            className="fill-neutral-100"
            d="M0,46.5V0h1200s0,10.75,0,69.14c-40.96,15.92-52.62,25.4-103.67,27.57-31.95,1.36-91.15-15.68-135.64-6.15-38.25,8.2-50.85,39.04-85.01,38.93-39.72.11-52.43-66.71-102.85-82.34-40.29-12.49-124.33,43.83-166.47,42.64-41.13-1.16-75.44-32.57-116.39-32.57-44.22,0-82.54,32.51-118.77,37.34s-80.84-18.27-107.61-37.34C235.01,36.87,172.56-8.32,125.1,10.75,77.64,29.82,77.27,48.88,0,46.5Z"
          />
        </svg>
      </div>

      <section id="aims" className="bg-tertiary-600">
        <div className="max-w-5xl mx-auto pt-6 pb-2 px-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-white">{t("aims.heading")}</h2>
              <p>{t("aims.body.0")}</p>
            </div>
            <div>
              <h3 className="h5 text-white">{t("aims.listHeading")}</h3>
              <ul>
                <li>{t("aims.list.0")}</li>
                <li>{t("aims.list.1")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-secondary-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 74.75">
          <path
            className="fill-tertiary-600"
            d="M1200,24.48V0s-1200,0-1200,0c0,0,0,44.41,0,47.12,40.96,15.92,52.62,25.4,103.67,27.57,31.95,1.36,79.61-20.21,126.1-22.33,39.08-1.78,81.2,22.35,113.51,22.39,37.15-.03,56.75-39.17,114.35-45.26,42.55-4.5,94.24,27.45,136.38,26.26,41.13-1.16,75.08-20.55,116.03-20.55,44.22,0,86.61,17.42,122.84,22.25s88.43-2.8,115.2-21.86c28.58-20.35,79.3-32.78,116.05-27.27,50.58,7.59,58.6,18.54,135.88,16.16Z"
          />
        </svg>
      </div>

      <section id="philosophy" className="bg-secondary-700">
        <div className="max-w-3xl mx-auto pt-16 pb-2 px-8 text-white">
          <div className="">
            <h2 className="text-white">{t("philosophy.heading")}</h2>
            <p>{t("philosophy.subheading")}</p>
            <p>{t("philosophy.body.0")}</p>
          </div>
        </div>
      </section>

      <div className="bg-primary-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 85.61">
          <path
            className="fill-secondary-700"
            d="M0,23.57V0h1200v35.92c-67.13,21.53-84.92-10.66-122.19-10.66-32.62,0-72.63,47.87-117.12,57.4-38.25,8.2-86.17-32.96-179.35-32.96-39.72.11-132.99,28.07-164.33,28.07-25.41,0-86.09-28.46-127.04-28.46-44.22,0-79.83,23.63-116.07,28.46s-80.8-5.5-107.58-24.56c-28.58-20.35-66.85-48.33-116.05-47.44C103.69,6.63,77.27,25.95,0,23.57Z"
          />
        </svg>
      </div>

      <section id="ethos" className="bg-primary-700">
        <div className="max-w-3xl mx-auto pt-16 pb-8 px-8 text-white">
          <h2 className="text-white">{t("ethos.heading")}</h2>
          <p>{t("ethos.body.0")}</p>
          <p>{t("ethos.body.1")}</p>
          <p>{t("ethos.body.2")}</p>
          <p>{t("ethos.body.3")}</p>
          <h3 className="text-white">{t("ethos.heading2")}</h3>
          <p>{t("ethos.body2.0")}</p>
        </div>
      </section>

      <div className="bg-tertiary-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 129.25">
          <path
            className="fill-primary-700"
            d="M0,46.5V0h1200s0,10.75,0,69.14c-40.96,15.92-52.62,25.4-103.67,27.57-31.95,1.36-91.15-15.68-135.64-6.15-38.25,8.2-50.85,39.04-85.01,38.93-39.72.11-52.43-66.71-102.85-82.34-40.29-12.49-124.33,43.83-166.47,42.64-41.13-1.16-75.44-32.57-116.39-32.57-44.22,0-82.54,32.51-118.77,37.34s-80.84-18.27-107.61-37.34C235.01,36.87,172.56-8.32,125.1,10.75,77.64,29.82,77.27,48.88,0,46.5Z"
          />
        </svg>
      </div>

      <section id="preschool" className="bg-tertiary-600">
        <div className="max-w-3xl mx-auto pt-2 pb-8 px-8 text-white">
          <div className="">
            <h2 className="text-white">{t("preschool.heading")}</h2>
            <p>{t("preschool.body.0")}</p>
            <p>{t("preschool.body.1")}</p>
            <p>{t("preschool.body.2")}</p>
          </div>
        </div>
      </section>

      <div className="bg-neutral-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 88.09">
          <path
            className="fill-tertiary-600"
            d="M0,31.34V0h1200v18.13c-67.13,21.53-73.48,36.08-110.75,36.08-32.62,0-105.44-51.04-149.93-41.51-38.25,8.2-109.6,47.57-159.25,52.44-39.72.11-129.83-18.09-160.94-14.32-27.95,3.39-88.66,37.27-129.6,37.27-44.22,0-91.67-62.43-127.91-57.6s-70.41,17.22-95.3,4.93c-23.01-11.36-69.87-29.5-102.07-29.5C130.38,5.93,77.27,33.72,0,31.34Z"
          />
        </svg>
      </div>

      <section id="gallery" className="bg-neutral-200">
        <div className="max-w-5xl mx-auto py-16 px-8">
          <Gallery items={galleryItems} />
          <div className="flex flex-col justify-content items-center">
            <p className="text-center">{t("gallery.social")}</p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className={`px-1 py-1 transition rounded-lg ${link.wrapperStyles}`}
                >
                  <Icon name={link.icon} className={link.iconStyles} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-neutral-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 85.61">
          <path
            className="fill-neutral-200"
            d="M0,23.57V0h1200v35.92c-67.13,21.53-84.92-10.66-122.19-10.66-32.62,0-72.63,47.87-117.12,57.4-38.25,8.2-86.17-32.96-179.35-32.96-39.72.11-132.99,28.07-164.33,28.07-25.41,0-86.09-28.46-127.04-28.46-44.22,0-79.83,23.63-116.07,28.46s-80.8-5.5-107.58-24.56c-28.58-20.35-66.85-48.33-116.05-47.44C103.69,6.63,77.27,25.95,0,23.57Z"
          />
        </svg>
      </div>

      <section id="downloads" className="bg-neutral-100">
        <div className="max-w-5xl mx-auto py-16 px-8">
          <h2>{t("downloads.headers.0")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3>{t("downloads.headers.1")}</h3>
              <div className="mt-4 flex flex-col gap-4">
                {downloads.policies.map((file) => (
                  <Link
                    key={file.fileName}
                    href={downloadHref(file.fileName)}
                    label={file.label}
                    type="download"
                  />
                ))}
              </div>
            </div>

            <div>
              <div>
                <h3>{t("downloads.headers.2")}</h3>
                <div className="mt-4 flex flex-col gap-4">
                  {downloads.important.map((file) => (
                    <Link
                      key={file.fileName}
                      href={downloadHref(file.fileName)}
                      label={file.label}
                      type="download"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3>{t("downloads.headers.3")}</h3>
                <div className="mt-4 flex flex-col gap-4">
                  {downloads.enrolment.map((file) => (
                    <Link
                      key={file.fileName}
                      href={downloadHref(file.fileName)}
                      label={file.label}
                      type="download"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-neutral-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 74.75">
          <path
            className="fill-neutral-100"
            d="M1200,24.48V0s-1200,0-1200,0c0,0,0,44.41,0,47.12,40.96,15.92,52.62,25.4,103.67,27.57,31.95,1.36,79.61-20.21,126.1-22.33,39.08-1.78,81.2,22.35,113.51,22.39,37.15-.03,56.75-39.17,114.35-45.26,42.55-4.5,94.24,27.45,136.38,26.26,41.13-1.16,75.08-20.55,116.03-20.55,44.22,0,86.61,17.42,122.84,22.25s88.43-2.8,115.2-21.86c28.58-20.35,79.3-32.78,116.05-27.27,50.58,7.59,58.6,18.54,135.88,16.16Z"
          />
        </svg>
      </div>

      <section id="newsletter" className="bg-neutral-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 py-16 px-8 gap-4">
          <div>
            <h3>{t("links.newsletter.heading")}</h3>
            <p>{t("links.newsletter.subheading")}</p>
            <div className="mt-4">
              <Link
                href="https://sites.google.com/scoilbhride1862.ie/nuachtlitreacha23-24/home"
                label={t("links.newsletter.button")}
                type="external"
              />
            </div>
          </div>
          <div id="calendar" className="scroll-mt-16">
            <h3>{t("links.calendar.heading")}</h3>
            <p>{t("links.calendar.subheading")}</p>
            <div className="">
              <Link
                href={downloadHref(downloads.calendar.fileName)}
                label={`${t("links.calendar.button")} 2025 - 2026`}
                type="download"
              />
            </div>
          </div>
        </div>
        <div
          id="helpfulLinks"
          className="max-w-5xl mx-auto pb-16 px-8 scroll-mt-16"
        >
          <h3>{t("links.helpful.heading")}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                label={link.label}
                type="external"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 85.61">
          <path
            className="fill-neutral-200"
            d="M0,23.57V0h1200v35.92c-67.13,21.53-84.92-10.66-122.19-10.66-32.62,0-72.63,47.87-117.12,57.4-38.25,8.2-86.17-32.96-179.35-32.96-39.72.11-132.99,28.07-164.33,28.07-25.41,0-86.09-28.46-127.04-28.46-44.22,0-79.83,23.63-116.07,28.46s-80.8-5.5-107.58-24.56c-28.58-20.35-66.85-48.33-116.05-47.44C103.69,6.63,77.27,25.95,0,23.57Z"
          />
        </svg>
      </div>

      <section id="contact">
        <div className="max-w-5xl mx-auto py-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="">
              <div className="contact-card rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="h6 mb-0">{t("contact.principal")}</h3>
                <p className="mt-0">Máire de Brún</p>
                <h3 className="h6 mb-0">{t("contact.address")}</h3>
                <p className="mt-0">
                  Scoil Bhríde,
                  <br />
                  Mionloch,
                  <br />
                  Co. na Gaillimhe,
                  <br />
                  H91 YD63
                </p>
                <h3 className="h6 mb-0">{t("contact.contact")}</h3>
                <p className="mt-0">
                  <span>
                    <a href="mailto:runai@scoilbhride1862.ie">
                      runai@scoilbhride1862.ie
                    </a>
                  </span>
                  <br />
                  <span>
                    <a href="tel:091762323">091 762323</a>
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="mt-4 flex flex-col gap-4">
                <Image
                  src="/assets/brand/logo-512x512.webp"
                  alt="Scoil Bhríde logo"
                  width={140}
                  height={140}
                />
                <h3 className="h6 mb-0">{t("contact.support")}</h3>
                <a
                  href="https://www.ourfundraiser.ie/org/scoilbhride1862"
                  target="_blank"
                  rel="noreferrer"
                  className=""
                >
                  <Image
                    src={"/assets/our-fundraiser.webp"}
                    alt="Our Fundraiser logo"
                    width={180}
                    height={90}
                  />
                </a>
              </div>
              <div>
                <h3 className="h6">{t("contact.follow")}</h3>
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className={`px-1 py-1 transition rounded-lg ${link.wrapperStyles}`}
                    >
                      <Icon name={link.icon} className={link.iconStyles} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary-950 text-white">
        <div className="max-w-5xl mx-auto py-8 px-8 text-center text-xs font-light">
          <p className="my-0 text-sm">
            © {new Date().getFullYear()} Scoil Bhríde Menlo. All rights
            reserved. | Designed by Cityweb
          </p>
        </div>
      </footer>
    </main>
  );
}
