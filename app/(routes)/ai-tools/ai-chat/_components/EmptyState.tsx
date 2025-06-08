import React from "react";

const questionList = [
  "What skills do I need to learn to be a software engineer?",
  "What is the best programming language to learn?",
  "How do I switch careers to UX Design?",
];

export default function EmptyState({ selectedQuestion }: any) {
  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        Ask anything to AI career Agent
        <div>
          {questionList.map((question, index) => (
            <h2
              key={index}
              onClick={() => selectedQuestion(question)}
              className="font-normal text-base p-4 text-center border rounded-lg my-3 hover:border-primary cursor-pointer"
            >
              {question}
            </h2>
          ))}
        </div>
      </h2>
    </div>
  );
}
