// src/utils/imageHelper.js

export const getImageUrl = (img) => {
  if (!img) return null; // Return null so components know there is no image

  // 1. Base64 (Manual Uploads from Admin Panel)
  if (img.startsWith("data:")) return img;

  // 2. External Links (Excel Uploads)
  if (img.startsWith("http")) return img;

  // 3. Local Uploads (Localhost / Public folder)
  if (img.startsWith("/")) return img;

  // 4. Relative paths without slash (Safety fix)
  return `/${img}`;
};
