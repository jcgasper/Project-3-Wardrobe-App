import { nanoid } from 'nanoid';

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