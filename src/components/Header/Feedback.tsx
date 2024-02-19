import styled from "styled-components";

const Wrap = styled.div`
  background-color: var(--color-green);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 164px;
  flex-shrink: 0;
`;

const StyledLink = styled.a`
  line-height: 100%;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;

  &,
  &:visited {
    color: var(--color-white);
  }
`;

export const Feedback = () => {
  return (
    <Wrap>
      <StyledLink href="">Feedback</StyledLink>
    </Wrap>
  );
};
