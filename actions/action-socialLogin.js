'use server'

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/properties" });
}

export async function doLogout() {
  console.log("logOut!!")
   await signOut({ redirectTo: "/" });
  console.log("Done!!")
}