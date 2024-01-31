import "./Divider.css";

export const Divider = ({ vertical }: { vertical?: boolean }) => {
  return (
    <div className={vertical ? "divider-vertical" : "divider-horizontal"} />
  );
};
