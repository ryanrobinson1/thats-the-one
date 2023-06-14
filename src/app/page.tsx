import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const constants = [
    "Bug with state management when switching between screens (i'd like to react state man - useReducer if prod project)",
    "It was my first time using Prisma so took a little time to setup and bugfix, NextJS was my first time a couple of years so again took a while, as a result I'm not entirely happy with code for this test, but i've spent a while on it - hopefully we can talk through the things i've missed",
    "Add some tests to cover the submissions of data and navigation between questions",
    "Re-work the logic for managing screens, I didn't expect it to be difficult, proved more challenging than first thought",
    "Add client & server side validation",
    "Build out the different types of questions",
    "Mobile design",
    "Make everything editable - title and description",
    "Drag questions to change their ordering",
    "UX - there is no feedback that the survey was successfully saved",
    "UX - there is no error handling around api calls",
    "Survey retrieves data from db",
    "Updated/Created timestamps in db",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>That's the one tech test - Ryan Robinson</h1>
      <Link className="rounded bg-blue-500 text-gray-50 px-2 py-1" href={"/survey"}>
        Create your survey
      </Link>

      <ul>
        {constants.map((value, index) => (
          <li key={index}>- {value}</li>
        ))}
      </ul>
    </main>
  );
}
