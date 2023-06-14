import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const constants = [
    "State bug - when on submit screen it removes form state if you prefer another state action",
    "Add some tests to cover the submissions of data and navigation between questions",
    "Re-work the logic for managing screens, I didn't expect it to be difficult, proved more challenging than first thought so a bit of spaghetti code - soz!!",
    "Add client & server side validation",
    "Build out the different types of questions",
    "Mobile design",
    "Make everything editable - title and description",
    "Drag questions to change their ordering",
    "UX - create toast/notification when survey is successfully saved",
    "UX - there is no error handling around api calls",
    "Survey retrieves data from db",
    "Updated/Created timestamps in db",
    "Technically didn't need to build the inputs - just needed to select them and prefill them, I misunderstood the task. I could've used that time to implement another question type. I've essentially built the consumer facing side + the admin facing side.",
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
