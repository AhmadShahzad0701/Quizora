"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import StudentNavbar from "../../../components/navigation/StudentNavbar";
import Image from "next/image";
import RubricsModal from "@/components/quiz/RubricsModal";

interface Participant {
  id: string;
  name: string;
  participantId: string;
  avatar?: string;
}

interface WaitingRoomProps {
  totalTime?: number;
  participants?: Participant[];
  onLeaveRoom?: () => void;
  onReadRubrics?: () => void;
}

const WaitingRoom = ({
  totalTime = 60,
  participants = [],
  onLeaveRoom,
}: WaitingRoomProps) => {
  const [isRubricsModalOpen, setIsRubricsModalOpen] = useState(false); // State to control the modal visibility

  const handleReadRubrics = () => {
    setIsRubricsModalOpen(true);
  };

  const handleCloseRubrics = () => {
    setIsRubricsModalOpen(false);
  };

  const defaultParticipants: Participant[] = Array.from(
    { length: 10 },
    (_, i) => ({
      id: `${i + 1}`,
      name: "John",
      participantId: "221400021",
    })
  );

  const displayParticipants =
    participants.length > 0 ? participants : defaultParticipants;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200">
        {/* Header Section */}
        <StudentNavbar studentName="Asad" />

        {/* Main Content */}
        <main className="p-[5%]">
          <div className="bg-white rounded-md shadow-lg p-14 max-w-6xl mx-auto">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Waiting Room</h1>
              <div className="flex items-center gap-6">
                <Button
                  onClick={handleReadRubrics} // Trigger the rubrics modal
                  className="border-2 border-black bg-white text-black hover:bg-black hover:text-white duration-200"
                >
                  Read Rubrics
                </Button>
                <div className="text-right">
                  <div className="flex gap-2">
                    <span className="font-semibold text-foreground">
                      Total Time
                    </span>
                    <span className="text-foreground">{totalTime} Minutes</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-foreground">
                      Participants
                    </span>
                    <span className="text-foreground">
                      {displayParticipants.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {displayParticipants.map((participant) => (
                <div key={participant.id} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center mb-4 overflow-hidden border-4 border-blue-300">
                    {participant.avatar ? (
                      <Image
                        src={participant.avatar}
                        alt={participant.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 text-white bg-gray-600 rounded-full flex items-center justify-center">
                        {participant.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-foreground">
                    {participant.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {participant.participantId}
                  </span>
                </div>
              ))}
            </div>

            {/* Leave Room Button */}
            
            <div className="flex justify-center mt-4">
              <Link href="/quiz">
              <Button
                onClick={onLeaveRoom}
                className="bg-blue-500 hover:bg-blue-600 duration-200 text-white px-16 py-6 text-lg rounded-lg mr-6"
              >
                Start Quiz
              </Button>
              </Link>
              <Button
                onClick={onLeaveRoom}
                className="bg-red-500 hover:bg-red-600 duration-200 text-white px-16 py-6 text-lg rounded-lg"
              >
                Leave Room
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Render Rubrics Modal */}
      <RubricsModal isOpen={isRubricsModalOpen} onClose={handleCloseRubrics} />
    </>
  );
};

export default WaitingRoom;
