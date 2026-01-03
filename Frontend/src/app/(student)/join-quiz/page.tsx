"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/navigation/StudentNavbar";

const JoinQuiz = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.focus();
    window.addEventListener("blur", () => {
      window.focus();
    });

    return () => {
      window.removeEventListener("blur", () => window.focus());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/quiz-room"); 
    enterFullScreen();
  };

  const enterFullScreen = () => {
    const docElement = document.documentElement as HTMLElement;
    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    }
  };

  return (
    <div>
        <StudentNavbar />

    <div className="min-h-screen flex flex-col justify-start py-[2%] items-center bg-gradient-to-br from-blue-200 to-green-200">

      {/* Join Quiz Form */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={() => router.push("/")}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Go To Dashboard
        </button>
        <h2 className="text-xl font-semibold mb-4">Join Quiz!</h2>
        <p className="text-sm text-gray-500 mb-6">Verify your details to enter the quiz room</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 my-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>        
    </div>

  );
};

export default JoinQuiz;
