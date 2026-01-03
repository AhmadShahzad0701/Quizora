"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/navigation/StudentNavbar";

const RoomCode = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const enterFullScreen = () => {
    const docElement = document.documentElement as HTMLElement;
    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (roomCode === "123456") { 
      enterFullScreen(); 
      router.push("/join-quiz");
    } else {
      setError("Invalid room code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 to-green-200">
      <StudentNavbar />

      {/* Room Code Form */}
      <div className="flex flex-col justify-center items-center p-6">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <button
            onClick={() => router.push("/")}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← Go To Dashboard
          </button>
          <h2 className="text-xl font-semibold mb-4">Enter Room Code</h2>
          <p className="text-sm text-gray-500 mb-6">Please enter the code to join the quiz room</p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="roomCode">Room Code</label>
              <input
                type="text"
                id="roomCode"
                name="roomCode"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 my-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Enter Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomCode;
