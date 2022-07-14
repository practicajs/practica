"use strict";
const React = require("react");
const { render, Text, Box, Newline, Spacer, useStdout } = require("ink");
const MultiSelect = require("ink-multi-select").default;
const SelectInput = require("ink-select-input").default;
const TextInput = require("ink-text-input").UncontrolledTextInput;
var figlet = require("figlet");
const generateService = require("../generation-logic/generate-service");
const {
  factorDefaultOptions,
} = require("../generation-logic/generation-options");

const QuestionsWizard = () => {
  const initialQuestionsWizard = {
    isOver: false,
    finalMessage: "",
    chosenFramework: "",
    chosenDB: "",
    showWarningMessage: true,
    showNameQuestion: false,
    showFrameworkQuestion: false,
    showDBTypeQuestion: false,
    showFeatures: false,
    advice: "",
    title: figlet.textSync("Practica", {
      font: "big", //Good options: big, contessa, doom, straight
      horizontalLayout: "full",
      verticalLayout: "default",
      width: 60,
      whitespaceBreak: true,
    }),
    generationStatusMessage: "",
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
      value: "postgres",
      advice:
        "Strikes great balance between popularity and flexibility. Can handle both relational workload and light noSQL/JSON workload",
    },
    {
      label: "mySQL",
      value: "mySQL",
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
      value: "fastify",
      advice:
        "A minimalist web library that is easy to learn. A great choice when in a need to have full-control. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
    },
    {
      label: "Nest.JS",
      value: "nestJS",
      advice:
        "A minimalist web library that is easy to learn. A great choice when in a need to have full-control. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
    },
  ];

  const handleNameChoose = (name) => {
    setQuestionsWizard({
      ...questionsWizard,
      showDBTypeQuestion: false,
      showNameQuestion: false,
      showFrameworkQuestion: true,
    });
  };

  const warningWasConfirmed = () => {
    setQuestionsWizard({
      ...questionsWizard,
      showWarningMessage: false,
      advice:
        "Determines the root folder and the libraries scope name. For example, @your-org/logger",
      showNameQuestion: true,
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

  const handleFeaturesChoose = (selected) => {};

  const handleFlavourChoose = async (selected) => {
    setQuestionsWizard({
      ...questionsWizard,
      finalMessage:
        "🔁 Creating your app now. This might take a few seconds...",
      isOver: true,
    });
    const generationOptions = factorDefaultOptions({
      installDependencies: true,
      targetDirectory: process.cwd(),
      baseFramework: questionsWizard.chosenFramework,
      DBType: questionsWizard.chosenDB
    });
    console.log(`dan  ${JSON.stringify(generationOptions)}`);
    await generateService.generateApp(generationOptions);
    setQuestionsWizard({
      ...questionsWizard,
      isOver: true,
      finalMessage:
        "✅ Your app is ready and packed with great practices inside",
    });
  };

  const handleDBChoose = async (chosenOption) => {
    setQuestionsWizard({
      ...questionsWizard,
      chosenDB: chosenOption.value,
      showDBTypeQuestion: false,
      showFlavourQuestion: true,
    });
  };

  const onSelectItemChange = (selectedItem) => {
    const allOptions = [...databases, ...frameworks, ...flavours];
    const chosenItem = allOptions.find(
      (option) => option.value === selectedItem.value
    )?.advice;
    const activeAdvice = chosenItem ? chosenItem : "";
    setQuestionsWizard({ ...questionsWizard, advice: activeAdvice });
  };

  React.useEffect(async () => {}, []);

  return (
    <Box width={"100%"} alignSelf="center" flexDirection="column">
      <Box flexDirection="row" width="100%" flexBasis="100%">
        <Text flexBasis="100%" wrap="wrap" alignSelf="center">
          {questionsWizard.title}
        </Text>
      </Box>
      {!questionsWizard.isOver ? (
        <Box flexDirection="row">
          <Box
            width="50%"
            alignSelf="flex-start"
            borderStyle="classic"
            borderColor="grey"
            height={15}
            paddingX="3"
            marginX="3"
            alignItems="flex-start"
          >
            <Box flexDirection="column">
              <Box paddingY={1} alignSelf="flex-start">
                <Text color="white" bold={true}>
                  ⦾ Just a few questions first
                </Text>
                <Newline />
                <Spacer />
              </Box>
              <Box>
                <Box
                  display={
                    questionsWizard.showFeaturesQuestion ? "flex" : "none"
                  }
                >
                  <Text color="green">Cherry-pick features:</Text>
                  <Spacer />
                  <MultiSelect
                    items={features}
                    onSelectItem={handleFeaturesChoose}
                  />
                </Box>
                {questionsWizard.showWarningMessage ? (
                  <Box
                    display={
                      questionsWizard.showWarningMessage ? "flex" : "none"
                    }
                  >
                    <Text color="grey">
                      🔖 This is an alpha version of this wizard which is meant
                      for demo purposes. Whatever technologies you'll choose,
                      for now the generated app will be based on Express +
                      Postgres. Enter to continue or CTRL + C to exit
                    </Text>
                    <Spacer />
                    <TextInput value="" onSubmit={warningWasConfirmed} />
                  </Box>
                ) : (
                  <React.Fragment />
                )}
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

                {questionsWizard.showNameQuestion ? (
                  <Box
                    display={questionsWizard.showNameQuestion ? "flex" : "none"}
                  >
                    <Text color="green">Name of your app or organization:</Text>
                    <Spacer />
                    <TextInput value="" onSubmit={handleNameChoose} />
                  </Box>
                ) : (
                  <React.Fragment />
                )}

                {questionsWizard.showDBTypeQuestion ? (
                  <Box
                    display={
                      questionsWizard.showDBTypeQuestion ? "flex" : "none"
                    }
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
              </Box>
            </Box>
          </Box>
          <Box
            width="30%"
            borderStyle="classic"
            borderColor="grey"
            height={15}
            paddingX="5"
            marginX="3"
            alignItems="flex-start"
            alignSelf="flex-end"
          >
            <Box flexDirection="column">
              <Box paddingY={1} alignSelf="flex-start">
                <Text color="white" bold={true}>
                  ⦾ More Info
                </Text>
              </Box>
              <Box>
                <Text>{questionsWizard.advice}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <React.Fragment />
      )}
      {questionsWizard.isOver ? (
        <Box flexDirection="row" width="100%" flexBasis="100%">
          <Text
            flexBasis="100%"
            wrap="wrap"
            alignSelf="center"
            color="white"
            bold={true}
          >
            {questionsWizard.finalMessage}
          </Text>
        </Box>
      ) : (
        <React.Fragment />
      )}
    </Box>
  );
};

//<SelectInput items={items} onSelect={handleSubmit} />

export const renderWizard = () => {
  render(<QuestionsWizard />);
};
