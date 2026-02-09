# Scoil Bhride 1862 school website

## Downloads

The site serves downloadable PDFs through a clean, slug-based URL. This avoids
issues with spaces and Irish characters in file names and lets us control the
download name shown to users.

**How it works**
- Download metadata lives in `src/app/downloads/data.ts`.
- Public links point to `/downloads/{slug}`.
- The route handler in `src/app/downloads/[slug]/route.ts` maps the slug to a
  file in `public/downloads` and sets `Content-Disposition` so the download name
  is correct.

**Add a new PDF**
1. Copy the PDF into `public/downloads`.
2. Add an entry in `src/app/downloads/data.ts`.
3. Use a new `slug` (URL-safe and unique).

Example:
```ts
{
  en: "Admission Policy 2025",
  ga: "Admission Policy 2025",
  slug: "admission-policy-2025",
  fileName: "admission-policy-2025.pdf",
  downloadName: "Admission Policy 2025.pdf",
}
```

**Fields**
- `slug`: Clean URL slug used in `/downloads/{slug}`.
- `fileName`: Exact filename on disk in `public/downloads`.
- `downloadName` (optional): Name shown in the browser download dialog. Use this
  to keep Irish characters even if the disk file is ASCII.
- `en`/`ga`: Labels used on the website.

**Important notes**
- If a file name contains Irish characters, the safest approach is:
  - Store an ASCII-only `fileName` on disk.
  - Set `downloadName` with the correct Irish text.
- `fileName` must match the filename exactly (including accents).
- Avoid special characters in slugs (`# % ? & +`).
