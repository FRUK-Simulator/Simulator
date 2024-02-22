import styled from "styled-components";
import logoUrl from "./kobot.svg";

const Wrap = styled.div`
  display: flex;
  position: relative;
  width: 218px;
  height: 100%;
`;

const Prefix = styled.div`
  background-color: var(--color-green);
  width: 100px;
`;

const Image = styled.img`
  position: absolute;
  left: 56px;
`;

export const Logo = () => {
  return (
    <Wrap>
      <Prefix />
      <Image src={logoUrl} />
    </Wrap>
  );
};
