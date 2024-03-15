# List of Components

## Introduction

This is based on an audit of the Website design as of version 12/11/22.

Links:

- Design System: https://lucky-smakager-43f6a1.netlify.app/
- Figma Prototype: https://www.figma.com/proto/QwuKynkYxQ67gwjZKrSubU/Kobot-UI-Ideas
- Figma Design: https://www.figma.com/file/QwuKynkYxQ67gwjZKrSubU/Kobot-UI-Ideas?type=design&node-id=1220-830&mode=design&t=DYTcmCWUmRtDRFGl-0

### Components

Below table lists the types of components that need to be available in order to completely render this Web application.

| Component Name              | Purpose / Description                                                                                                                            | Assets Required                     | Source Code Link | Used in which pages                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ---------------- | --------------------------------------------------------------------- |
| Header                      | The header bar with the navigation items and logo.                                                                                               | <ul><li>Logo</li></ul>              | [Header.tsx](https://github.com/FRUK-Simulator/Simulator/blob/main/src/components/Header/Header.tsx)            | All pages                                                             |
| H1                          | Headline level one                                                                                                                               | N/A                                 | [Typography.tsx#H1](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L4)     | <ul><li>Page 1</li></ul>                                              |
| H2                          | Headline level two                                                                                                                               | N/A                                 | [Typography.tsx#H2](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L10)    | <ul><li>Page 2</li><li>Page 3</li><li>Page 4</li><li>Page 5</li></ul> |
| H3                          | Headline level three                                                                                                                             | N/A                                 | [Typography.tsx#H3](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L16)    | <ul><li>Page 2</li><li>Page 3</li><li>Page 4</li></ul>                |
| H4                          | Headline level four                                                                                                                              | N/A                                 | [Typography.tsx#H4](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L21)    | <ul><li>Page 2</li><li>Page 3</li><li>Page 4</li></ul>                |
| Subheading1                 | Subheadings / markers - the one shown as "blue"                                                                                                  | N/A                                 | [Typography.tsx#Subheading1](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L25)            | All pages                                                             |
| Subheading2                 | Subheadings / markers - the one shown as "red"                                                                                                   | N/A                                 | [Typography.tsx#Subheading2](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L29)            | All pages                                                             |
| P                           | Paragraphs or a body of text                                                                                                                     | N/A                                 | [Typography.tsx#Subheading2](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Typography.tsx#L34)            | <ul><li>Page 1</li><li>Page 2</li><li>Page 3</li><li>Page 4</li></ul> |
| Button                      | A button, which can be one of the following types: primary, primary-blue, secondary, tertiary.                                                   | N/A                                 | [Button.tsx](https://github.com/FRUK-Simulator/Simulator/blob/main/src/ui/Button.tsx)     | <ul><li>Page 1</li><li>Page 2</li><li>Page 3</li><li>Page 4</li></ul> |
| PageHeading                 | The header section at the top of most pages.                                                                                                     | <ul><li>Typefaces</li></ul>         | (TBA)            | <ul><li>Page 2</li><li>Page 3</li><li>Page 4</li></ul>                |
| LessonCard                  | A container representing a "Lesson Card".                                                                                                      | None                                | (TBA)            | <ul><li>Page 2</li><li>Page 4</li></ul>                                              |
| InformationCard             | A container representing an "Information Card" which is typically used alongside LessonCard.                                                                                                      | None                                | (TBA)            | <ul><li>Page 2</li><li>Page 4</li></ul>                                              |
| LessonMascot                | A component that can show the corresponding mascot given the Lesson number.                                                                      | <ul><li>The mascot images</li></ul> | (TBA)            | <ul><li>Page 2</li><li>Page 4</li></ul>                               |
| ChallengesProgressIndicator | A component that can show the user's progress indicator on the challenges for a given Lesson, and can optionally display the total count number. | <ul><li>The gear icon</li></ul>     | (TBA)            | <ul><li>Page 2</li><li>Page 3</li></ul>                               |
