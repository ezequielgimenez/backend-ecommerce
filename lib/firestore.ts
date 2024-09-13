import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIRESTORE_TOKEN);

if (admin.apps.length == 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
