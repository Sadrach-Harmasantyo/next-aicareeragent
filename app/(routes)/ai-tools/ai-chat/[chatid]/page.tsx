"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyState from "../_components/EmptyState";
import axios from "axios";
import Markdown from "react-markdown";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type messages = {
  content: string;
  role: string;
  type: string;
};

export default function AiChat() {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState<messages[]>([]);
  const router = useRouter();
  const { chatid } = useParams();
  const id = uuidv4();

  useEffect(() => {
    chatid && getMessageList();
  }, [chatid]);

  const getMessageList = async () => {
    const result = await axios.get("/api/history?recordId=" + chatid);
    console.log(result.data);
    setMessageList(result?.data?.content);
  };

  const onSend = async () => {
    setLoading(true);

    setMessageList((prev) => [
      ...prev,
      {
        content: userInput,
        role: "user",
        type: "text",
      },
    ]);

    setUserInput("");

    const result = await axios.post("/api/ai-career-chat-agent", {
      userInput,
    });
    console.log(result.data);
    setMessageList((prev) => [...prev, result.data]);
    setLoading(false);
  };

  console.log(messageList);

  useEffect(() => {
    //save message into database
    messageList.length > 0 && updateMessageList();
  }, [messageList]);

  const updateMessageList = async () => {
    const result = await axios.put("/api/history", {
      content: messageList,
      recordId: chatid,
    });

    console.log(result);
  };

  const onClickButton = async () => {
    const result = await axios.post("/api/history", {
      content: [],
      recordId: id,
    });
    console.log(result);
    router.replace("/ai-tools/ai-chat/" + id);
  };

  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="font-bold text-lg">AI Career Q&A Chat</h2>
          <p>
            Smarter career decisions start here - get tailored advice with the
            power of AI
          </p>
        </div>

        <Button onClick={onClickButton}>+ New Chat</Button>
      </div>

      <div className="flex flex-col h-[75vh]">
        {messageList?.length <= 0 && (
          <div className="mt-5">
            {/* Empty state options */}
            <EmptyState
              selectedQuestion={(question: string) => setUserInput(question)}
            />
          </div>
        )}

        <div className="flex-1">
          {/* Chat history */}
          {messageList?.map((message, index) => (
            <div>
              <div
                key={index}
                className={`flex mb-2 ${
                  message.role == "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg gap-2 ${
                    message.role == "user"
                      ? "bg-gray-200 text-black rounded-lg"
                      : "bg-gray-50 text-black"
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
              {loading && messageList.length - 1 == index && (
                <div className="flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2">
                  <LoaderCircle className="w-5 h-5 animate-spin" /> Thinking...
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center gap-6 absolute bottom-5 w-[50%]">
          {/* Chat input */}
          <Input
            placeholder="Type here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button onClick={onSend} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
