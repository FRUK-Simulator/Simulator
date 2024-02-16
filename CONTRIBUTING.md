# Contributing to Kobot

Thank you for your interest in contributing to KOBOT! We welcome contributions from the community to help improve the project.

## Getting Started

To get started with contributing, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Install the project dependencies by running `npm install`.
3. Make your changes or additions to the codebase.
4. Write tests to cover your changes and ensure existing tests pass.
5. Run the tests locally to verify everything is working as expected.
6. Commit your changes and push them to your forked repository.
7. Open a pull request to the main repository targeting `main` branch, describing your changes and why they are valuable.

## Code Style

We follow a specific code style in this project to maintain consistency. Please make sure to adhere to the guidelines instructed by ESLint and Prettier. For detailed rules please read the `.eslintrc.cjs` and `.prettierrc` files accordingly.

## Folder structure and Naming conventions

We are in a transition to the brand new Kobot 2024 design. As a result, we are in the process of re-organizing the folder structure and naming conventions. Here are some of the essentail guidelines to follow:

- All the source code goes to `src` folder.
- All the unit tests sit side by side with the source code ending with `.spec.ts` extension.
- (amend integration tests conventions here)
- Source code files named in `kebab-case` including React hooks, and component files named in `PascalCase`.
- Sharable UI library components defined in the design system should be put under `src/ui/ComponentName.tsx`
- Layout components and shareable bussiness logic involved components can go to `src/components/ComponentName.tsx`
- Views and pages specific components can be put under `src/views/ViewName/ComponentName.tsx`
- RobotSimulator components can stay under `src/RobotSimulator` folder.
- Blockly controllers can stay under `src/BlocklyInterface` folder.
