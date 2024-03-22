import styled from "styled-components";
import { FC } from "react";
import { PageHeader } from "../../ui/PageHeader/PageHeader";
import { UnderConstruction } from "../../components/UnderConstruction/UnderConstruction";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
`;

export const Resources: FC = () => {
  return (
    <Wrap>
      <PageHeader
        backgroundType="blue-1"
        markerText="For teachers"
        heading="Guidance & Resources"
        description="Hello and welcome to the Kobot simulator lesson pack, our simulator has been put together to engage young people in."
      />
      <UnderConstruction title="Resources page under construction" />
    </Wrap>
  );
};
