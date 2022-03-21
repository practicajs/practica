"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWizard = void 0;
var React = require("react");
var _a = require("ink"), render = _a.render, Text = _a.Text, Box = _a.Box, useStdout = _a.useStdout, Newline = _a.Newline, Spacer = _a.Spacer, Transform = _a.Transform;
var MultiSelect = require("ink-multi-select").default;
var Image = require("ink-image");
var path = require("path");
var SelectInput = require("ink-select-input").default;
var TextInput = require("ink-text-input").UncontrolledTextInput;
var BigText = require("ink-big-text");
var figlet = require("figlet");
var util = require("util");
var generateApp = require("./generation-logic/generate-service").generateApp;
var _b = require("typescript"), createAsExpression = _b.createAsExpression, readBuilderProgram = _b.readBuilderProgram;
var terminalImage = require("terminal-image");
var promisifiedFiglet = util.promisify(figlet);
var QuestionsWizard = function () {
    var initialQuestionsWizard = {
        chosenFramework: "",
        chosenDB: "",
        showNameQuestion: true,
        showFrameworkQuestion: false,
        showDBTypeQuestion: false,
        showFinalMessage: false,
        showFeatures: false,
        advice: "The name of your organization or project will determine the root folder and the libraries scope. For example, the logger library will be named: @your-org/logger",
        title: figlet.textSync("Practica", {
            font: "Banner",
            horizontalLayout: "full",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
        }),
    };
    var _a = React.useState(initialQuestionsWizard), questionsWizard = _a[0], setQuestionsWizard = _a[1];
    var _b = useStdout(), stdout = _b.stdout, write = _b.write;
    var features = [
        { label: "Logger", value: "logger" },
        { label: "Request-ID - Correlation-ID", value: "request-id" },
        { label: "Error-Handler", value: "error-handling" },
    ];
    var databases = [
        {
            label: "Postgres",
            value: "pg",
            advice: "Strikes great balance between popularity and flexibility. Can handle both relational workload and light noSQL/JSON workload. It's the best choice for most applications.",
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
    var frameworks = [
        {
            label: "Express",
            value: "express",
            advice: "A super-popular and minimalist web library that is easy to learn and use. It's a great choice for small to medium sized applications. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
        },
        {
            label: "Fastify",
            value: "my-fastify",
            advice: "2A super-popular and minimalist web library that is easy to learn and use. It's a great choice for small to medium sized applications. /n ⭐️ 91,000 stars",
        },
        {
            label: "Nest.JS",
            value: "nestjs",
            advice: "A super-popular and minimalist web library that is easy to learn and use. It's a great choice for small to medium sized applications. \n \n ⭐️ 91,000 stars \n \n ⬇️ 1,200,000 downloads/week",
        },
    ];
    var handleNameChoose = function (name) {
        setQuestionsWizard(__assign(__assign({}, questionsWizard), { showFinalMessage: false, showDBTypeQuestion: false, showNameQuestion: false, showFrameworkQuestion: true }));
    };
    var handleFrameworkChoose = function (chosenOption) {
        setQuestionsWizard(__assign(__assign({}, questionsWizard), { chosenFramework: chosenOption.value, showFrameworkQuestion: false, showFinalMessage: false, showDBTypeQuestion: true }));
    };
    var handleFeaturesChoose = function (selected) {
        console.log(selected);
    };
    var handleDBChoose = function (chosenOption) { return __awaiter(void 0, void 0, void 0, function () {
        var targetFolder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setQuestionsWizard(__assign(__assign({}, questionsWizard), { chosenDB: chosenOption.value, showFrameworkQuestion: false, showDBTypeQuestion: false, showFinalMessage: false, showFwFeatures: true, advice: "Inside the code you'll find ✅ icons. Those represents best practices to learn about" }));
                    console.log(__dirname);
                    targetFolder = process.cwd();
                    return [4 /*yield*/, generateApp({
                            baseFramework: "express2",
                            DBType: "mongo",
                            mainMicroserviceName: "microservice-1",
                            emitBestPracticesHints: true,
                            targetDirectory: targetFolder,
                            appName: "autodesk",
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onSelectItemChange = function (selectedItem) {
        var _a;
        var allOptions = __spreadArray(__spreadArray([], databases, true), frameworks, true);
        var advice = (_a = allOptions.find(function (option) { return option.value === selectedItem.value; })) === null || _a === void 0 ? void 0 : _a.advice;
        setQuestionsWizard(__assign(__assign({}, questionsWizard), { advice: advice }));
    };
    //const logoPath = path.join(__dirname, "./practica-logo.png");
    //terminalImage.file(logoPath, { width: 70, preserveAspectRatio: true }).then((image) => );
    return (React.createElement(Box, { width: "100%", alignSelf: "flex-start", flexDirection: "column" },
        React.createElement(Box, { flexDirection: "row", width: "100%", flexBasis: "100%" },
            React.createElement(Text, { flexBasis: "100%", wrap: "wrap", alignSelf: "center" }, questionsWizard.title)),
        React.createElement(Box, { flexDirection: "row" },
            React.createElement(Box, { width: "50%", alignSelf: "flex-start", borderStyle: "round", height: 20, paddingX: "5", alignItems: "flex-start" },
                React.createElement(Box, { flexDirection: "column" },
                    React.createElement(Box, { paddingY: 1, alignSelf: "flex-start" },
                        React.createElement(Text, { color: "white", bold: true }, "Just a few questions first"),
                        React.createElement(Newline, null),
                        React.createElement(Spacer, null)),
                    React.createElement(Box, null,
                        React.createElement(Box, { display: questionsWizard.showFeaturesQuestion ? "flex" : "none" },
                            React.createElement(Text, { color: "green" }, "Cherry-pick features:"),
                            React.createElement(Spacer, null),
                            React.createElement(MultiSelect, { items: features, onSelectItem: handleFeaturesChoose })),
                        React.createElement(Box, { display: questionsWizard.showNameQuestion ? "flex" : "none" },
                            React.createElement(Text, { color: "green" }, "Name of your app or organization:"),
                            React.createElement(Spacer, null),
                            React.createElement(TextInput, { value: "", onSubmit: handleNameChoose })),
                        React.createElement(Box, { display: questionsWizard.showDBTypeQuestion ? "flex" : "none" },
                            React.createElement(Text, { color: "green" }, "Which is your preferred DB:"),
                            React.createElement(Spacer, null),
                            React.createElement(SelectInput, { items: databases, onSelect: handleDBChoose, onChange: onSelectItemChange, onSelectItemChange: onSelectItemChange, onHighlight: onSelectItemChange })),
                        React.createElement(Box, { display: questionsWizard.showFrameworkQuestion ? "flex" : "none" },
                            React.createElement(Text, { color: "green" }, "Your preferred framework:"),
                            React.createElement(Spacer, null),
                            React.createElement(SelectInput, { items: frameworks, onSelect: handleFrameworkChoose, onChange: onSelectItemChange, onSelectItemChange: onSelectItemChange, onHighlight: onSelectItemChange })),
                        React.createElement(Box, { display: questionsWizard.showFinalMessage ? "flex" : "none" },
                            React.createElement(Text, { color: "green", bold: true }, "Your app is ready and packed with great practices. CTRL+C to quit"))))),
            React.createElement(Box, { width: "35%", borderStyle: "round", height: 20, paddingX: "10", alignItems: "flex-start", alignSelf: "flex-end" },
                React.createElement(Box, { flexDirection: "column" },
                    React.createElement(Box, { paddingY: 1, alignSelf: "flex-start" },
                        React.createElement(Text, { color: "white", bold: true }, "Our advice")),
                    React.createElement(Box, null,
                        React.createElement(Text, null, questionsWizard.advice)))))));
};
//<SelectInput items={items} onSelect={handleSubmit} />
var renderWizard = function () {
    render(React.createElement(QuestionsWizard, null));
};
exports.renderWizard = renderWizard;
