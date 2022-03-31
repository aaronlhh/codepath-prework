# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Honghao Lin**

Time spent: **12** hours spent in total

Link to project: (https://glitch.com/edit/#!/zesty-mighty-resonance)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] List anything else that you can get done to improve the app!
- Adding a replay button, when player forgets the sequence, he could spend a mistake time to hear again

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](https://i.imgur.com/xUNh7sM.gif)
![](https://i.imgur.com/0OC0Apf.gif)
![](https://i.imgur.com/xt7UVXg.gif)
![](https://i.imgur.com/vzVk5Mw.gif)
![](https://i.imgur.com/ORe9n4V.gif)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- https://www.delftstack.com/howto/html/html-button-with-image/ (reference for how to put image in a button)
- https://www.youtube.com/watch?v=vjco5yKZpU8 (reference for how to use audio with his piano sound file)

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
There is a challenge during the coding project, it is about creating a replay button. Different from the additional requirements of the game, I come up with this idea by my own and I need to start scratching from blank in order to create this feature. At first, when I decide doing a replay button, I have no idea how to startup and what to begin with. But thanks to the procedures of task one, it teaches me how to create a button that can calls a function in javascript when it's onclicked. So I design a funtion in the javascript called replay() and interact with the rest of the code in order to make the replay completely fits into the game. During the process, I spent a lot of time going through previous codes, adding comments to understand them, so that I could avoid any buggy situations in the game. And finally, I could proudly showcase my project with the display button shown in the project.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
During the task, I want to make each button align with each other with no gaps. But by bootstrap document, the group of buttons have gaps between each other by default. Since I am new to the HTML structure so it is really hard to me to come up a solution by my own. To solve this, I searched out many solutions on the internet including Microsoft HTML documentation, and find that the simplest way of solving this problem is to set the margin as negative to adjust the gaps between buttons. But I am still having questions about if there are certain ways to solve this situation, the situations in the internet doesn't work for my code. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
First, I want to add some interactivity to my replay button, I want my replay button to be acting the same with start and stop buttons. If user clicks starts, start button will change to stop, and replay button will appear. Otherwise replay button will not appear. I tried to solve it by adding id of hidden but didn't work, so I would want to debug and solve this if I have a few more hours. 
Second, I want to make my keys more vivid. I am using piano pitch as my keys, that's why I have 7 keys in my game. But the picture is not corresponding to the keys and I will arrange the keys and change the image so that the game will become "piano-note memory game"!



## Interview Recording URL Link

[My 5-minute Interview Recording](https://ucsd.zoom.us/rec/share/lDKdVWY1sqZT0K1vjznvx48Y4sMR_xMRRT8xibabkHftl5yiXw6jYoPYCQmShGjo.NM8ifHnwFcDqAQ-A)


## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.