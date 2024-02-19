import styled from "styled-components";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { Feedback } from "./Feedback";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: var(--color-blue);
  flex: 0 0 56px;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 60px;
    list-style: none;
    align-items: stretch;
    padding: 0;
    margin-left: 74px;
    margin-right: 74px;
  }

  li {
    display: block;
  }

  a {
    line-height: 100%;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;

    &,
    &:visited {
      color: var(--color-white);
    }
  }
`;

const BannerSection = styled.div`
  display: flex;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <BannerSection>
        <Link to="/">
          <Logo />
        </Link>
        <Nav>
          <ul>
            <li>
              <Link to="lessons">Lessons</Link>
            </li>
            <li>
              <Link to="resources">Guidance and resources</Link>
            </li>
            <li>
              <Link to="sandbox">Sandbox</Link>
            </li>
            <li>
              <Link to="legacy">Legacy app</Link>
            </li>
          </ul>
        </Nav>
      </BannerSection>
      <Feedback />
    </StyledHeader>
  );
};
