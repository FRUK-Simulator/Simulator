import { FC } from "react";
import styled from "styled-components";
import { H3, Subheading1 } from "../../ui/Typography";
import { Timer } from "./Timer";

type Props = {
  title: string;
  subtitle: string;
};

const Header = styled.div`
  padding: 20px 70px;
  background-color: var(--color-blue-dark);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubHeading = styled(Subheading1)`
  color: var(--color-grey-mid);
  margin: 0;
`;

const Heading = styled(H3)`
  margin: 4px 0 0;
`;

export const ChallengeHeader: FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <Header>
        <div>
          <SubHeading>&lt;{subtitle}&gt;</SubHeading>
          <Heading>{title}</Heading>
        </div>
        <Timer />
      </Header>
    </>
  );
};
