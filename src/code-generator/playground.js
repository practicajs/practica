const TextInput = require("ink-text-input").default;
const { render, Text, Box, useStdout } = require("ink");
const React = require("react");

const SearchQuery = () => {
  const [query, setQuery] = React.useState("");

  const onChange = (value) => {};

  return (
    <Box>
      <Box marginRight={1}>
        <Text>Enter your query:</Text>
      </Box>

      <TextInput value={query} onChange={setQuery} />
    </Box>
  );
};

render(<SearchQuery />);
