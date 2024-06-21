import { CardsWrapper } from "@/components/availableCards/cardsWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Magic: The Gathering",
  description: "Welcome to the Marketplace of Magic: The Gathering",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <CardsWrapper />;
}
