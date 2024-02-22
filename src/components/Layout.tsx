import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Header } from "./Header/Header";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1 0 auto;
  background-color: var(--color-blue-light);
`;

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <Main>{children}</Main>
    </StyledLayout>
  );
};
