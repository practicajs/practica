"use strict";
var TextInput = require("ink-text-input").default;
var _a = require("ink"), render = _a.render, Text = _a.Text, Box = _a.Box, useStdout = _a.useStdout;
var React = require("react");
var SearchQuery = function () {
    var _a = React.useState(""), query = _a[0], setQuery = _a[1];
    var onChange = function (value) { };
    return (React.createElement(Box, null,
        React.createElement(Box, { marginRight: 1 },
            React.createElement(Text, null, "Enter your query:")),
        React.createElement(TextInput, { value: query, onChange: setQuery })));
};
render(React.createElement(SearchQuery, null));
