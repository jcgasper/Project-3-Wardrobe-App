//const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = {
  "type": process.env.GOOGLE_TYPE,
  "project_id": process.env.GOOGLE_PROJECT_ID,
  "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
  "private_key": process.env.GOOGLE_PRIVATE_KEY,
  "client_email": process.env.GOOGLE_CLIENT_EMAIL,
  "client_id": process.env.GOOGLE_CLIENT_ID,
  "auth_uri": process.env.GOOGLE_AUTH_URI,
  "token_uri": process.env.GOOGLE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.GOOGLE_CLIENT_X509_CERT_URL
} 

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'mystyle-33b1c.appspot.com'
});

const bucket = getStorage().bucket();

// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.



async function deleteImageFromFirebase(filename) {
  return bucket.deleteFiles({prefix: filename, maxResults: 1});
}

module.exports = { deleteImageFromFirebase };