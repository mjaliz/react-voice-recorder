import React, { useState } from "react";
import Header from "../components/Header";
import VoiceRecorder from "../components/VoiceRecorder";

const Speaking = () => {
  const [text, setText] = useState("Nice to meet you.");
  const [html, setHTML] = useState({ __html: "" });
  const [score, setScore] = useState(null);

  const handleOnSuccess = (matching) => {
    const html = matching.html;
    setHTML({ __html: html });
    setScore(matching.score);
  };

  const renderScore = () => {
    let scoreClass = "bg-green-100 border-green-300 text-green-600";
    if (score < 0.9 && score >= 0.5) {
      scoreClass = "bg-yellow-100 border-yellow-300 text-yellow-600";
    } else if (score < 0.5) {
      scoreClass = "bg-red-100 border-red-300 text-red-600";
    }
    return (
      <span
        className={`text-center mt-5 border-2 w-10 rounded-lg shadow-md ${scoreClass}`}
      >
        {score}
      </span>
    );
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col justify-around items-center h-full font-light">
        {html.__html !== "" ? (
          <div className="flex flex-col justify-center items-center">
            <div dangerouslySetInnerHTML={html} />
            {renderScore()}
          </div>
        ) : (
          <p>{text}</p>
        )}
        <VoiceRecorder onSuccess={handleOnSuccess} text={text} />
      </main>
    </div>
  );
};

export default Speaking;
