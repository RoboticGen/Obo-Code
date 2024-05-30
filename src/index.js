/* Import the editor,Skulpt and the styles */

import "./styles/index.css";
import maze from "./assets/img/maze.png";
import {
  editor,
  insertPythonSnippet,
  saveAsPythonFile,
} from "./editor/editor";

import Sk from "./skulpt/skulpt";
import { outputfun, builtinRead } from "./skulpt/functions";

// ----------------------------------------

/* Define the global variables */

let editable = false;
let stopExecution = false;
let isCodeRunning = false;
let backgroundImageMap = {
  "No-Background": "none",
  "maze": maze,
}

// ----------------------------------------

/* Get the elements from the DOM */

const blocklyDiv = document.getElementById("editor");
const copyButton = document.getElementById("copy-button");
const runcodeButton = document.getElementById("run-button");
const clearButton = document.getElementById("clear-button");
const stopButton = document.getElementById("stop-button");
const exportButton = document.getElementById("export-button");
const selectElement = document.getElementById('background-selection');
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
  if (code === "") {
    showNotification("No code to run");
    return;
  }
  if (isCodeRunning) {
    showNotification("Code is already running");
    return;
  }
  isCodeRunning = true;
  Sk.misceval
    .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true), {
      "*": () => {
        if (stopExecution) throw "Execution interrupted";
      },
    })
    .catch((err) => {
      let errorMsg = err.toString();
      if (errorMsg === "Execution interrupted") {
        showNotification("Code execution stopped");
        stopExecution = false;
        isCodeRunning = false;
        return;
      }
      alert(errorMsg);
    }).finally(() => {
      isCodeRunning = false;
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
Sk.configure({ output: outputfun, read: builtinRead , __future__: Sk.python3, debugging: false});
(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "editor";

// ----------------------------------------

selectElement.addEventListener('change', function(event) {
  const selectedValue = event.target.value;
  if(selectedValue === 'No-Background') {
    blocklyDiv.style.backgroundImage = 'none';
  }
  else {
    blocklyDiv.style.backgroundImage = `url(${backgroundImageMap[selectedValue]})`;
  }
});

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
  if (isCodeRunning) {
    showNotification("Stop the code execution first");
    return;
  }
  let canvasElements = document.getElementsByTagName("canvas");
  for (let i = 0; i < canvasElements.length; i++) {
    let context = canvasElements[i].getContext("2d");
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvasElements[i].width, canvasElements[i].height);
    context.restore();
  }
  terminal.innerHTML = "Python 3.10 \n>>> ";
  showNotification("Terminal cleared");
});

stopButton.addEventListener("click", () => {
  if (!isCodeRunning) {
    showNotification("No code is running");
    return;
  }
  if (confirm("Do you want to stop the execution?")) {
    stopExecution = true;
    showNotification("Code execution stopped");
  }
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

document.addEventListener("DOMContentLoaded", () => {
  showNotification("Welcome to Python Editor");
  let codesnippet = 
  `import turtle\ncolors = ['red', 'purple', 'blue', 'green', 'orange', 'yellow']\nt = turtle.Turtle()\nfor x in range(360):\n\tt.pencolor(colors[x%6])\n\tt.width(x//100 + 1)\n\tt.forward(x)\n\tt.left(59) 
  `
  
  insertPythonSnippet(codesnippet)
  terminal.innerHTML = "Python 3.10 \n>>> ";
  notification.style.transition = "opacity 0.5s ease-in-out";
});
