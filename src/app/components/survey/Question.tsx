"use client";
import { useEffect, useState } from "react";

export interface QuestionProps {
  title: string;
  index: number;
  initialValue: string;
  questionType: string;
  totalQuestions: number;
  activateQuestion?: (index: number) => void;
  addCompletedQuestionToForm: (index: number, value: string) => void;
  handleSubmit: () => void;
}

const constants = {
  SHORT_TEXT: {
    formType: "text",
    title: "Your question here",
    description: "Description (Optional)",
    placeholder: "Type your answer here...",
  },
  LONG_TEXT: {
    formType: "text",
    title: "Your question here",
    description: "Description (Optional) - press enter for a line break",
    placeholder: "Type your answer here...",
  },
};

interface ValueState {
  [key: string]: {
    value: string;
  };
}

export default function Question({ title, index, initialValue, questionType, addCompletedQuestionToForm, activateQuestion, handleSubmit }: QuestionProps) {
  const [value, setValue] = useState<ValueState>({});
  const currentId = `question-${index}`;

  useEffect(() => {
    setValue({
      [currentId]: {
        value: initialValue,
      },
    });
  }, []);

  const getScreen = (questionType: string) => {
    switch (questionType) {
      case "short-text": {
        return (
          <>
            <p>
              {`${index + 1}. `}
              {constants.SHORT_TEXT.title}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "#909090",
              }}
              className="mb-4"
            >
              {constants.SHORT_TEXT.description}
            </p>
            <input
              className="rounded px-8 py-4 border-b-blue-500 bg-gray-100"
              placeholder={constants.SHORT_TEXT.placeholder}
              type={constants.SHORT_TEXT.formType}
              name={currentId}
              // value={value ? value[currentId]?.value : ""}
              value={value[currentId] && value[currentId].value ? value[currentId].value : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue((prev) => {
                  return {
                    ...prev,
                    [currentId]: {
                      value: e.target.value,
                    },
                  };
                });
              }}
            />
          </>
        );
      }

      case "long-text": {
        return (
          <>
            <p>
              {`${index + 1}. `}
              {constants.LONG_TEXT.title}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "#909090",
              }}
              className="mb-4"
            >
              {constants.LONG_TEXT.description}
            </p>
            <input
              className="rounded px-8 py-4 border-b-blue-500 bg-gray-100"
              placeholder={constants.LONG_TEXT.placeholder}
              type={constants.LONG_TEXT.formType}
              name={currentId}
              value={value[currentId] && value[currentId].value ? value[currentId].value : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue((prev) => {
                  return {
                    ...prev,
                    [currentId]: {
                      value: e.target.value,
                    },
                  };
                });
              }}
            />
          </>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-col justify-start">
      {getScreen(questionType)}

      <button
        className="mt-6 rounded bg-blue-500 text-gray-50 px-2 py-1 w-24"
        onClick={() => {
          const validatedValue = value && value[currentId] ? value[currentId].value : "";
          addCompletedQuestionToForm(index, validatedValue);
          activateQuestion ? activateQuestion(index + 1) : null;
        }}
      >
        Next
      </button>
    </div>
  );
}
