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
  flex: 1 0 auto;
`;

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <Main>{children}</Main>
    </StyledLayout>
  );
};
