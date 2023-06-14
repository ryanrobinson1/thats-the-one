"use client";
import { useState } from "react";
import Question from "../components/survey/Question";
import QuestionListItem from "../components/survey/QuestionListItem";
import apiHandleSubmitSurvey from "../actions/submitSurvey";

export interface QuestionList {
  title: string;
  description: string;
  index: number;
  questionType: string;
  value: string;
}

export interface SurveyForm {
  [questionIndex: string]: {
    index: number;
    questionType: string;
    description: string;
    title: string;
    value: string;
  };
}

export default function SurveyPage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questionList, setQuestionList] = useState<QuestionList[]>([]);
  const [showNewQuestionMenu, setShowNewQuestionMenu] = useState(false);
  const [form, setForm] = useState<SurveyForm>();

  const handleAddQuestionToForm = (index: number, value: string, questionType: string) => {
    setForm((prev) => {
      return {
        ...prev,
        [`question-${index}`]: {
          value,
          index,
          title: "hard-coded-for-now",
          description: "hard-coded-for-now",
          questionType,
        },
      };
    });
  };

  const handleAddQuestion = (questionType: string) => {
    setQuestionList((prev) => {
      const newIndex = prev.length;
      return [
        ...prev,
        {
          title: `question-${newIndex}`,
          description: `description for question-${newIndex}`,
          index: newIndex,
          activateQuestion: (index: number) => {
            setActiveQuestion(index);
          },
          questionType,
          value: "",
        },
      ];
    });
  };

  const noQuestionCard = () => {
    return (
      <div>
        <h2>Looks you don't have any questions, click the "Add Questions" button on the side to get started</h2>
      </div>
    );
  };

  const renderQuestionList = () => {
    return (
      <ul className="flex flex-col gap-4 mt-12">
        {questionList.map((question) => {
          const { index, title } = question;
          return (
            <li key={index} className="bg-gray-200 rounded-md p-3">
              <QuestionListItem
                title={title}
                index={index}
                activateQuestion={(index: number) => {
                  setActiveQuestion(index);
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const renderActiveQuestion = () => {
    const question = questionList.find((question) => question.index === activeQuestion);
    if (!question) return null;
    const { title, index, questionType } = question;

    return (
      <div>
        <div>
          <h2>Editing question: {index + 1} </h2>
        </div>

        <div className="bg-gray-50 p-12 flex items-center h-full">
          <Question
            title={title}
            index={index}
            initialValue={form && form[`question-${index}`] ? form[`question-${index}`].value : ""}
            questionType={questionType}
            totalQuestions={questionList.length}
            addCompletedQuestionToForm={(index, value) => handleAddQuestionToForm(index, value, questionType)}
            activateQuestion={(index: number) => {
              setActiveQuestion(index);
            }}
            handleSubmit={() => {
              apiHandleSubmitSurvey(form);
            }}
          />
        </div>
      </div>
    );
  };

  const renderNewQuestionMenu = () => {
    return (
      <div className="flex absolute top-6 w-1/3 rounded-lg p-4 bg-gray-300 ">
        <ul className="flex flex-col gap-4">
          <li className="bg-gray-200 rounded-md p-3">
            <button
              onClick={() => {
                handleAddQuestion("short-text");
                setShowNewQuestionMenu(false);
              }}
            >
              Short Text
            </button>
          </li>
          <li className="bg-gray-200 rounded-md p-3">
            <button
              onClick={() => {
                handleAddQuestion("long-text");
                setShowNewQuestionMenu(false);
              }}
            >
              Long Text
            </button>
          </li>
          <li className="bg-gray-200 rounded-md p-3">
            <button
              onClick={() => {
                handleAddQuestion("long-text");
                setShowNewQuestionMenu(false);
              }}
            >
              (Other options...)
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const handleSubmitScreen = () => {
    if (activeQuestion > 0 && activeQuestion >= questionList.length) {
      return (
        <div className="bg-gray-50 p-12 flex items-center h-full">
          <button
            className="mt-6 rounded bg-blue-500 text-gray-50 px-2 py-1 w-24"
            onClick={() => {
              apiHandleSubmitSurvey(form);
              setActiveQuestion(-1);
              alert("successfully submitted");
            }}
          >
            Submit
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="fixed top-0 bottom-0 right-50 bg-gray-100 w-80 p-3 overflow-y-auto">
        <div className="flex justify-between">
          <p>Your Questions</p>
          <button className="rounded bg-blue-500 text-gray-50 px-2 py-1" onClick={() => setShowNewQuestionMenu(!showNewQuestionMenu)}>
            Add Question
          </button>
        </div>
        <div className="">{renderQuestionList()}</div>
      </div>

      <div className="p-12 ml-80">
        <header className="mb-12">
          <h1>That's The One - Create Your Survey</h1>
          <h2>Ryan Robinson</h2>
        </header>

        {showNewQuestionMenu ? renderNewQuestionMenu() : null}

        {questionList.length <= 0 ? noQuestionCard() : null}

        <div>
          {renderActiveQuestion()}
          {handleSubmitScreen()}
        </div>
      </div>
    </main>
  );
}
