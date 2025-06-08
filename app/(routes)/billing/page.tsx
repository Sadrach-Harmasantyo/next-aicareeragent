import { PricingTable } from "@clerk/nextjs";
import React from "react";

export default function Billing() {
  return (
    <div>
      <h2 className="font-bold text-3xl text-center">Choose Your Plan</h2>
      <p className="text-lg text-center">
        Select a subscription bundle to get all AI Tools Access
      </p>

      <div className="mt-5">
        <PricingTable />
      </div>
    </div>
  );
}
