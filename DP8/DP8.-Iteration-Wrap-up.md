# DP8. Iteration & Wrap-up

## Video URL

[https://youtu.be/9Yv9NDxr3z8](https://youtu.be/9Yv9NDxr3z8)

## Iteration
We decided to focus on implementation issues in the iteration since we thought a lot of issues that we have found in user testing could be solved by small piece code. In fact, we made dramatic changes in usability with only a few hours of coding (each).  Following are the features that we have implemented/fixed:

- More noticeable `?` button
  - Highlight `?` button when users hover on each command
- More understandable manual
  - Simpler instructions
  - Improved readability  
  - Instructions focused on concrete examples
- Searching function
  - Provided recommendation for natural language inputs (e.g. recommend `rm` for ‘delete’ or ‘remove’)
- User friendly error messages
  - Instead of providing users with technical error messages like `rm usage: rm [flags] [target folders/files]`, explain why their commands failed
- Minor improvement in usability
  - Show list of available commands when user clicks empty command input box (autocomplete)
  - Make a button for navigating to parent folder
  - Show the `~` folder(root folder) in sidebar/modal
  - Support drag-and-drop for moving files/folders
  - Expand the menu when user clicks on folder name in move-to/copy-to popup

Through our iteration, users now can easily find the manual by giving noticeable effect when hovering on command. Our manual became totally more readable, understandable, and example-driven than before. Command input now lets users easily find commands they want, as well as their usages. It also recommends commands for natural language input, such as ‘delete’ and ‘move to’. Refined error messages are much more friendly to users. Most of all, improved consistency between WhatTheShell and the real Finder makes user less frustrated and feel comfortable using our UI.

We learned that knowing what user really wants helps us deciding what to add and fix in our iteration process. This eventually leads our UI into better usability.


## Individual Reflection

### Gunwoo Kim

- What part of the UI implementation did you contribute to?
  - Rendered folder/file hierarchy in the sidebar and the Finder window
  - Implemented breadcrumb
  - Designed and implemented a welcoming modal
  - Designed the readable manuals that provide various examples
  - Designed the error messages (both their contents and how to show them)
  - Added a ‘clear history’ button
  - Handled `cd` and `rm` commands
  - Refactored a large portion of codes (including other team members’ codes) for better readability and consistency
- What worked well and not in your team? How did you overcome any hurdle in teamwork? What lesson about teamwork did you learn that you might apply to your next team project?
  - Individual performance was the main key for successful teamwork. Each of us has strength in at least one part, like creativity, aesthetic sense, and programming. Everyone was highly motivated and loved our product. I am totally satisfied with my team (this is one of the best teammates I have ever met), and each of us made a considerable contribution.
  - As Professor Kim showed in ‘A Guide for successful teamwork’, we found that physically working together improved our performance. When working together, we shared everything, from the high-level ideas to a single pixel of design. We always shared a big picture of our product. It also helpful for our friendship.
  - The biggest hurdle for us was ‘programming’ together. We have a lot of features to implement, and we did not have enough time to design our code structure in a top-down manner. Also, our prototype changed a lot in a short period. It made our code less modularized and led to bad efficiency. Now, we have some duplicate functions defined by different members, thousands of lines of code in a single file. It may be okay for a prototype, but never for a real product. Next time we work on a project like this, we will start with the code structure design.
  - I found one of my demerits. When I give feedback on others’ work, sometimes I get too critical. My teammates were all generous and open enough to catch what I really meant, but it might feel hurt. I noticed it, and after then I tried to deliver my message in a more gentle way.
- Throughout the team-based design project experience, what did you learn about the user-centered design process and web-based GUI implementation?
  - Designers are never like users. Throughout many user tests, we found that users sometimes act in a totally different way than we expected. Also, some critical issues that every user faced in user tests, like ‘unnoticeable buttons’ were never mentioned during studios and in-class heuristic evaluation. Heuristic evaluation gave us great insights, but there are problems that only the people in target population can find. That is why we both need various evaluation methods.
  - An iterative design process was powerful and effective. On the way from the paper prototype to now, our goal has been constant but the details are totally changed. If we implemented the very first version, we should have written several times of codes. The biggest changes were made during the paper prototyping process, which was the easiest to modify.
  - Designing responsive UI was hard. Our product was only for desktop environments, but the output was not consistent even among PCs. A slight difference in screen sizes and web browsers disrupted some part of our prototype.
  - Recruiting people is important, and harder than we usually expect. In our case, finding Linux ‘beginners’ was not that easy, because people are getting used to Linux shell, so they are not beginners anymore. Diversity is another factor to consider. It was hard to find people who is in our target population but not undergraduate students. Planning a recruiting method is as important as designing a test.

### Jooyoung Lee

- What part of the UI implementation did you contribute to?
  - Implemented selection menu on right-click on the GUI window
  - Gave Highlighting effects to increase the affordance of `?` button
  - Enabled expanding hierarchy menu elements even when clicked on the title(not only arrow icon)
  - Made popup menu for choosing folder when moving/copying in GUI window
  - Implemented highlighting on icons when clicked
  - Implemented make directory on both GUI and CUI
  - Implemented mv in GUI and some part of CUI with Suhwan Jee
  - Implemented overall layout
  - Designed and Implemented how to focus current window (By giving deep shadow inside the window)
- What worked well and not in your team? How did you overcome any hurdle in teamwork? What lesson about teamwork did you learn that you might apply to your next team project?
  - Since all of our team members are in SPARCS (student’s organization for developing web services), we could naturally talk a lot about our project, and spend many hours together. It was very good that it was really easy to gather around and work together.
  - Also, since we are close to each other, working on a project was really fun.
  - Our team’s development speed was very fast, so we could try as many as design improvements even during the last iteration.
  - Besides our development skill, I think we made a really nice teamwork. We always tried to distribute the work equally, and even tried to take each other’s part in some cases. Since all of us tried hard, we made a good improvement in our UI.
  - It was really great that every team member loved what he was designing. We all wanted to make the best interface and spent a lot of time generating clever ideas.
  - I liked the way we discussed our project. Everyone gave their ideas actively with enough reasons and when making a decision among many ideas, we convinced other people without hurting their minds. We tried our best to objectively judge our ideas and make the best choice.
  - I think the most challenging part was cooperation in implementation. At first, we developed each part separately without making a lot of documentation. It was a total chaos where teammates didn’t understand each other’s code which resulted in a lot of code redundancy and errors. Therefore we spent many hours on reorganizing and modularizing our code. I have learned that speed of development is not all. If we work on next team project, I think we should spend a lot of time structuring the code that we are going to build, and writing documentation clearly so that other members fully exploit what I’ve made.
  - Our team was weak at a presentation at first. Since we didn’t prepare much for presentation in studio sessions, we sometimes used more time than we had or stammered a bit. We realized our problem and spent time in preparing and practicing presentation afterward, and did well enough. I realized that a nice presentation can make people comment and ask more questions that are helpful for us. I think we should focus not only on building our prototype, but also sharing what we’ve done with other people.
- Throughout the team-based design project experience, what did you learn about the user-centered design process and web-based GUI implementation?
  - I have learned that even if we make a lot of fascinating cool features in our interface users wouldn’t notice/use that feature if usability is low. We made several feature/functionalities for users comfort. For example, we added mode changing button, `?` button for instructions, command recovery function with up-arrow key and breadcrumbs for easier navigation. However, users didn’t use or couldn’t use (because they didn’t notice) many of them. Therefore we tried a lot and went through several iterations in order to make users comfortable using these features. This also made me remind of the important of user testing.
  - I didn’t quite believe the strength of user-centered design process based on iteration with several steps. For example, I thought to make paper prototype was just a perfunctory thing. However, paper prototyping allowed us to change and decide our main layout and it was one of the most important steps that we have gone through because a lot of design fixes were made here. After many iterations, we found out that our prototype was totally different and improved from the original one.

### Suhwan Jee

- What part of the UI implementation did you contribute to?
  - made arrow button in the center of the screen to change mode
  - implemented mode change by clicking either the arrow button or the GUI window/command line
  - implemented click event of the sidebar items(access directory)
  - implemented delete handler
  - implemented copy, move, delete, rename of the items in the sidebar
  - implemented `mv` command parser with Jooyoung Lee
  - implemented file opening by double click
  - implemented `go to the parent` button
  - implemented drag-and-drop action
- What worked well and not in your team? How did you overcome any hurdle in teamwork? What lesson about teamwork did you learn that you might apply to your next team project?
  - The biggest strength of our team was members themselves. We, including me, are all well-informed about Web developing, highly motivated, and outstanding in all different fields, so we have worked in perfect harmony. Thanks to my fantastic friends, there were not many hurdles in the design process, and we could cleverly overcome some little hurdles.
  - The hardest part of the design process was ideation process. Since we are all good at improving but not at being creative, it took long for us to find users’ needs in ideation step. Although it made us be exhausted, we kept to encourage ourselves and good atmosphere, and we finally came up with a great idea with everyone agrees. This effort, to be nice, gentle and humorous to each other, was the key for us to get through the difficulty.
  - The next thing being troublesome was how to translate between GUI actions and command line inputs and show the translation process clearly. Deciding how to translate any single command had a lot of design issues because 1. typing in a command was static, but the resulted changes should be dynamic, 2. some commands are represented by a sequence of actions in GUI. So deciding the way of translating each command make us debate for tons of time.
  - Finding diverse users for testing was the hardest thing we faced. We eventually cannot solve this problem, but we did some level of effort. There were only undergraduate students in the first, second user testing, but we invited one graduate student in the last user testing.
  - We did not have any problem in implementation since all of us are familiar with Web development, as mentioned above.
  - What I learned from this project about teamwork, is that how much each member is motivated is really important in teamwork. When team members are highly motivated and motivated at the similar level, the performance of the team would be the best. Also, the atmosphere during meeting affects a lot for individual’s creativity. Since we are all friends and know each other, we can argue our claims strongly to each other and give every small feedback without fear.
- Throughout the team-based design project experience, what did you learn about the user-centered design process and web-based GUI implementation?
  - It was an awesome, and totally new experience in my life. I learned a lot and got a lot of insights.
  - Designers are not users — those two groups think and act in a totally different way. Feedbacks from many studio sessions and in-class heuristic evaluations did not cover what users really considered as a problem in user testing. Scenarios designers expect, ‘this might work well because of this!’, does not fit well with scenarios of how users actually use their UI.
  - The power of paper prototyping — very simple, very fast, and very efficient. JavaScript source code of our prototype is over 2000 lines, and we implemented this for over 3 weeks. But, we made our first paper prototype by only 1 hour, and we found many critical usability issues of the first prototype very easily. The Web is elaborate but slow. Paper is rough but fast.
  - UI always changes — When we implemented the final UI, it was totally different from what we imagined in the ideation stage. So, it is important for us to accept changes easily, not to keep to the previous UI.

### Youngkyu Hong

- What part of the UI implementation did you contribute to?
  - Implemented command input and its functionality. (Auto fill-in history using up-arrow key input) (addCommand())
  - Designed history window using grid design
  - Designed manual pop-up for each command (popup after pressing ‘?’ button)
  - Resolved path of all kinds (absolute and relative)
  - Implemented copy, rename in GUI
  - Handled ‘cp’ command input in CUI
  - Handled all kinds of keyboard inputs such as closing all popup using ‘esc’ or adding command using ‘enter’
  - Implemented autocomplete on command input box
  - Implemented searching for corresponding command using natural language (ex. 'delete' -> rm)
- What worked well and not in your team? How did you overcome any hurdle in teamwork? What lesson about teamwork did you learn that you might apply to your next team project?
  - Our team showed great teamwork and performance during whole process. The best part of our team was that we all had great passion about our project. This made us have no difficulties on getting creative ideas and implementing selected tasks.
  - The main difficulty we’ve met was different coding styles between each other. We didn’t have any chance to code in a team and we didn’t have enough experience of coding, so we all had different coding styles. This made us difficult to understand each other’s code and resulted in redundant codes.
  - Enough discussion and effort to match our coding styles helped us overcome this problem. We had chance to code in the same place for quiet long time, and we decided to plan in details about each other’s implementation. While doing this, we had discussed about some general functions that can be used in other parts. This helped reducing redundant codes and implement more efficiently.
  - Another difficult part in our team was gathering insights we’ve got. We all had great ideas that can be possibly applied in our product, however they were somewhat too diverse so that it became difficult to select among them. To be specific, in our early stage of design process such as giving HMW questions, we have thought so many possible solutions of our POV. We all had different thought about implementing solutions and it was difficult to gather our ideas.
  - We used voting about each ideas and had deep discussion about each other’s opinion. This was great chance to think our product deeply and understand each other’s thought.
  - Enough conversation and discussion is the most important part of the teamwork is what I’ve learned. Anyone can have different ideas about same problem. I learned that throughout enough discussion, we can think about problem more in depth. This also can lead to better performance on whole progress. We can have better plan about implementation and therefore efficiently share each other’s contribution.
- Throughout the team-based design project experience, what did you learn about the user-centered design process and web-based GUI implementation?
  - Importance of paper prototyping is the best thing I’ve learned. Before our paper prototyping test, I didn’t expect that we could find such great insights through it. We could decide how to design our command history window and how to change between two modes. It might be  really difficult to implement this if we used web-based prototype. The easiest and cheapest way to test what we’ve thinking is using paper prototype.
  - In web based GUI, giving enough affordance and feedback is critical questions to think about. In our original UI, we put ‘?’ for each end of commands and in our user testing, all of participants didn’t realize ‘?’ mark in first sight. This was troublesome to do our second task. We didn’t give enough feedback on hovering command and affordance to click on the ‘?’ mark. Since web-based GUI is restricted in the flat screen, we should provide noticeable effect to give extra affordance to it. 
  - This was also a great experience to learn the importance of user testing in design process. User testing gives a totally different insights about UI that designer can’t find. In addition, in the philosophy that ‘Users always right’, we could find the right way to process our design choice. Since we did this in a team, we could get much more insights that one couldn’t catch. As a team, we could take different part in the user testing, which made us focus on each role. This gave me think the importance of team based user testing.
