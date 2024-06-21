"use server";

import ApiError from "@/helper/apiError";
import { cookies } from "next/headers";

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface UserLoginDataProps {
  token: string;
  user: UserProps;
}

export default async function UserLoginForm(state: {}, formData: FormData) {
  const urlApi = process.env.URL_API;

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(`${urlApi}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) throw new Error("Email/password incorrect.");

    const data = (await response.json()) as UserLoginDataProps;

    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });

    return { error: "", data, ok: true };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
