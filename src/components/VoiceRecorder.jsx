import React, { useEffect, useRef, useState } from "react";
import Mic from "../icons/Mic";

const VoiceRecorder = ({ onClick }) => {
  const [data, SetData] = useState(null);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [phraseId, setPhraseId] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState([]);
  const [chunks, setChunks] = useState([]);
  const recordBtnRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          setMediaRecorder(new MediaRecorder(stream));

          mediaRecorder.ondataavailable = (e) => {
            setChunks((chunks) => [...chunks, e.data]);
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
            const audioURL = window.URL.createObjectURL(blob);
            setAudioURL(audioURL);
            console.log(chunks);
            chunks = [];

            let data = new FormData();
            data.append("file", blob, "test.wav");
            SetData(data);
            setRecorded(true);
          };
        })
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }, []);

  const handleClick = () => {
    switch (mediaRecorder.state) {
      case "recording":
        mediaRecorder.stop();
        break;
      case "inactive":
        mediaRecorder.start();
        break;
    }

    console.log(mediaRecorder.state);
  };
  return (
    <button
      className="flex justify-center items-center bg-blue-100 w-14 h-14 rounded-full text-blue-600"
      onClick={handleClick}
      ref={recordBtnRef}
    >
      <Mic />
    </button>
  );
};

export default VoiceRecorder;
