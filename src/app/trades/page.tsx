import React from "react";

import { Metadata } from "next";
import { TradesWrapper } from "@/components/tradeCards/tradesWrapper";

export const metadata: Metadata = {
  title: "Trades - Magic: The Gathering",
  description: "Trade cards with others",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TradesPage() {
  return <TradesWrapper />;
}
