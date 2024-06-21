import RegisterForm from "@/components/register/registerForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Magic: The Gathering",
  description: "Register to the Marketplace of Magic: The Gathering",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
