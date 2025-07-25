import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function WelcomeBanner() {
  return (
    <div className="p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-lg">
      <h2 className="font-bold text-2xl text-white">
        Next AI Career Coach Agent
      </h2>
      <p className="text-white">
        Smarter career decisions start here - get tailored advice, real-time
        market insights, and a roadmap built just for you with the power of AI
      </p>
      <Link href={"/ai-tools"}>
        <Button variant={"outline"} className="mt-3">
          Let's Get Started
        </Button>
      </Link>
    </div>
  );
}
