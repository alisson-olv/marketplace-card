import { UserCardsWrapper } from "@/components/userCards/userCardsWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Account - Magic: The Gathering",
  description: "My account",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccountPage() {
  return <UserCardsWrapper />;
}
