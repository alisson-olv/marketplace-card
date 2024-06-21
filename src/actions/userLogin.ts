"use server";

import ApiError from "@/helper/apiError";
import { UserProps } from "@/types/user";
import { cookies } from "next/headers";

interface UserLoginProps {
  email: string;
  password: string;
}

interface UserLoginDataProps {
  token: string;
  user: UserProps;
}

export default async function UserLogin({ email, password }: UserLoginProps) {
  const urlApi = process.env.URL_API;

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

    if (!response.ok) throw new Error("Try again later.");

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
