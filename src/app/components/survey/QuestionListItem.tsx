"use client";
import { useEffect } from "react";

export interface QuestionListProps {
  title: string;
  index: number;
  activateQuestion: (index: number) => void;
}

export default function QuestionListItem({ title, index, activateQuestion }: QuestionListProps) {
  useEffect(() => {}, []);

  return (
    <div
      role="button"
      onClick={() => {
        activateQuestion(index);
      }}
    >
      <h2>Question: {index + 1}</h2>
    </div>
  );
}
