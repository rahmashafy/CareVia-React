import { setGlobalOptions } from "firebase-functions";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin
initializeApp();

const auth = getAuth();
const db = getFirestore();

// Admin User UID
const ADMIN_UID = "lz68LUbgHmT5P0dEbPs1DTuuZB32";

setGlobalOptions({ maxInstances: 10 });


// Check Admin Permission
function verifyAdmin(request: any) {
  if (!request.auth || request.auth.uid !== ADMIN_UID) {
    throw new HttpsError(
      "permission-denied",
      "Only admin can perform this action."
    );
  }
}


// UPDATE USER ACCOUNT
export const updateUserAccount = onCall(async (request) => {

  verifyAdmin(request);

  const { userId, fullName, email, phone } = request.data;

  if (!userId || !fullName || !email || !phone) {
    throw new HttpsError(
      "invalid-argument",
      "All user details are required."
    );
  }

  if (userId === ADMIN_UID) {
    throw new HttpsError(
      "permission-denied",
      "Admin account cannot be modified here."
    );
  }

  try {

    // Update Firebase Authentication
    await auth.updateUser(userId, {
      displayName: fullName.trim(),
      email: email.trim().toLowerCase(),
    });

    // Update Firestore
    await db.collection("users").doc(userId).update({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    });

    return {
      success: true,
      message: "User updated successfully.",
    };

  } catch (error) {

    console.error("Update User Error:", error);

    throw new HttpsError(
      "internal",
      "Unable to update user account."
    );
  }

});


// DELETE USER ACCOUNT
export const deleteUserAccount = onCall(async (request) => {

  verifyAdmin(request);

  const { userId } = request.data;

  if (!userId) {
    throw new HttpsError(
      "invalid-argument",
      "User ID is required."
    );
  }

  if (userId === ADMIN_UID) {
    throw new HttpsError(
      "permission-denied",
      "Admin account cannot be deleted."
    );
  }

  try {

    // Delete Firestore Document
    await db.collection("users").doc(userId).delete();

    // Delete Firebase Authentication Account
    await auth.deleteUser(userId);

    return {
      success: true,
      message: "User account deleted successfully.",
    };

  } catch (error) {

    console.error("Delete User Error:", error);

    throw new HttpsError(
      "internal",
      "Unable to delete user account."
    );
  }

});