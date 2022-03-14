"use strict";
const React = require("react");
const { render, Text, Box, useStdout } = require("ink");
const MultiSelect = require("ink-multi-select").default;
const Image = require("ink-image");
const path = require("path");
const SelectInput = require("ink-select-input").default;
const TextInput = require("ink-text-input").UncontrolledTextInput;
const BigText = require("ink-big-text");
var figlet = require("figlet");
const util = require("util");
const promisifiedFiglet = util.promisify(figlet);

const QuestionsWizard = () => {
  const initialQuestionsWizard = {
    showFrameworkQuestion: true,
    showDBTypeQuestion: false,
    chosenD: "",
  };
  const [questionsWizard, setQuestionsWizard] = React.useState(initialQuestionsWizard);
  const { stdout, write } = useStdout();
  console.log("Start", questionsWizard);

  const items = [
    {
      label: "Postgres",
      value: "pg",
    },
    {
      label: "mySQL",
      value: "my-sql",
    },
    {
      label: "Mongo",
      value: "mongo",
    },
  ];

  let mainTitle;

  

  React.useEffect(() => {
    figlet(
      "Practica",
      {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      },
      (error, result) => {
        mainTitle = result;
      }
    );
  }

  // React.useEffect(async () => {
  //   //await
  //   mainTitle = data;
  // });

  const handleFrameworkChoose = (chosenOption) => {
    console.log(chosenOption, questionsWizard);
    questionsWizard.showFrameworkQuestion = false;
    questionsWizard.showDBTypeQuestion = true;
    setQuestionsWizard({
      showFrameworkQuestion: false,
      showDBTypeQuestion: true,
    });
  };
  const handleDBChoose = (chosenOption) => {
    console.log(chosenOption, questionsWizard);
    setQuestionsWizard({
      showFrameworkQuestion: false,
      showDBTypeQuestion: false,
    });
  };
  const onChange = (value) => {
    console.log("change", value);
  };

  const onSelectItemChange = (value) => {
    const newState = { ...questionsWizard };
    newState.chosenDB = value.label;
    console.log(value.newState);
    setQuestionsWizard(newState);
  };

  const logoPath = path.join(__dirname, "./practica-logo.png");

  return (
    <Box width={"100%"} alignSelf="flex-start">
      <Box width={"99%"} alignSelf="flex-center">
        <Text>{mainTitle}</Text>
      </Box>
      <Box width="60%" alignSelf="flex-start" borderStyle="round" height="100%" paddingX="5">
        {questionsWizard.showFrameworkQuestion ? (
          <Box>
            <Text>Framework:</Text>
            <TextInput value="" onSubmit={handleFrameworkChoose} />
          </Box>
        ) : (
          <Box>
            <Text>DB:</Text>
            <SelectInput
              items={items}
              onSelect={handleDBChoose}
              onChange={onSelectItemChange}
              onSelectItemChange={onSelectItemChange}
              onHighlight={onSelectItemChange}
            />
          </Box>
        )}
      </Box>
      <Box width="40%" alignSelf="flex-end" borderStyle="round" height="100%" paddingX="5">
        <Text>{questionsWizard.chosenDB}</Text>
      </Box>
    </Box>
  );
};

render(<QuestionsWizard />);

//<SelectInput items={items} onSelect={handleSubmit} />
//<MultiSelect items={items} onSubmit={handleSubmit} />
