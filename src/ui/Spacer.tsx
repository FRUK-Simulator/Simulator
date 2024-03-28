import styled from "styled-components";

export const Spacer = styled.div<{ size?: number }>`
  flex-grow: ${(props) => props.size ?? 1};
`;
