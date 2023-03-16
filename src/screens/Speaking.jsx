import React, { useState } from "react";
import Header from "../components/Header";
import VoiceRecorder from "../components/VoiceRecorder";

const Speaking = () => {
  const [state, setState] = useState("stopped");
  const handleRecord = (status) => {
    console.log(status);
    switch (state) {
      case "recording":
        return "stop";
      case "stopped":
        return "record";
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col justify-around items-center h-full font-light">
        <p>Nice to meet you.</p>
        <VoiceRecorder />
      </main>
    </div>
  );
};

export default Speaking;
