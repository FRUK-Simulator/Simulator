export type Version = {
  major: number;
  minor: number;
  patch?: number;
};

export type Program = {
  title: string;
  description?: string;
  xml: string;
  predefined: boolean;
  version: Version;
};

export function exportToFile(program: Program) {
  const fakeLink = document.createElement("a");
  const file = new Blob([JSON.stringify(program)], {
    type: "application/json",
  });
  fakeLink.href = URL.createObjectURL(file);
  fakeLink.download = `${program.title}.json`;
  fakeLink.click();
}

export function importFromFile() {
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
