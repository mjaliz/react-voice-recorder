import React, { useEffect, useRef, useState } from "react";
import Mic from "../icons/Mic";
import Stop from "../icons/Stop";
import Spinner from "./Spinner";

const mimeType = "audio/webm";

const VoiceRecorder = ({ onClick }) => {
  const mediaRecorder = useRef(null);
  const [permission, setPermission] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const uploadAudio = async () => {
    setRecordingStatus("uploading");
    setTimeout(() => {
      setRecordingStatus("inactive");
    }, 2000);
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);
      uploadAudio();
      setAudioChunks([]);
    };
  };

  const handleClick = () => {
    switch (recordingStatus) {
      case "inactive":
        startRecording();
        break;
      case "recording":
        stopRecording();
        break;
    }
  };
  const renderRecordBtn = () => {
    switch (recordingStatus) {
      case "inactive":
        return <Mic />;
      case "recording":
        return <Stop />;
      case "uploading":
        return <Spinner />;
    }
  };
  return (
    <button
      className={`flex justify-center items-center  w-14 h-14 rounded-full 
      ${recordingStatus === "inactive" && "bg-blue-100 text-blue-600"} 
      ${recordingStatus === "recording" && "bg-green-100 text-green-600"}
      ${recordingStatus === "uploading" && "bg-yellow-100"}`}
      onClick={handleClick}
    >
      {renderRecordBtn()}
    </button>
  );
};

export default VoiceRecorder;
