import React, { FunctionComponent, useState, useEffect } from "react";
import "./SimulatorLog.css";
import { useSelector } from "react-redux";
import { getCurrentExecution, IExecutionLogState } from "./simulatorLogSlice";

/**
 * Component for logging the commands of the simulator.
 */
export const SimulatorLog: FunctionComponent = () => {
  const [tableData, setTableData] = useState({} as IExecutionLogState);
  const currentExecution = useSelector(getCurrentExecution());

  useEffect(() => {
    setTableData(currentExecution);
  }, [currentExecution]);

  return (
    <table>
      <thead
        style={{
          display: "table",
          tableLayout: "fixed",
        }}
      >
        <tr>
          <th>Timestamp</th>
          <th>Command</th>
        </tr>
      </thead>
      <tbody
        style={{
          display: "block",
          height: "100px",
          overflowY: "scroll",
        }}
      >
        {tableData &&
          tableData.logs &&
          tableData.logs.map((d) => (
            <tr>
              <td>{d.timestamp}</td>
              <td>{d.command}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
