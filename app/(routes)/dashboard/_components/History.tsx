"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { aiToolsList } from "./AiTools";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    GetHistory();
  }, []);

  const GetHistory = async () => {
    setLoading(true);
    const result = await axios.get("/api/history");
    console.log(result.data);
    setUserHistory(result.data);
    setLoading(false);
  };

  const GetAgentName = (path: string) => {
    const agent = aiToolsList.find((item) => item.path == path);
    return agent;
  };

  return (
    <div className="mt-5 p-5 border rounded-xl">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What Your previously work on. You can find here</p>

      {loading && (
        <div>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-12 rounded-lg mt-4" />
            </div>
          ))}
        </div>
      )}

      {userHistory?.length == 0 && !loading ? (
        <div className="flex items-center justify-center mt-5 flex-col">
          <Image src="/idea.png" width={50} height={50} alt="empty" />
          <h2>You do Not Have any History</h2>
          <Button className="mt-5">Explore AI Tools</Button>
        </div>
      ) : (
        <div className="mt-5">
          {userHistory?.map((item: any, index) => (
            <Link
              href={item?.aiAgentType + "/" + item?.recordId}
              key={index}
              className="flex items-center my-3 border p-3 rounded-lg hover:bg-gray-100"
            >
              <div className="flex gap-5 w-full">
                <Image
                  src={GetAgentName(item?.aiAgentType)?.image || ""}
                  width={40}
                  height={40}
                  alt="empty"
                  className="object-contain"
                />
                <div>
                  <h2 className="font-bold text-lg">
                    {GetAgentName(item.aiAgentType)?.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{item.recordId}</p>
                </div>
              </div>
              <h2>{item.createdAt}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
