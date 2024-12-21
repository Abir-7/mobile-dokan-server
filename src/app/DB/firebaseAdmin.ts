// /server/firebaseAdmin.ts
import admin from "firebase-admin";
import serviceAccount from "./mobileDokanService.json";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
