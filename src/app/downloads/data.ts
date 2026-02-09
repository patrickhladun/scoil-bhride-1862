export type DownloadItem = {
  en: string;
  ga: string;
  slug: string;
  fileName: string;
  downloadName?: string;
};

export type Downloads = {
  policies: DownloadItem[];
  important: DownloadItem[];
  enrolment: DownloadItem[];
  calendar: DownloadItem;
};

export const downloads: Downloads = {
  policies: [
    {
      en: "Admission Policy 2025",
      ga: "Admission Policy 2025",
      slug: "admission-policy-2025",
      fileName: "Admission Policy 2025.pdf",
    },
    {
      en: "Anti Bullying Policy 2025-2026",
      ga: "Anti Bullying Policy 2025-2026",
      slug: "anti-bullying-policy-2025-2026",
      fileName: "Anti Bullying Policy Scoil Bríde 2025-2026.pdf",
    },
    {
      en: "Polasaí Frith-Bhulaíocht",
      ga: "Polasaí Frith-Bhulaíocht",
      slug: "polasai-frith-bhulai-ocht",
      fileName: "Polasaí Frith-Bhulaíocht.pdf",
    },
    {
      en: "Bí Cineálta Policy",
      ga: "Bí Cineálta Policy",
      slug: "bi-cinealta-policy",
      fileName: "Bí Cineálta Policy.pdf",
    },
    {
      en: "Bí Cinealta Anti‑Bullying Policy",
      ga: "Bí Cinealta Anti‑Bullying Policy",
      slug: "bi-cinealta-anti-bullying-policy",
      fileName: "Bí Cinealta Policy to Prevent and Address Bullying Behaviour.pdf",
    },
    {
      en: "Code of Behaviour",
      ga: "Code of Behaviour",
      slug: "code-of-behaviour",
      fileName: "Code of Behaviour.pdf",
    },
    {
      en: "CCTV Policy 2022",
      ga: "CCTV Policy 2022",
      slug: "cctv-policy-2022",
      fileName: "CCTV Policy 2022.pdf",
    },
    {
      en: "Child Safeguarding Statement 25/26",
      ga: "Child Safeguarding Statement 25/26",
      slug: "child-safeguarding-statement-25-26",
      fileName: "Child Safeguarding Statement 25_26.pdf",
    },
    {
      en: "Intimate Care and Toileting Policy",
      ga: "Intimate Care and Toileting Policy",
      slug: "intimate-care-and-toileting-policy",
      fileName: "Intimate Care and Toileting Policy.pdf",
    },
    {
      en: "Health and Safety Statement 2025",
      ga: "Health and Safety Statement 2025",
      slug: "health-and-safety-statement-2025",
      fileName: "Scoil Bhríde Health and Safety Statement 2025.pdf",
    },
    {
      en: "Data Protection Policy 2022",
      ga: "Data Protection Policy 2022",
      slug: "data-protection-policy-2022",
      fileName: "Data Protection Policy 2022.pdf",
    },
    {
      en: "GDPR Statement 2022",
      ga: "GDPR Statement 2022",
      slug: "gdpr-statement-2022",
      fileName: "GDPR Statement 2022.pdf",
    },
  ],
  important: [
    {
      en: "Important Information",
      ga: "Eolas Tábhachtach",
      slug: "important-information",
      fileName: "Eolas Tábhachtach _ Important Information Scoil Bhríde.pdf",
    },
  ],
  enrolment: [
    {
      en: "Clárú do Scoil Bhríde Enrolment Form",
      ga: "Clárú do Scoil Bhríde Enrolment Form",
      slug: "enrolment-form",
      fileName: "Clárú do Scoil Bhríde Enrolment Form.pdf",
    },
    {
      en: "Bóín Dé Registration Form",
      ga: "Bóín Dé Registration Form",
      slug: "boin-de-registration-form",
      fileName: "Bóín Dé Reg form.pdf",
    },
  ],
  calendar: {
    en: "Calendar",
    ga: "Calendar",
    slug: "calendar-2025-2026",
    fileName: "Calendar 2025 - 2026.pdf",
  },
};

export const allDownloads: DownloadItem[] = [
  ...downloads.policies,
  ...downloads.important,
  ...downloads.enrolment,
  downloads.calendar,
];

export const findDownloadBySlug = (slug: string) =>
  allDownloads.find((file) => file.slug === slug);
