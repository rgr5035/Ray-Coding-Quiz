# Ray-Coding-Quiz

Assignment Overview

    For this assignment, we had to create a quiz from scratch using vanilla JavaScript techniques,  along with our own HTML file and styled ourselves with CSS. The quiz is to begin with a start button, and, once pressed, a timer will begin to decrement throughout.

When the Game Starts...

    After the 'start' button is pressed, the game begins, and the timer begins to decrement from 120 seconds. The 'start' button will also generate randomized questions from the array created in the JS file. If a question is answered correctly, the color will change on all answers, showing which was correct and which were incorrect (this will also happen if an incorrect answer is chosen, to inform the user of whatever choice was made). Additionally, if the answer was incorrect, the timer will decrement by 5 additional seconds. Once an answer is chosen, the 'next' button will reappear, allowing the user to move on to the next randomized question, until either the timer reaches 0, or the array of questions is exhausted.

When the Game Ends...

    Once either the timer reaches 0 or the array of questions is exhausted, the game will end, and text will appear to inform the user. Once this happens, a form to input the user's initials will appear, allowing the user to score his/her score. Once the initials are entered correctly (if nothing is entered, the user will receive a message to enter correct values), a 'high scores' section will appear at the bottom of the page, depicting the local storage of high scores for the game. This will show the intiials and score (notated as seconds remaining) in an unordered list.

    Once the game ends, the 'start' button's text will change to 'restart,' allowing the user to refresh the game to the beginning. Once the page is refreshed, the user's scores are stored locally and will notate in the unordered list found within the 'high scores' container.

Added Score Counter (not required)

    I added a score counter to the game, to notate how many correct answers the user achieved throughout. This is not the overall score that is pulled from local storage, as the assignment's requirments are to notate the total time remaining as the overall score for the user to keep track of. Once the game is refreshed, the timer will begin back at 0.

Screenshot

![image](https://user-images.githubusercontent.com/70773240/96403340-62c7e980-1195-11eb-84c6-d317242ee1eb.png)

Links to Github and Live Site

Github: https://github.com/rgr5035/Ray-Coding-Quiz
Live site: https://rgr5035.github.io/Ray-Coding-Quiz/
