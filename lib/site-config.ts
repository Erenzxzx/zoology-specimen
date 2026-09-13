// Keep REPO and this dev/prod split in sync with next.config.mjs — both
// need the exact GitHub repository name, and both need to skip the path
// prefix in development so `npm run dev` works at localhost:3000/.
export const REPO = "zoology-specimens";
const isProd = process.env.NODE_ENV === "production";
export const BASE_PATH = isProd ? `/${REPO}` : "";
export const SITE_URL = `https://Erenzxzx.github.io/${REPO}`;
