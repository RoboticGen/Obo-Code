# **Software Requirement Specification**

## Version History

| Version | Date | Status |
| ---| ---| --- |

| 1.0 | 30/05/2024 | Pending Approval |

## Introduction

The purpose of this document is to outline the requirements for the development of Obo Code, which is a extension for [Obo Blocks](https://oboblocks.roboticgenacademy.com/) to support intrtpreting python turtle library with graphics. Obo Code aims to simplify the process of running Python code with graphical output using the turtle library within the browser environment.

## Scope

Obo Code will provide a platform for users to write and execute Python code with graphical output using the turtle library. The platform will include a code editor, a turtle workspace, and an output console for displaying execution results. Obo Code will utilize Skulpt, a client-side Python interpreter, to run Python code within the browser environment.

## Features

1. **Client-side Python Interpreter** : Obo Code uses Skulpt to interpret Python code within the browser environment.
2. **Support for Python Turtle Library** : Obo Code supports Python Turtle Library for graphical drawings.
3. **Real-time Code Execution** : Users can run Python code and see the output in real-time.
4. **Code Editor** : Users can write Python code using a code editor with syntax highlighting.


## Functional Requirements

#### Code Editor

1. **Syntax Highlighting** : Highlighting python syntax while users modifying python code snippets
2. **Autocompletion and Code Suggestion** : Autocompleting and code suggesting when users modifying code snippets

#### Support for Python Turtle Library

1. **Turtle Workspace** : Interface for graphical drawings using Python Turtle Library.
2. **In-built Turtle Commands** : Support for common turtle commands (forward, backward, left, right, etc.)
3. **Real-time Drawing** : Users can see the graphical output in real-time as they run the code.

#### Python Code Interpretation

1. **Python Interpreter** : Run(evaluate/execute) python code snippets
2. **Error Handling** : Display errors when there are syntax or runtime errors in the code.

## User Interfaces

Obo code will extend the user interfaces of Obo Blocks with additional components for turtle graphics.

#### Additional Components

- **Turtle Workspace** : Interface for graphical drawings using Python Turtle Library.

### Hardware Interfaces

Obo Code will not have any hardware interfaces as it is a client-side application.

## Non - Functional Requirements

#### Performance

1. **Responsiveness -** Ensure the platform responds quickly to user interactions.

### Security

1. **Code Sandbox Security -** Ensure code execution within the platform is sandboxed to prevent malicious activities.

#### Usability

1. **Intuitive Interface -** Design user interfaces to be intuitive and easy to use for both students and teachers.

## **Preliminary Schedule**

### Development Phases

Here is breakdown of development phase with durations

- Requirements Gathering,Analysis and Design - **1 week**
- Full Stack Development and Prototype - **1 weeks**
- Integration and Testing - **6 weeks**
- Deployment - **2 weeks**

### Milestones

- [x] Completion of Requirements Gathering,Analysis and Design
- [x] Completion of Full Stack Development and Prototype
    - [x] Release 1.0
- [ ] Integration and Testing
    - [ ] Release 2.0
- [ ]     Final Deployment
    - [ ] Release 3.0


## Appendix

### Release 1.0

This release only include the support for Python Turtle Library with graphical output

### Release 2.0

This release will update for the Release 1.0 with fixed bugs and optimized performance

### Release 3.0

This release will update for the Release 2.0 with Final Deployment

## **Glossary**

*   **Obo Code**: An extension for Obo Blocks to support interpreting python turtle library with graphics.
*   **Obo Blocks**: A visual programming language developed by RoboticGen Academy.
*   **Python Turtle Library**: A library in Python for creating graphics and drawings.
*   **Skulpt**: A client-side Python interpreter that runs Python code within the browser environment.
*   **CodeMirror**: A versatile text editor implemented in JavaScript for the browser.
*   **Code Editor**: An interface for writing and editing Python code.
*   **Turtle Workspace**: An interface for graphical drawings using Python Turtle Library.
*   **Output Console**: Display execution output and errors when evaluating Python code.


## References

*   [Python](https://www.python.org/)
*   [Skulpt](https://skulpt.org/)
*   [Codemirror](https://codemirror.net/)