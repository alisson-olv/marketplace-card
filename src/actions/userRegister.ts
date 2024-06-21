"use server";

import ApiError from "@/helper/apiError";
import UserLogin from "./userLogin";

export async function userRegister(state: {}, formData: FormData) {
  const urlApi = process.env.URL_API;

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(`${urlApi}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) throw new Error("Email already registered.");

    const userLogged = await UserLogin({ email, password });

    if (!userLogged.ok) throw new Error(userLogged.error);

    return { error: "", data: userLogged, ok: true };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
