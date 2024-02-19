import { FC } from "react";
import styled from "styled-components";
import ConstructionIcon from "./construction.svg?react";
import { H3 } from "../../ui/Typography";

const Wrap = styled.div`
  color: var(--color-grey-mid);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

type Props = {
  title?: string;
};

export const UnderConstruction: FC<Props> = ({
  title = "Under construction",
}) => {
  return (
    <Wrap>
      <ConstructionIcon width={128} />
      <H3>{title}</H3>
    </Wrap>
  );
};
