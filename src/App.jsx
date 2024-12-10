// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Work"); // "Work" or "Break"

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (mode === "Work" && workMinutes === 0) {
            setMode("Break");
            setSeconds(59);
            setWorkMinutes(breakMinutes - 1);
          } else if (mode === "Break" && breakMinutes === 0) {
            setMode("Work");
            setSeconds(59);
            setBreakMinutes(workMinutes - 1);
          } else {
            setSeconds(59);
            if (mode === "Work") setWorkMinutes((prev) => prev - 1);
            else setBreakMinutes((prev) => prev - 1);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds, workMinutes, breakMinutes, mode]);

  const handleStart = () => setIsRunning(true);

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setWorkMinutes(25);
    setBreakMinutes(5);
    setSeconds(0);
    setMode("Work");
  };

  const handleSetDurations = () => {
    const work = parseInt(document.getElementById("work").value, 10);
    const breakTime = parseInt(document.getElementById("break").value, 10);
    if (work > 0 && breakTime > 0) {
      setWorkMinutes(work);
      setBreakMinutes(breakTime);
      setSeconds(0);
      setMode("Work");
    }
  };

  const formatTime = (minutes, seconds) =>
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pomodoro Timer</h1>
      <h2>{mode} Mode</h2>
      <h1>{formatTime(mode === "Work" ? workMinutes : breakMinutes, seconds)}</h1>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input id="work" type="number" placeholder="Work minutes" />
        <input id="break" type="number" placeholder="Break minutes" />
        <button onClick={handleSetDurations}>Set Durations</button>
      </div>
    </div>
  );
}

export default App;
