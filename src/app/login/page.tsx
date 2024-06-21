import SigninForm from "@/components/signin/signinForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin - Magic: The Gathering",
  description: "Signin to the Marketplace of Magic: The Gathering",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <SigninForm />;
}
