import styled from "styled-components";
import { H1, Subheading2, P } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import shapesBlueUrl from "./shapes-blue.svg";
import shapesPinkUrl from "./shapes-pink.svg";

const Wrap = styled.div`
  padding: 48px 40px;
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const Block = styled.div<{ color: string; bgUrl: string }>`
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 60px 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  color: var(--color-white);
  flex: 1 1 50%;
  min-width: 360px;
  box-sizing: border-box;
  align-items: flex-start;
`;

const BlockH1 = styled(H1)`
  margin-top: 0;
  margin-bottom: 0;
`;

// not in Design System spec but used in Figma page design
// just do an adhoc implementation
const Paragraph = styled(P)`
  font-size: 20px;
  line-height: 24px;
  margin-top: 16px;
  margin-bottom: 32px;
  flex-basis: 100px;
`;

const Subheading = styled(Subheading2)`
  opacity: 0.75;
`;

const Spacer = styled.div<{ size?: number }>`
  flex-grow: ${(props) => props.size ?? 1};
`;

export const Home = () => {
  return (
    <Wrap>
      <Block color="var(--color-red)" bgUrl={shapesPinkUrl}>
        <Subheading>&lt;Students&gt;</Subheading>
        <Spacer size={2} />
        <BlockH1>Play</BlockH1>
        <Paragraph>
          Learn how to code and put your skills to the test with our simulator.
          Piece together blocks of code to make our robots move and solve
          challenges. Solve every challenge to reconstruct our dismantled
          robots!
        </Paragraph>
        <Spacer size={1} />
        <Button type="primary-blue" to="lessons">
          START LEARNING!
        </Button>
      </Block>
      <Block color="var(--color-blue)" bgUrl={shapesBlueUrl}>
        <Subheading>&lt;Teachers&gt;</Subheading>
        <Spacer size={2} />
        <BlockH1>Teach</BlockH1>
        <Paragraph>
          The simulator has been produced by a group of software engineers at
          Bloomberg in association with First UK. We equip young people with the
          technical knowledge knowhow and soft skills to succeed in engineering.
        </Paragraph>
        <Spacer size={1} />
        <Button type="primary-blue" to="resources">
          START TEACHING!
        </Button>
      </Block>
    </Wrap>
  );
};
