import React, { useEffect, useState } from "react";
import "./CountdownTimer.css";

const CountdownTimer = ({ dropDate }) => {
  // State
  const [timerString, setTimerString] = useState("");
  useEffect(() => {
    console.log("Setting Interval...");
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDate - currentDate;

      // Here its as easy as doing some time math to get props
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        console.log("Clearing interval...");
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      console.log("clearing interval");
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="timer-container">
      <p className="timer-header">More Sol-Suckers Coming in Hot:</p>
      {timerString && <p className="timer-value">{`⏰ ${timerString}`}</p>}
    </div>
  );
};

export default CountdownTimer;
