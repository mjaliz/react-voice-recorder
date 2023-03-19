import React, { useState } from "react";
import Header from "../components/Header";
import VoiceRecorder from "../components/VoiceRecorder";

const Speaking = () => {
  const [phrase, setPhrase] = useState("");
  const [blanks, setBlanks] = useState([]);

  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [html, setHTML] = useState({ __html: "" });
  const [score, setScore] = useState(null);

  const handleSetBlanks = (e) => {
    const blanks = e.target.value.split(",");
    setBlanks(blanks);
    setHTML({ __html: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
    <div className="flex flex-col h-screen justify-center items-center">
      <Header />
      <form className="mt-7" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="true text" className="text-gray-600">
              Phrase
            </label>
            <input
              type="text"
              className="border-2 border-purple-200 rounded-md outline-none px-2 focus:border-purple-400"
              value={phrase}
              onChange={(e) => {
                setPhrase(e.target.value);
                setHTML({ __html: "" });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="true text" className="text-gray-600">
              Blanks
            </label>
            <input
              type="text"
              className="border-2 border-purple-200 rounded-md outline-none px-2 focus:border-purple-400"
              onChange={handleSetBlanks}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <div className="flex flex-col">
            <label htmlFor="true text" className="text-gray-600">
              Choice 1
            </label>
            <input
              type="text"
              className="border-2 border-purple-200 rounded-md outline-none px-2 focus:border-purple-400"
              onChange={(e) => setChoiceOne(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="true text" className="text-gray-600">
              Choice 2
            </label>
            <input
              type="text"
              className="border-2 border-purple-200 rounded-md outline-none px-2 focus:border-purple-400"
              onChange={(e) => setChoiceTwo(e.target.value)}
            />
          </div>
        </div>
      </form>
      <main className="flex flex-col justify-around items-center h-full font-light">
        {html.__html !== "" ? (
          <div className="flex flex-col justify-center items-center">
            <div dangerouslySetInnerHTML={html} />
            {renderScore()}
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <p className="text-left mb-2">{phrase}</p>
            {choiceOne && choiceTwo && (
              <div className="flex flex-col justify-center items-center gap-3 mt-5 border-2 border-gray-300 rounded-md p-2 shadow-md">
                <p className="text-center w-full">{choiceOne}</p>
                <div className="w-full border-t border-1 border-gray-300"></div>
                <p className="text-center w-full">{choiceTwo}</p>
              </div>
            )}
          </div>
        )}
        <VoiceRecorder
          onSuccess={handleOnSuccess}
          text={{ phrase, blanks, choiceOne, choiceTwo }}
        />
      </main>
    </div>
  );
};

export default Speaking;
