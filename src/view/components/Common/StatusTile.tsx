import { FunctionComponent } from "react";
import "./StatusTile.css";

export enum StatusTileVariant {
  active = "status-tile--active",
  static = "status-tile--static",
}

export const StatusTile: FunctionComponent<{
  label: string;
  value: string | number;
  sublabel?: string;
  variant?: StatusTileVariant;
  isColor?: boolean;
}> = ({
  label,
  value,
  sublabel = null,
  variant = StatusTileVariant.static,
  isColor = false,
}) => {
  return (
    <div className={`status-tile ${variant}`}>
      <div className="status-tile--label">{label}</div>
      {sublabel ? (
        <div className="status-tile--sub-label">{sublabel}</div>
      ) : null}
      {isColor ? (
        <div>
          <div
            className="status-tile--colorBox"
            style={{ backgroundColor: value.toString() }}
          />
          <div className="status-tile--value status-tile--color">{value}</div>
        </div>
      ) : (
        <div className="status-tile--value">{value}</div>
      )}
    </div>
  );
};
