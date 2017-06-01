# DP7. User Testing

## Written protocol

### Preparation and setting up
WhatTheShell prototype is both compatible with Windows and macOS, optimized for the newest version of Chrome and the screen larger than 1200*610. Smaller screen sizes are not recommended but acceptable since we support scrolling for overflow. Prepare a screen recording software and a voice recording device, and click http://bit.ly/what-the-shell. You can record the screen with macOS default app, QuickTime Player.
Make sure that the user sees the welcoming message to get a brief introduction on the interface.

### Introduction & Informed consent
WhatTheShell is a tool that helps beginners learn Linux commands. It translates your actions in Finder UI (GUI) to concrete Linux commands, and vice versa. It frees you from explicitly searching for manuals.
On the left is a graphical interface, with a Finder and a sidebar. It works almost same as that of Windows or Mac. Most of familiar actions, such as double click and right click, are supported. Every action on the left is translated in real time to the commands on the right. You can also get detailed descriptions about the output commands.
On the bottom-right is a command line you can type in. Commands you entered are translated to the results on the left. Not all commands are supported.
While you are testing our prototype, we strongly encourage you to speak aloud what you think, like “What is this not working?” and “What is this button for?”. For further analysis, we will record the screen and your voice and also take some pictures of you if you allow us to do so. If you feel uncomfortable with testing, you may quit any time you want. If you get stuck, it is not your fault but our design issue. You are encouraged to explore, and only if you get stuck for a long time, we will give you a clue. Your test results will be summarized and reported to the CS374 instructors, but your names will not be included.

### Tasks & Instruction
Virtual directories and files are created for you. You can check these on the Finder view. You will perform several tasks based on these.

First task is to find commands with particular functionalities. Using our product, get a sequence of commands corresponding to the following actions.

1. Rename directory `rename_me` to `bbb`
2. Move `README.md` to folder `ccc` under `aaa`
3. Delete `README.md` that you moved
4. Go back to the home directory

You successfully performed the first task. Now, you will be asked some questions about Linux commands. You can find the answers using WhatTheShell.

1. What does `-r` do when included in `rm` command?
2. What does `..` mean in commands?
3. What are the two functions of `mv`?

You did a great job. You’ve learned about some Linux commands, so it’s time to try your own commands.

1. Try to move the folder `aaa` to `bbb` by using a Linux command. It is totally fine to try any command, so feel free to explore.
2. Try to delete the folder `bbb` in `~` by using a Linux command. It is totally fine to try any command, so feel free to explore.
3. Enter  `echo "Hello, world" > hello.txt` to figure out its meaning.

### Recording strategy
Facilitator: Jooyoung Lee
Observers: Gunwoo Kim, Suhwan Jee, Youngkyu Hong

We will record the user screen and voice throughout the session. Our product involves a lot of user input, including GUI actions and input commands, so screen recording is far more effective than any other methods for tracking them. Furthermore, in order to keep track of users’ thoughts, we will also record users’ voice. Before each session, the facilitator is responsible for checking whether the screen and voice recording is working well. 
As secondary methods, observers will take some photos of users and take notes about their observations. Notes will be focused on qualitative observations, not just logging user actions.

### Interview questions

- Task 1
  - Did the Finder interface work as you expected?
  - Did the sidebar help you completing the task?
  - Did you notice two types of path forms? (absolute/relative) Was it confusing?
- Task 2
  - Were the descriptions of WhatTheShell more understandable than other sources? (e.g. Google)
  - Was it easy to access the manuals? Can we improve how to access them?
  - Was ‘clear history’ button easy to find?
- Task 3
  - Did you notice the results after you had entered commands? Was it helpful to understand the commands?
  - Did error messages help you find correct commands?
  - Did you notice that you can reuse past commands by up arrow key?
- Overall
  - Did the interface provide the look and feel similar to that of the Finder and Linux shell?
  - Did you notice the role of the arrow button? Was the button helpful?
  - Did you use the breadcrumb? If you did, was it helpful?
  - Is there anything that didn’t work as you expected?

### Debrief prompt
This is the end of our test. Thank you for your participation in our testing. The tasks you have performed were for testing whether users can learn about Linux commands effectively using WhatTheShell. Your feedback will help us to improve our product.

## Session observations

### Participants
We recruited four participants for testing, using various methods including student clubs and online recruiting (Ara).
All of the testers have less than a month of Linux shell experience, so they meet our target population constraint. For diversity, we recruited two male and two female users, and one of them is a graduate student.

| P# | Gender | Age | Job                                      | Linux shell experience |
| -- | ------ | --- | ---------------------------------------- | ---------------------- |
| P1 | Female | 21  | Sophomore in computer science            | A few days             |
| P2 | Male   | 28  | Ph.D. candidate in aerospace engineering | About 1 month          |
| P3 | Male   | 20  | Sophomore in electrical engineering      | 2 weeks                |
| P4 | Female | 19  | Freshman                                 | 1 - 2 weeks            |


