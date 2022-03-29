"use strict";
const React = require("react");
const { render, Text, Box, useStdout, Newline, Spacer, Transform } = require("ink");
const MultiSelect = require("ink-multi-select").default;
const SelectInput = require("ink-select-input").default;
const TextInput = require("ink-text-input").UncontrolledTextInput;
var figlet = require("figlet");
const { generateApp } = require("../generation-logic/generate-service");

const QuestionsWizard = () => {
  const initialQuestionsWizard = {
    chosenFramework: "",
    chosenDB: "",
    showNameQuestion: true,
    showFrameworkQuestion: false,
    showDBTypeQuestion: false,
    showFinalMessage: false,
    showFeatures: false,
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

  const features = [
    { label: "Logger", value: "logger" },
    { label: "Request-ID - Correlation-ID", value: "request-id" },
    { label: "Error-Handler", value: "error-handling" },
  ];

  const databases = [
    {
      label: "Postgres",
      value: "pg",
      advice:
        "Strikes great balance between popularity and flexibility. Can handle both relational workload and light noSQL/JSON workload. It's the best choice for most applications.",
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

  const frameworks = [
    {
      label: "Express",
      value: "express",
      advice:
        "A super-popular and minimalist web library that is easy to learn and use. It's a great choice for small to medium sized applications. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
    },
    {
      label: "Fastify",
      value: "my-fastify",
      advice:
        "2A super-popular and minimalist web library that is easy to learn and use. It's a great choice for small to medium sized applications. /n ⭐️ 91,000 stars",
    },
    {
      label: "Nest.JS",
      value: "nestjs",
      advice:
        "A super-popular and minimalist web library that is easy to learn and use. It's a great choice for small to medium sized applications. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
    },
  ];

  const handleNameChoose = (name) => {
    setQuestionsWizard({
      ...questionsWizard,
      showFinalMessage: false,
      showDBTypeQuestion: false,
      showNameQuestion: false,
      showFrameworkQuestion: true,
    });
  };

  const handleFrameworkChoose = (chosenOption) => {
    setQuestionsWizard({
      ...questionsWizard,
      chosenFramework: chosenOption.value,
      showFrameworkQuestion: false,
      showFinalMessage: false,
      showDBTypeQuestion: true,
    });
  };

  const handleFeaturesChoose = (selected) => {
    console.log(selected);
  };

  const handleDBChoose = async (chosenOption) => {
    setQuestionsWizard({
      ...questionsWizard,
      chosenDB: chosenOption.value,
      showFrameworkQuestion: false,
      showDBTypeQuestion: false,
      showFinalMessage: false,
      showFwFeatures: true,
      advice: "Inside the code you'll find ✅ icons. Those represents best practices to learn about",
    });
    console.log(__dirname);
    const targetFolder = process.cwd();
    await generateApp({
      baseFramework: "express2",
      DBType: "mongo",
      mainMicroserviceName: "microservice-1",
      emitBestPracticesHints: true,
      targetDirectory: targetFolder,
      appName: "autodesk",
    });
  };

  const onSelectItemChange = (selectedItem) => {
    const allOptions = [...databases, ...frameworks];
    const advice = allOptions.find((option) => option.value === selectedItem.value)?.advice;
    setQuestionsWizard({ ...questionsWizard, advice });
  };

  //const logoPath = path.join(__dirname, "./practica-logo.png");
  //terminalImage.file(logoPath, { width: 70, preserveAspectRatio: true }).then((image) => );

  return (
    <Box width={"100%"} alignSelf="flex-start" flexDirection="column">
      <Box flexDirection="row" width="100%" flexBasis="100%">
        <Text flexBasis="100%" wrap="wrap" alignSelf="center">
          {questionsWizard.title}
        </Text>
      </Box>
      <Box flexDirection="row">
        <Box width="50%" alignSelf="flex-start" borderStyle="round" height={20} paddingX="5" alignItems="flex-start">
          <Box flexDirection="column">
            <Box paddingY={1} alignSelf="flex-start">
              <Text color="white" bold={true}>
                Just a few questions first
              </Text>
              <Newline />
              <Spacer />
            </Box>
            <Box>
              <Box display={questionsWizard.showFeaturesQuestion ? "flex" : "none"}>
                <Text color="green">Cherry-pick features:</Text>
                <Spacer />
                <MultiSelect items={features} onSelectItem={handleFeaturesChoose} />
              </Box>
              <Box display={questionsWizard.showNameQuestion ? "flex" : "none"}>
                <Text color="green">Name of your app or organization:</Text>
                <Spacer />
                <TextInput value="" onSubmit={handleNameChoose} />
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
              <Box display={questionsWizard.showFrameworkQuestion ? "flex" : "none"}>
                <Text color="green">Your preferred framework:</Text>
                <Spacer />
                <SelectInput
                  items={frameworks}
                  onSelect={handleFrameworkChoose}
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
        <Box width="35%" borderStyle="round" height={20} paddingX="10" alignItems="flex-start" alignSelf="flex-end">
          <Box flexDirection="column">
            <Box paddingY={1} alignSelf="flex-start">
              <Text color="white" bold={true}>
                Our advice
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

//<SelectInput items={items} onSelect={handleSubmit} />

export const renderWizard = () => {
  render(<QuestionsWizard />);
};
