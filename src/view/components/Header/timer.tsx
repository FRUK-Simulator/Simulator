import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getExecutionState } from "../../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../../JavascriptVM/vm";
import React from "react";
import { is } from "immer/dist/internal";
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

  const isRunning = timerHandle != 0;
  const totalElapsed = currentTime - startTime;
  const seconds = Math.floor(totalElapsed / 1000) % 60;
  const milliseconds = totalElapsed % 1000;
  let resetStopwatch = () => {
    setStartTime(calculateCurrentTime());
    setCurrentTime(calculateCurrentTime());
  };

  let pauseStopwatch = () => {
    clearInterval(timerHandle);
    setTimerHandle(0);
  };

  let updateCurrentTime = () => {
    setCurrentTime(calculateCurrentTime());
  };

  let startStopwatch = () => {
    if (isRunning) {
      // Timer already running
      return;
    }

    // reset the clock so when we start counting, we start from the time
    // on the display
    setStartTime(calculateCurrentTime() - totalElapsed);
    updateCurrentTime();

    // start the timer again
    let handle = window.setInterval(updateCurrentTime, 23);

    // Save timer handle to pause can remove it
    setTimerHandle(handle);
  };

  useEffect(() => {
    console.log("use Effect");
    console.log(executionState);
    console.log(isRunning);
    if (executionState == ExecutionState.RUNNING) {
      startStopwatch();
    } else if (
      executionState == ExecutionState.STOPPED ||
      executionState == ExecutionState.NONE
    ) {
      pauseStopwatch();
    } else if (executionState == ExecutionState.PAUSED) {
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
