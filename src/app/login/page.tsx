"use client";
import Link from "next/link";
import { useUser } from "../../context/userContext";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import UserLoginForm from "@/actions/userLoginForm";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/helper/errorMessage";
import { ButtonForm } from "@/components/ui/buttonForm";

export default function LoginPage() {
  const routerNavigation = useRouter();
  const { setUserLogged } = useUser();

  const [userLoginState, userLoginAction] = useFormState(UserLoginForm, {
    data: null,
    error: "",
    ok: false,
  });

  useEffect(() => {
    if (userLoginState.ok && userLoginState.data) {
      setUserLogged(userLoginState.data.user);
      routerNavigation.push("/account");
    }
  }, [userLoginState.ok, userLoginState.data, setUserLogged, routerNavigation]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={userLoginAction}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {userLoginState.error &&
            ErrorMessage({ error: userLoginState.error })}

          <div>
            <ButtonForm textEnabled="Sign in" textDisabled="Loading..." />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-primary hover:text-red-700"
          >
            Register now!
          </Link>
        </p>
      </div>
    </div>
  );
}
