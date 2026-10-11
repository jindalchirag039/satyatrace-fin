import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const bannerSrc = 'C:/Users/hp/.gemini/antigravity/brain/e7293d4b-d235-446e-827f-80bbeac34584/.user_uploaded/media_1791686260310_4900eaad.png';
const footerSrc = 'C:/Users/hp/.gemini/antigravity/brain/e7293d4b-d235-446e-827f-80bbeac34584/.user_uploaded/media_1791686250859_6765695a.png';

try {
  if (fs.existsSync(bannerSrc)) {
    fs.copyFileSync(bannerSrc, path.join(publicDir, 'portal_banner.png'));
    console.log('[SatyaTrace Asset Hook] Copied official portal banner to public/portal_banner.png');
  }
  if (fs.existsSync(footerSrc)) {
    fs.copyFileSync(footerSrc, path.join(publicDir, 'footer_reference.png'));
    console.log('[SatyaTrace Asset Hook] Copied official footer reference to public/footer_reference.png');
  }
} catch (err) {
  console.warn('[SatyaTrace Asset Hook] Warning while copying assets:', err.message);
}
