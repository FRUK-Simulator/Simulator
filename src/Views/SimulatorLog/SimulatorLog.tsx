import React, { FunctionComponent, useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./SimulatorLog.css";
import { useSelector } from "react-redux";
import { getMotorPower } from "../../RobotSimulator/robotSimulatorSlice";

/**
 * Component for logging the commands of the simulator.
 */
export const SimulatorLog: FunctionComponent = () => {
  const [tableData, setTableData] = useState<row[]>([]);
  const motorPower0 = useSelector(getMotorPower(0));
  const motorPower1 = useSelector(getMotorPower(1));

  useEffect(() => {
    setTableData((tableData) => [new row(0, motorPower0), ...tableData]);
  }, [motorPower0]);

  useEffect(() => {
    setTableData((tableData) => [new row(1, motorPower1), ...tableData]);
  }, [motorPower1]);

  return (
    <div>
      <ReactTable
        data={tableData}
        columns={[
          {
            Header: "Timestamp",
            accessor: "timestamp",
          },
          {
            Header: "Command",
            accessor: "command",
          },
        ]}
        defaultPageSize={100}
        style={{
          height: "200px",
          fontSize: "10px",
        }}
        className="-striped -highlight"
      />
    </div>
  );
};

class row {
  public timestamp: String;
  public command: String;

  constructor(port: number, power: number) {
    this.timestamp = new Date().toISOString();
    this.command = "set DC Motor on port " + port + " to " + power + "%";
  }
}
