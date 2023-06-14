import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const constants = [
    "I misunderstood the task so, i've built part of the user facing part as well as part of the admin facing part you asked me to build. The user facing part is the collection of input, this isn't needed but I went too far down the rabbit hole before I realised. So it's not the best piece of work",
    "Build out the different types of questions",
    "Add some tests to cover the submissions of data and navigation between questions",
    "Add client & server side validation",
    "Mobile design",
    "Make everything editable - title and description",
    "Drag questions to change their ordering",
    "UX - create toast/notification when survey is successfully saved",
    "UX - there is no error handling around api calls",
    "Survey retrieves data from db",
    "Updated/Created timestamps in db",
    "Read and re-read the question 😭",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>That's the one tech test - Ryan Robinson</h1>
      <Link className="rounded bg-blue-500 text-gray-50 px-2 py-1" href={"/survey"}>
        Create your survey
      </Link>

      <h2>List of some of the things i'd change etc</h2>
      <ul>
        {constants.map((value, index) => (
          <li key={index}>- {value}</li>
        ))}
      </ul>
    </main>
  );
}
