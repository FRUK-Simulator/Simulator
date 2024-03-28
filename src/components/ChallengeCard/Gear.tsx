import { FC } from "react";
import styled from "styled-components";

import GearIcon from "./gear.svg?react";
import { H4 } from "../../ui/Typography";

const Wrap = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #085887;
  border-radius: 5px;
  border: 1px solid #074d76;
  color: ${({ disabled }) => (disabled ? "#074d76" : "#ffffff")};
`;

const Label = styled(H4)`
  margin: 0;
  line-height: 1;
`;

export const Gear: FC<{ count?: number; className?: string }> = ({
  count = 0,
  className,
}) => {
  return (
    <Wrap className={className} disabled={count === 0}>
      <GearIcon width={32} />
      <Label>{count}</Label>
    </Wrap>
  );
};
