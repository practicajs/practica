"use strict";
const React = require("react");
const { render, Text, Box, useStdout, Newline, Spacer } = require("ink");
const MultiSelect = require("ink-multi-select").default;
const Image = require("ink-image");
const path = require("path");
const SelectInput = require("ink-select-input").default;
const TextInput = require("ink-text-input").UncontrolledTextInput;
const BigText = require("ink-big-text");
var figlet = require("figlet");
const util = require("util");
const { generateApp } = require("./generation-logic/generate-service");
const { createAsExpression, readBuilderProgram } = require("typescript");
const terminalImage = require("terminal-image");

const promisifiedFiglet = util.promisify(figlet);

const QuestionsWizard = () => {
  const initialQuestionsWizard = {
    chosenFramework: "",
    chosenDB: "",
    showFrameworkQuestion: true,
    showDBTypeQuestion: false,
    showFinalMessage: false,
    advice:
      "The name of your organization or project will determine the root folder and the libraries scope. For example, the logger library will be named: @your-org/logger",
    title: figlet.textSync("Practica", {
      font: "Banner",
      horizontalLayout: "full",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    }),
  };
  const [questionsWizard, setQuestionsWizard] = React.useState(initialQuestionsWizard);
  const { stdout, write } = useStdout();

  const databases = [
    {
      label: "Postgres",
      value: "pg",
      advice:
        "Strikes a great balance between popularity and flexibility. Can handle both relational workload and light noSQL/JSON workload. It's the best choice for most applications.",
    },
    {
      label: "mySQL",
      value: "my-sql",
      advice: "Classic DB that mostly leans toward relational and structured data",
    },
    {
      label: "Mongo",
      value: "mongo",
      advice: "Great DB for scenarios when a flexible schema is needed",
    },
  ];

  const handleFrameworkChoose = (chosenOption) => {
    setQuestionsWizard({
      ...questionsWizard,
      chosenFramework: chosenOption.value,
      showFrameworkQuestion: false,
      showFinalMessage: false,
      showDBTypeQuestion: true,
    });
  };

  const handleDBChoose = async (chosenOption) => {
    setQuestionsWizard({
      ...questionsWizard,
      chosenDB: chosenOption.value,
      showFrameworkQuestion: false,
      showDBTypeQuestion: false,
      showFinalMessage: true,
      advice: "Inside the code you'll find ✅ icons. Those represents best practices to learn about",
    });
    const targetFolder = path.join(__dirname, "./");
    console.log("loo", targetFolder);
    await generateApp({
      baseFramework: "express2",
      DBType: "mongo",
      mainMicroserviceName: "microservice-1",
      emitBestPracticesHints: true,
      targetDirectory: targetFolder,
    });
  };

  const onSelectItemChange = (selectedItem) => {
    const advice = databases.find((db) => db.value === selectedItem.value)?.advice;
    setQuestionsWizard({ ...questionsWizard, advice });
  };

  const logoPath = path.join(__dirname, "./practica-logo.png");
  terminalImage.file(logoPath, { width: 70, preserveAspectRatio: true }).then((image) => stdout.write(image));

  return (
    <Box width={"100%"} alignSelf="flex-start" flexDirection="column">
      <Box flexDirection="row">
        <Box width="50%" alignSelf="flex-start" borderStyle="round" height={20} paddingX="5" alignItems="flex-start">
          <Box flexDirection="column">
            <Box paddingY={1} alignSelf="flex-start">
              <Text color="grey" bold={true}>
                To pack the right code for you, please answer few questions first
              </Text>
              <Newline />
              <Spacer />
            </Box>
            <Box>
              <Box display={questionsWizard.showFrameworkQuestion ? "flex" : "none"}>
                <Text color="green">Name of your app or organization:</Text>
                <Spacer />
                <TextInput value="" onSubmit={handleFrameworkChoose} />
              </Box>
              <Box display={questionsWizard.showDBTypeQuestion ? "flex" : "none"}>
                <Text color="green">Which is your preferred DB:</Text>
                <Spacer />
                <SelectInput
                  items={databases}
                  onSelect={handleDBChoose}
                  onChange={onSelectItemChange}
                  onSelectItemChange={onSelectItemChange}
                  onHighlight={onSelectItemChange}
                />
              </Box>
              <Box display={questionsWizard.showFinalMessage ? "flex" : "none"}>
                <Text color="green" bold={true}>
                  Your app is ready and packed with great practices. CTRL+C to quit
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="30%" borderStyle="round" height={20} paddingX="5" alignItems="flex-start" alignSelf="flex-end">
          <Box flexDirection="column">
            <Box paddingY={1} alignSelf="flex-start">
              <Text color="grey" bold={true}>
                Our advice here
              </Text>
            </Box>
            <Box>
              <Text>{questionsWizard.advice}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

render(<QuestionsWizard />);

//<SelectInput items={items} onSelect={handleSubmit} />
//<MultiSelect items={items} onSubmit={handleSubmit} />

export {};
