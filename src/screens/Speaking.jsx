import React, { useState } from "react";
import Header from "../components/Header";
import VoiceRecorder from "../components/VoiceRecorder";

const Speaking = () => {
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
