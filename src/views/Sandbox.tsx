import { H1, H2, H3, H4, Subheading1, Subheading2, P } from "../ui/Typography";
import { Button } from "../ui/Button";
import { PageHeading } from "../ui/PageHeading/PageHeading";

export const Sandbox = () => {
  return (
    <div style={{ padding: 40 }}>
      <PageHeading backgroundType="pink-1" markerText="pink-1" heading="Page Heading" description="Description paragraphs. This is the first sentence. And this is the second sentence." /><br /><br />
      <PageHeading backgroundType="pink-2" markerText="pink-2" heading="Page Heading" description="Description paragraphs. This is the first sentence. And this is the second sentence." /><br /><br />
      <PageHeading backgroundType="blue-1" markerText="blue-1" heading="Page Heading" description="Description paragraphs. This is the first sentence. And this is the second sentence." />
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <Subheading1>Subheading 1</Subheading1>
      <Subheading2>Subheading 2</Subheading2>
      <P>Body Text</P>
      <Button type="primary">Primary button</Button><br /><br />
      <Button type="primary-blue">Primary Blue button</Button><br /><br />
    </div>
  );
};
