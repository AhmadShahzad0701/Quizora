"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";

const RoomCode = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const enterFullScreen = async () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
      } catch {
        // fullscreen can fail silently (browser policy)
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔹 Dummy validation (backend later)
    if (roomCode === "123456") {
      await enterFullScreen();
      router.push("/join-quiz");
    } else {
      setError("Invalid room code. Please check and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 pt-24 pb-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

          {/* Back Button (Improved) */}
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          {/* Heading */}
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Join Quiz Room
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enter the room code provided by your teacher
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="roomCode"
                className="block text-sm font-medium mb-1"
              >
                Room Code
              </label>
              <input
                id="roomCode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoFocus
                value={roomCode}
                onChange={(e) =>
                  setRoomCode(e.target.value.replace(/\D/g, ""))
                }
                placeholder="e.g. 123456"
                className="w-full text-lg tracking-widest px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-primary text-white font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Join Quiz
            </button>
          </form>

          {/* Helper */}
          <p className="mt-6 text-xs text-muted-foreground text-center">
            Make sure you are ready before joining. Quiz will open in fullscreen.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RoomCode;
