import React from "react";
import { FunctionComponent } from "react";
import "./StatusTile.css";

export enum StatusTileVariant {
  active = "status-tile--active",
  static = "status-tile--static",
}

export const StatusTile: FunctionComponent<{
  label: string;
  value: string | number;
  variant?: StatusTileVariant;
}> = ({ label, value, variant = StatusTileVariant.static }) => {
  return (
    <div className={`status-tile ${variant}`}>
      <div className="status-tile--label">{label}</div>
      <div className="status-tile--value">{value}</div>
    </div>
  );
};
