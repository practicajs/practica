"use strict";
const React = require("react");
const { render, Text, Box, Newline, Spacer } = require("ink");
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
      "Determine the root folder and the libraries scope name. For example, @your-org/logger",
    title: figlet.textSync("Practica", {
      font: "Banner",
      horizontalLayout: "full",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    }),
  };
  const [questionsWizard, setQuestionsWizard] = React.useState(
    initialQuestionsWizard
  );

  const features = [
    { label: "Logger", value: "logger" },
    { label: "Request-ID - Correlation-ID", value: "request-id" },
    { label: "Error-Handler", value: "error-handling" },
  ];

  const flavours = [
    {
      label: "Minimal",
      value: "minimal",
      advice:
        "Configuration only things such as linters. When you want to code everything yourself",
    },
    {
      label: "Full-flow",
      value: "full-flow",
      advice:
        "Demonstrates full request flow. Packs common best practices. \n \n ✅ 82/120 Best Practices ",
    },
    {
      label: "Fully featured",
      value: "fully-featured",
      advice:
        "All our best practices are packed inside. Might be an overkill for some apps",
    },
    {
      label: "Cherry pick",
      value: "cherry-pick",
      advice: "Specifically choose the features that you need",
    },
  ];

  const databases = [
    {
      label: "Postgres",
      value: "pg",
      advice:
        "Strikes great balance between popularity and flexibility. Can handle both relational workload and light noSQL/JSON workload",
    },
    {
      label: "mySQL",
      value: "my-sql",
      advice:
        "Classic DB that mostly leans toward relational and structured data",
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
        "A minimalist web library that is easy to learn. A great choice when in a need to have full-control. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
    },
    {
      label: "Fastify",
      value: "my-fastify",
      advice:
        "A minimalist web library that is easy to learn. A great choice when in a need to have full-control. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
    },
    {
      label: "Nest.JS",
      value: "nestjs",
      advice:
        "A minimalist web library that is easy to learn. A great choice when in a need to have full-control. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
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
      showDBTypeQuestion: true,
    });
  };

  const handleFeaturesChoose = (selected) => {
    console.log("fatuers", selected);
  };

  const handleFlavourChoose = (selected) => {
    console.log("flavour", selected);
  };

  const handleDBChoose = async (chosenOption) => {
    console.log("db choose");
    setQuestionsWizard({
      ...questionsWizard,
      chosenDB: chosenOption.value,
      showDBTypeQuestion: false,
      showFlavourQuestion: true,
    });

    // await generateApp({
    //   baseFramework: "express",
    //   DBType: "mongo",
    //   mainMicroserviceName: "microservice-1",
    //   emitBestPracticesHints: true,
    //   targetDirectory: process.cwd(),
    //   appName: "autodesk",
    // });
  };

  const onSelectItemChange = (selectedItem) => {
    const allOptions = [...databases, ...frameworks, ...flavours];
    const chosenItem = allOptions.find(
      (option) => option.value === selectedItem.value
    )?.advice;
    const activeAdvice = chosenItem ? chosenItem : "";
    setQuestionsWizard({ ...questionsWizard, advice: activeAdvice });
  };

  return (
    <Box width={"100%"} alignSelf="flex-start" flexDirection="column">
      <Box flexDirection="row" width="100%" flexBasis="100%">
        <Text flexBasis="100%" wrap="wrap" alignSelf="center">
          {questionsWizard.title}
        </Text>
      </Box>
      <Box flexDirection="row">
        <Box
          width="50%"
          alignSelf="flex-start"
          borderStyle="round"
          height={20}
          paddingX="5"
          alignItems="flex-start"
        >
          <Box flexDirection="column">
            <Box paddingY={1} alignSelf="flex-start">
              <Text color="white" bold={true}>
                Just a few questions first
              </Text>
              <Newline />
              <Spacer />
            </Box>
            <Box>
              <Box
                display={questionsWizard.showFeaturesQuestion ? "flex" : "none"}
              >
                <Text color="green">Cherry-pick features:</Text>
                <Spacer />
                <MultiSelect
                  items={features}
                  onSelectItem={handleFeaturesChoose}
                />
              </Box>
              {questionsWizard.showFlavourQuestion ? (
                <Box
                  display={
                    questionsWizard.showFlavourQuestion ? "flex" : "none"
                  }
                >
                  <Text color="green">Which level of starter:</Text>
                  <Spacer />
                  <SelectInput
                    items={flavours}
                    onHighlight={onSelectItemChange}
                    onSelectItemChange={onSelectItemChange}
                    onSelect={handleFlavourChoose}
                  />
                </Box>
              ) : (
                <React.Fragment />
              )}
              <Box display={questionsWizard.showNameQuestion ? "flex" : "none"}>
                <Text color="green">Name of your app or organization:</Text>
                <Spacer />
                <TextInput value="" onSubmit={handleNameChoose} />
              </Box>

              {questionsWizard.showDBTypeQuestion ? (
                <Box
                  display={questionsWizard.showDBTypeQuestion ? "flex" : "none"}
                >
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
              ) : (
                <React.Fragment />
              )}

              {questionsWizard.showFrameworkQuestion ? (
                <Box
                  display={
                    questionsWizard.showFrameworkQuestion ? "flex" : "none"
                  }
                >
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
              ) : (
                <React.Fragment />
              )}
              <Box display={questionsWizard.showFinalMessage ? "flex" : "none"}>
                <Text color="green" bold={true}>
                  Your app is ready and packed with great practices. CTRL+C to
                  quit
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          width="35%"
          borderStyle="round"
          height={20}
          paddingX="10"
          alignItems="flex-start"
          alignSelf="flex-end"
        >
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
