import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getExecutionState } from "../../../JavascriptVM/vmSlice";
import { ExecutionState } from "../../../JavascriptVM/vm";
import React from "react";

export enum TimerState {
  RUNNING = "running",
  STOPPED = "stopped",
  PAUSED = "paused",
  NON_STARTED = "Not Started",
}

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
  const [currentState, setCurrentState] = useState(TimerState.NON_STARTED);
  const totalElapsed = currentTime - startTime;
  const seconds = Math.floor(totalElapsed / 1000) % 60;
  const milliseconds = totalElapsed % 1000;

  let updateCurrentTime = () => {
    setCurrentTime(calculateCurrentTime());
  };

  let startStopwatch = () => {
    if (currentState === TimerState.RUNNING) {
      // Timer already running
      return;
    } else if (currentState === TimerState.PAUSED) {
      resumeStopWatch();
    } else {
      resetStopwatch();
    }
    setCurrentState(TimerState.RUNNING);
    // start the timer again
    let handle = window.setInterval(updateCurrentTime, 23);

    // Save timer handle to pause can remove it
    setTimerHandle(handle);
  };

  let stopStopwatch = () => {
    if (currentState === TimerState.RUNNING) {
      freezeStopWatch();
      setCurrentState(TimerState.STOPPED);
    }
  };

  let pauseStopwatch = () => {
    if (currentState === TimerState.RUNNING) {
      freezeStopWatch();
      setCurrentState(TimerState.PAUSED);
    }
  };

  let resumeStopWatch = () => {
    // reset the clock so when we start counting, we start from the time
    // on the display
    setStartTime(calculateCurrentTime() - totalElapsed);
    setCurrentTime(calculateCurrentTime());
  };

  let resetStopwatch = () => {
    setStartTime(calculateCurrentTime());
    setCurrentTime(calculateCurrentTime());
  };

  let freezeStopWatch = () => {
    clearInterval(timerHandle);
    setTimerHandle(0);
  };

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionState]);

  return (
    <div className="timer" title="Challenge Timer">
      <span>⏱</span>
      <hr />
      <span>
        {format(seconds, 3)}.
        <span style={{ fontSize: "0.8em" }}>{format(milliseconds, 3)[0]}</span>
      </span>
    </div>
  );
}
