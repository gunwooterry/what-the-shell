# WhatTheShell


- wtshell.html:
  - Basic layout and popups are defined
- main.css:
  - CSS stylesheet for the entire project
- description.js:
  - Includes template strings that contains descriptions for each command. 
- server.js:
  - Javascript file just for deployment. No backend logic used. Used node.js, Express.
- main.js:
  - Javascript file containing all the logic and dynamic features of the interface
    - Contains the basic hierachy of folder and files in JSON
    - Contains function for rendering the directory hierarchy
    - Handles hovering, clicking, right-clicking and double-clicking or keyboard input events
    - Parses user commands in CUI input and reflect the change in GUI and history
    - Handles GUI action and reflect the change in GUI and history
    - Codes for inserting history
    - Codes for warning messages
    
