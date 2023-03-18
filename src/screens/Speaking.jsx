import React, { useState } from "react";
import Header from "../components/Header";
import VoiceRecorder from "../components/VoiceRecorder";

const Speaking = () => {
  const [text, setText] = useState("Nice to meet you.");
  const [html, setHTML] = useState({ __html: "" });
  const handleOnSuccess = (text) => {
    setHTML({ __html: text });
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col justify-around items-center h-full font-light">
        {html.__html !== "" ? (
          <div dangerouslySetInnerHTML={html} />
        ) : (
          <p>{text}</p>
        )}
        <VoiceRecorder onSuccess={handleOnSuccess} text={text} />
      </main>
    </div>
  );
};

export default Speaking;
