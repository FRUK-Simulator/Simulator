import React from "react";
import { useSelector } from "react-redux";
import { getMotorStats } from "../../RobotSimulator/robotSimulatorSlice";
import { Container } from "../components/Common/Container";
import { Divider } from "../components/Common/Divider";
import { StatusTile, StatusTileVariant } from "../components/Common/StatusTile";
import { Title } from "../components/Common/Title";
import "./RobotView.css";

export const RobotView = () => {
  const motorStats = useSelector(getMotorStats);

  return (
    <>
      <Container className="robot-view">
        <Title as="h2" divider>
          Robot Status
        </Title>
        <Divider />
        <div className="robot-view--stats">
          <StatusTile label="Robot Motors" value={motorStats.length} />
          {motorStats.map(([label, value]) => (
            <StatusTile
              variant={StatusTileVariant.active}
              label={`Port ${label}`}
              value={value}
            />
          ))}
        </div>
      </Container>
    </>
  );
};
