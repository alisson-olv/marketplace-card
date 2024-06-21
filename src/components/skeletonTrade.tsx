import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonCardProps {
  cards: number;
}

export default function SkeletonTrade({ cards }: SkeletonCardProps) {
  return (
    <SkeletonTheme baseColor="#8b8686" highlightColor="#b5a9a9">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div className="rounded-2xl bg-gray-800 px-8 py-10" key={index}>
            <p className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
              <Skeleton count={4} />
            </p>
          </div>
        ))}
    </SkeletonTheme>
  );
}
