const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require(path.join('..', process.env.GOOGLE_APPLICATION_CREDENTIALS));

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