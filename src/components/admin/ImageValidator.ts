const MAX_SIZE = 10 * 1024 * 1024;

const VALID_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const validateImage = (file: File) => {
  if (!VALID_TYPES.includes(file.type)) {
    return "Only JPG, PNG and WEBP allowed.";
  }

  if (file.size > MAX_SIZE) {
    return "Maximum image size is 10MB.";
  }

  return null;
};
