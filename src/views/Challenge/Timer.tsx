import { FC } from "react";
import StopwatchIcon from "./stopwatch.svg?react";
import styled from "styled-components";

const Wrap = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Timer: FC = () => {
  return (
    <Wrap>
      <StopwatchIcon height={32} />
      {/* TODO: figure out with stackholder how the timer suppose to work */}
      <span>0000.00</span>
    </Wrap>
  );
};
