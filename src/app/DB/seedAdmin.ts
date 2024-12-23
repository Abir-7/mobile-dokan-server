import { User } from "../module/user/user.model";
import admin from "./firebaseAdmin";

const superUser = {
  email: "superadmin@gmail.com",
  password: "admin123",
  role: "superAdmin",
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: "superAdmin" });

  if (!isSuperAdminExits) {
    const userRecord = await admin.auth().createUser({
      email: superUser.email,
      password: superUser.password,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: superUser.role,
    });
    await User.create({ ...superUser, firebaseUid: userRecord.uid });
  }
};

export default seedSuperAdmin;
