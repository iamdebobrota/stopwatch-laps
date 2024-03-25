import React, { useState, useEffect } from "react";
import "../styles.css";

function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [lap, setLap] = useState<string[]>([]);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const handleStart = () => {
    if (!intervalId) {
      const id: number = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    if (time >= 100) {
      setSec((prevSec) => prevSec + 1);
      setTime(0);
    }
    if (sec >= 60) {
      setMin((prevMin) => prevMin + 1);
      setSec(0);
    }
  }, [time]);

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTime(0);
    setSec(0);
    setMin(0);
    setLap([]);
  };
  const getLap = () => {
    setLap((prev: any) => [
      ...prev,
      `${min.toString().padStart(2, "0")} :
         ${sec.toString().padStart(2, "0")} :
     ${time.toString().padStart(2, "0")}`,
    ]);
  };

  console.log(lap);

  return (
    <div>
      <h2>
        {min.toString().padStart(2, "0")} : {sec.toString().padStart(2, "0")} :{" "}
        {time.toString().padStart(2, "0")}
      </h2>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={getLap}>Lap</button>
      </div>
      <div>
        <h4>Lap List</h4>
        <div className="lap">
          {lap.map((el: any) => {
            return <div className="singleLap">{el}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
