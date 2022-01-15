import { getDownloadURL, ref } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from './firebase';

export const DEFAULT_IMAGE_LOCATION = "/no_image_uploaded.png";

export function validateImageType(imageFile) {
  if (imageFile?.type?.startsWith('image')) {
    return true;
  } else {
    throw new Error('Not a valid image file.') ;
  }
}

export function generateFileName(imageFile) {
  const fileExtension = getFileExtension(imageFile);
  return nanoid() + fileExtension;
}

function getFileExtension(imageFile) {
  const extensionStart = imageFile?.name?.lastIndexOf('.');
  if (extensionStart === -1 || extensionStart === undefined) {
    throw new Error('Image file does not have a file extension.');
  }
  return imageFile.name.substring(extensionStart);
}

export async function getDownloadURLForImageFile(imageFile) {
  if (!imageFile) return DEFAULT_IMAGE_LOCATION;
  return await getDownloadURL(ref(storage, imageFile));
}