### Summary of sessions
P1
![P1 image](p1.jpg)
She was the least experienced user in our tests. She even thought that she must type `$` before the command. We thought our descriptions were easy enough, but we found that they need to be more concrete, since some users might suffer from even filling in the blanks.

P2
![P2 image](p2.jpg)
He was the only graduate student among the testers. He has some experience in Windows command (DOS), so he is familiar to command line interface despite not knowing concrete Linux commands. He was interested in some advanced commands, so we found that beginners’ needs are not restricted to only simple commands we support.

P3
![P3 image](p3.jpg)
He used our interface most actively among participants. He tried many different things while testing, so we could get a lot of insights on safety. Also, he was the one who spoke the most. He told us all the inconveniences he had while testing bluntly, and suggested a lot of strategies for our usability issues.

P4
![P4 image](p4.jpg)
She is a freshman in KAIST, and learned Linux for about weeks in SPARCS, a student developer community. She had her own model about file system. For example, she thought that a directory is a virtual ‘cover’, so when she removes a directory without `-r` flag, its contents will remain. We found that we should enable users with wrong user models to use our interface, or make users learn the right model by our interface.

## Usability lessons

### Efficiency

- Users could not find what they wanted quickly due to bad typography (all / high)
  - Organize descriptions in hierarchy and give weights on important keywords
- Users couldn’t see the manual of commands which are not on the history (P3 / high)
  - Provide `?` button on the error message
  - Provide recommendation for natural language inputs (e.g. recommend `rm` for ‘delete’ or ‘remove’)

### Learnability

- Users expect drag-and-drop but it was not supported (P1, P3 / medium)
  - Provide drag-and-drop for moving files / directories
- Error message should be more detailed and user-friendly (P2 / medium)
  - Instead of providing users with technical error messages like `rm usage: rm [flags] [target folders/files]`, explain why their commands failed
- `?` buttons were totally out of locus of attention (all / high)
  - Highlight `?` button when users hover on each command
  - Provide clickable affordance on each argument of the command for shorter and specific manuals
- Results of commands are only represented in the GUI — not consistent with the shell (P2, P3 / high)
  - Show results of the commands on the history
- Some commands that Linux beginners are likely to struggle with in real-world tasks are not supported (P2 / low)
  - Expand the domain of available commands
- The list of available commands are not shown (P3 / high)
  - Show list of available commands when user clicks empty command input box (autocomplete)
- It is hard to notice the exact results of entered commands since they are displayed in an instant (P3 / medium)
  - Instead of immediate change, provide animation for each step in GUI
- The meaning of `~` is not provided (P1 / medium)
  - Provide information about directory-related terms like `~`,  `.`  and  `..`
- There is no particular button for navigating to previous/parent folder (P1, P3 / medium)
  - Make a button for navigating to previous / parent folder
- Users did not notice how to expand an accordion menu; they clicked on the folder name, instead of the triangle icon next to it (all / high)
  - Expand the menu when user clicks on folder name
- Since there is `$` on the left of each command in history, a user included `$` in her commands (P1 / medium)
  - Add a `>` icon on the left of CUI input

### Safety

- Previous histories and results are gone when the page is refreshed (P2, P3, P4 / high)
  - Implement login to save user’s command histories in the database
- Users were not able to try various actions in identical environment without refreshing the whole window since undo / redo are not supported (P2, P3, P4 / medium)
  - Support undo / redo for user’s actions

### High-level reflections

- Task should cover not only various tasks but also more sound and well-organized scenario
  - Our current tasks are separated into three parts to meet the class requirements, but it is better to integrate them into a single task that covers an end-to-end scenario. Since we split tasks into parts, users perceived them into atomic actions instead of an organized sequence.
- Designers and users are completely different
  - We went through a lot of studio sessions and an in-class heuristic evaluation, and got many different comments from other teams. But some critical issues found in user testing were not even mentioned during previous evaluations. For example, no participants noticed the manual (`?`) button on the first sight, but the problem has never been found before. It shows a huge gap between the views of users and designers. It also shows us why we need both user testing and heuristic evaluation.

## Plan for iteration

Many issues we found can be resolved by minor design fix, so we decided to focus on those. Among the issues found, we will work on the following ones:

- Organize descriptions in hierarchy and give weights on important keywords
- Provide recommendation for natural language inputs (e.g. recommend `rm` for ‘delete’ or ‘remove’)
- Instead of providing users with technical error messages like `rm usage: rm [flags] [target folders/files]`, explain why their commands failed
- Highlight `?` button when users hover on each command
- Show list of available commands when user clicks empty command input box (autocomplete)
- Make a button for navigating to parent folder
- Show the `~` folder(root folder) in sidebar/modal.
- Expand the menu when user clicks on folder name
- Add a `>` icon on the left of CUI input

## Studio reflections

### Suggestions

- I wish you mention for participants to think aloud in instruction
  - Added in the instruction part of the protocol
- What if you give the answers for each task to participants in debrief prompt?
  - Since every user completed all the tasks, we do not need to give them answers.


