"use strict";
var blessed = require("blessed");
var path = require("path");
// Create a screen object.
var screen = blessed.screen({
    smartCSR: true,
});
screen.title = "Practica";
// Create a box perfectly centered horizontally and vertically.
var box1 = blessed.box({
    top: "5",
    left: "5",
    width: "40%",
    height: "40%",
    content: "Hello {bold}world{/bold}!",
    tags: true,
    border: {
        type: "line",
    },
    style: {
        fg: "white",
        bg: "magenta",
        border: {
            fg: "#f0f0f0",
        },
        hover: {
            bg: "green",
        },
    },
});
// Create a box perfectly centered horizontally and vertically.
var box2 = blessed.box({
    top: "5",
    left: "400",
    width: "40%",
    height: "40%",
    tags: true,
    border: {
        type: "line",
    },
    style: {
        fg: "white",
        bg: "magenta",
        border: {
            fg: "#f0f0f0",
        },
        hover: {
            bg: "green",
        },
    },
});
var textArea = blessed.textbox();
var prompt = blessed.prompt();
// Append our box to the screen.
box1.append(textArea);
box1.append(prompt);
screen.append(box1);
screen.append(box2);
setTimeout(function () {
    box2.setText("loo");
    prompt.input("Enter your name:", "yoni", function (err, value) {
        if (err) {
            return;
        }
        box2.setText(value);
    });
}, 5000);
var image = path.join(__dirname, "./practica-icon.jpeg");
// Add a png icon to the box
var icon = blessed.image({
    parent: box1,
    top: 0,
    left: 0,
    type: "overlay",
    width: "shrink",
    height: "shrink",
    file: image,
    search: false,
});
box2.append(icon);
// If our box is clicked, change the content.
box1.on("click", function (data) {
    box1.setContent("{center}Some different {red-fg}content{/red-fg}.{/center}");
    screen.render();
});
// Quit on Escape, q, or Control-C.
screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
});
// Focus our element.
box2.focus();
// Render the screen.
screen.render();
