/* Import the editor,Skulpt and the styles */

import "./styles/index.css";
import maze from "./assets/img/maze.png";
import {
  editor,
  insertPythonSnippet,
  makeUneditable,
  saveAsPythonFile,
  loadModifiedCode,
  saveModifideCode,
} from "./editor/editor";

import Sk from "./skulpt/skulpt";
import { outputfun, builtinRead } from "./skulpt/functions";

// ----------------------------------------

/* Define the global variables */

let editable = false;

// ----------------------------------------

/* Get the elements from the DOM */

const blocklyDiv = document.getElementById("editor");
const copyButton = document.getElementById("copy-button");
const runcodeButton = document.getElementById("run-button");
const clearButton = document.getElementById("clear-button");
const exportButton = document.getElementById("export-button");
const backgroundButton = document.getElementById("background-button")
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");
const runButtonText = document.getElementById("run-text");
const codeDiv = document.getElementById("code");
const outputDiv = document.getElementById("output");
const terminal = document.getElementById("terminal-output");

// ----------------------------------------

/* Function Definitions */

/* Funtion to run the code */
async function runcode() {
  let code = editor.state.doc.toString();
  var codeRunner = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, code, true);
  });
  codeRunner.then(
    function (mod) {
      console.log("success");
    },
    function (err) {
      console.log(err.toString());
    }
  );
}

/* Function to copy the code */
async function copyTextToClipboard(textToCopy) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    }
  } catch (err) {
    console.error("Error copying text to clipboard:", err);
  }
}

/* Function to show notification */
function showNotification(message) {
  notificationText.innerText = message;

  // Show the notification
  notification.classList.add("show");

  // Hide the notification after 2 seconds
  setTimeout(function () {
    notification.classList.remove("show");
  }, 1500);
}

// ----------------------------------------

/*Initialize the skulpt */
Sk.configure({ output: outputfun, read: builtinRead });
(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "editor";

// ----------------------------------------

/* Event Listeners */

copyButton.addEventListener("click", () => {
  let code = editor.state.doc.toString();
  if (code === "") {
    showNotification("No code to copy");
    return;
  }
  copyTextToClipboard(code);
  showNotification("Code copied to clipboard");
});

runcodeButton.addEventListener("click", () => {
  runcode();
});

clearButton.addEventListener("click", () => {
  terminal.innerHTML = "Python 3.10 \n>>> ";
  showNotification("Terminal cleared");
});


exportButton.addEventListener("click", () => {
  const content = editor.state.doc.toString();
  if (content === "") {
    showNotification("No code to export");
    return;
  }
  saveAsPythonFile(content);
  showNotification("Code exported as script.py");
});

backgroundButton.addEventListener("click", () => {
    blocklyDiv.style.backgroundImage = `url(${maze})`;
    showNotification("Background changed");
    }
);

document.addEventListener("DOMContentLoaded", () => {
  showNotification("Welcome to Python Editor");
  terminal.innerHTML = "Python 3.10 \n>>> ";
  notification.style.transition = "opacity 0.5s ease-in-out";
});
