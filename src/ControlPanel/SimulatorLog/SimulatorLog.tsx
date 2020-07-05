import React, { FunctionComponent } from "react";
import "./SimulatorLog.css";
import { useSelector } from "react-redux";
import { getCurrentExecutionLogs } from "./simulatorLogSlice";

/**
 * Component for logging the commands of the simulator.
 */
export const SimulatorLog: FunctionComponent = () => {
  const currentExecutionLogs = useSelector(getCurrentExecutionLogs);

  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Command</th>
        </tr>
      </thead>
      <tbody>
        {currentExecutionLogs.logs.map((d) => (
          <tr key={d.id}>
            <td>{d.timestamp}</td>
            <td>{d.command}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
