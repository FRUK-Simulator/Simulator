import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getExecutionState } from "../../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../../JavascriptVM/vm";
import React from "react";
import { PassThrough } from "stream";

function format(num: number, digs: number) {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: digs,
    useGrouping: false,
    maximumFractionDigits: 0,
  });
}

function calculateCurrentTime() {
  return +new Date(); // convert time to unix timestamp milliseconds
}

export function Timer() {
  const [startTime, setStartTime] = useState(calculateCurrentTime());
  const [currentTime, setCurrentTime] = useState(calculateCurrentTime());
  const [timerHandle, setTimerHandle] = useState(0);
  const executionState = useSelector(getExecutionState);
  const [currentState, setCurrentState] = useState("Not Started");
  const totalElapsed = currentTime - startTime;
  const seconds = Math.floor(totalElapsed / 1000) % 60;
  const milliseconds = totalElapsed % 1000;
  let resetStopwatch = () => {
    setStartTime(calculateCurrentTime());
    setCurrentTime(calculateCurrentTime());
  };

  let pauseStopwatch = () => {
    if (currentState === "Running") {
      clearInterval(timerHandle);
      setTimerHandle(0);
      setCurrentState("Paused");
    }
  };
  let stopStopwatch = () => {
    if (currentState === "Running") {
      pauseStopwatch();
      setCurrentState("Stopped");
    }
  };
  let updateCurrentTime = () => {
    setCurrentTime(calculateCurrentTime());
  };

  let resumeStopWatch = () => {
    // reset the clock so when we start counting, we start from the time
    // on the display
    setStartTime(calculateCurrentTime() - totalElapsed);
    setCurrentTime(calculateCurrentTime());
  };

  let startStopwatch = () => {
    if (currentState === "Running") {
      // Timer already running
      return;
    } else if (currentState === "Stopped") {
      resetStopwatch();
    } else if (currentState === "Paused") {
      resumeStopWatch();
    }
    setCurrentState("Running");
    // start the timer again
    let handle = window.setInterval(updateCurrentTime, 23);

    // Save timer handle to pause can remove it
    setTimerHandle(handle);
  };

  useEffect(() => {
    console.log("use Effect");
    console.log("execution state " + executionState);
    if (executionState === ExecutionState.RUNNING) {
      startStopwatch();
    } else if (
      executionState === ExecutionState.STOPPED ||
      executionState === ExecutionState.NONE
    ) {
      stopStopwatch();
    } else if (executionState === ExecutionState.PAUSED) {
      pauseStopwatch();
    }
    return () => {
      clearInterval(timerHandle);
    };
  }, [executionState]);

  return (
    <div>
      <p style={{ fontSize: "3em", fontFamily: "monospace" }}>
        {format(seconds, 3)}.{format(milliseconds, 3)}
      </p>
    </div>
  );
}
