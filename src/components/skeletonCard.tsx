import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonCardProps {
  cards: number;
}

export default function SkeletonCard({ cards }: SkeletonCardProps) {
  return (
    <SkeletonTheme baseColor="#8b8686" highlightColor="#b5a9a9">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <li className="rounded-2xl bg-gray-800 px-8 py-10">
              <Skeleton width={220} height={270} />
              <p className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
                <Skeleton count={3} />
              </p>
            </li>
          </div>
        ))}
    </SkeletonTheme>
  );
}
