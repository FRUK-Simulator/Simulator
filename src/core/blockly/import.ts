import { Program } from "../../BlocklyInterface/BlocklyProgramSaver";

export function loadDialogueAndImport() {
  return new Promise<Program>((res, rej) => {
    const fakeFileInput = document.createElement("input");
    fakeFileInput.type = "file";
    fakeFileInput.onchange = (event) => {
      const input = event?.target as HTMLInputElement;

      const files = input.files;
      if (!files || !files[0]) {
        return rej(new Error("No file selected"));
      }
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event?.target?.result as string;
        if (!result) {
          return rej(new Error("Unexpected error opening file"));
        }

        try {
          const program = JSON.parse(result || "") as Program;
          if (!program.title) {
            program.title = file.name;
          }

          // cannot load predefined programs
          program.predefined = false;

          return res(program);
        } catch (err) {
          return rej(new Error("Program is in an invalid format"));
        }
      };

      reader.readAsText(file);
    };

    fakeFileInput.click();
  });
}
