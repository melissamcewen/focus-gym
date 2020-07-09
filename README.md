# Focus Gym

## Narrative Spec
Focus Gym is a timer inspired by the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). I first discovered this technique in college and it helped me succeed despite untreated ADHD. The technique at its most basic is to set a timer for around 20 minutes and commit to working on something during that time. After the timer is up you can continue or take a timed break. Over almost a decade of using this technique, I've found that I often tweak the timers because sometimes 20 minutes is too long and sometimes it's too short. My typical workflow is to set a goal for the day of focus sessions, and then adjust the time as I work. After my favorite software for this (Ugo Landini's Pomodoro app) stopped working, I decided to make my own. 

## Focus Gym Basics
Focus Gym has two timing modes: training and break. The initial timing for training is 20 minutes and for break it's 7 minutes. At the beginning of the day you set a Session Goal which is the number of training sessions you hope to complete. In addition you can receive points for focusing on your goals.

## Focus Gym vs. Pomodoro
Focus Gym is based on quizzes that ask the user how they are. Then Focus Gym uses it to customize the timing intervals. The main quizzes are:
### Goal Quiz
In the beginning of your training you tell Focus Gym what you want to focus on. At the end it asks if you focused on that. For example if you said you wanted to "do expense reports" Focus Gym will ask if you focused on them during your training. If you did, you get a point.  
### Time Quiz
The time quiz asks how you felt about the break or training you just did. If it was too long or too short, Focus Gym will adjust the next session based on your feedback. 
### Interruption Quizs
If Focus Gym detects that a training was ended before the timer was up, it asks if you were interrupted or not.

## How it Works
For training you tell Focus Gym what you plan on focusing on. Like "Expense reports." Then you click "Train." A clock appears with a countdown. Once the session is over, gives you the Goal Quiz. Then the Time Quiz. Based on your answers it adjusts the timing accordingly.

For breaks you just press "break" and a clock appears with a countdown. At the end you get the Time Quiz. 

If you end the training before it is completed, Focus Gym asks if you were interrupted or not. If you weren't it goes to the usual quiz. But if you were interrupted, it doesn't. This is because you don't want to adjust based on that training since it wasn't really completed. But you do if you were just unable to focus for that long. 


## Time Adjustments
### Time Quiz
The default adjustment focus gym makes is 30 seconds. So if you say a trainings session is too long in the Goal Quiz, Focus Gym will subtract 30 seconds from the training time for your next interval. If too short, Focus Gym will add 30 seconds.
### Consecutive Breaks
If you take breaks in a row, Focus Gym will decrease the break time. So for example if your first break is 10 minutes, if you try to take another, it will be 7 minutes. 

## Special Modes
### Hyperfocus
If you do more than 4 training sessions in a row without a break, Focus Gym encourages you to take a break. 
### Slack
If you have more than 4 breaks in a row, Focus Gym encourages you to try a training, even just a short one. 
### Level Up
If you reach a certain number of points from your Goal Quiz + Training Sessions or from reaching your Session Goal, something special will appear!


## Vars
- Training time: amount of seconds a training session lasts
- Break time: amount of seconds a break lasts
- Trainings consecutive: trainings in a row
- Breaks consecutive: breaks in a row
- Total trainings: total trainings completed in a day
- Total breaks: total breaks completed in a day
- Just right intervals: intervals where user has confirmed the timing is perfect in a row
- Goals: training sessions where the user has confirmed they focused on their goal
- Hyperfocus: boolean that's 1 if a user takes 4 or more training sessions in a row without breaks
- Slack: boolean that's 1 if a user takes 4 or more breaks in a row without training
- Previous state: 0 is none, 1 is training, 2 is break
- Interval time: seconds that time is altered in response to the Time Quiz
- Last session time: time of the last session triggered 
- Daily goal: the number of sessions the user aims for daily


## Tests
### No state
- To introduce new users to focus training, when opened up for the first time, the instructions should show and no alerts should be present
- To track daily goals when opened during a new day, the daily progress on the daily goal should reset (or there should be a button to do that) and the alerts (slack/hyperfocus) should be reset
- To allow me to train or break, the toggle switch should allow toggling between train or break
- To allow me to set a goal, the goal form should show when the timer is toggled to train
- To allow me to track what work I've done, I should be able to see a number and list of goals I've worked on today
- To allow me to customize my goals, I should be able to edit the number of goals I aim for daily

### Start Training
- To train my focus if I click train the timer should count down from the training time
- To remind me to focus on my goal if I input a goal and click train the goal should be displayed above the timer
- To help with time management, during a training session, the time when the session ends should display
- To end training when interrupted or unable to focus, during a training session, an "end" buttons should display
- To help me track my training, when a training session starts, the last session time should be set to the current training time
- To help detect hyperfocus or slack, when I start a training session, the number of breaks in a row should be set to zero and the number of trainings in a row should increase by one


### End Training
- To notify me the training is over, a notification should display
- To track my process as a user if the training countdown ends the "total trainings" should increase by one and that should show in the UI
- To track focus on goals as a user when a training session ends, the goal quiz should display and ask whether I focused on my goal
- To make it clear the training is now over, when the training session ends, the "end" button should no longer display
- If a training session is aborted the last session time should equal the amount of time trained before completion

### Training Quizzes
- If the last session time after an aborted session is greater than five minutes, the goal quiz should be based on that time, otherwise it should be based on 5 minutes
- To track focus on goals, when the goal quiz asks me if I focused on my goal and I click yes, the number of "goals" should increase
- To calibrate training time, when a training session ends and the goal quiz has been completed, the timing quiz should display and ask how the time worked for me 
- To adjust training time based on focus level, the time quiz should be based on the total completed time before end UNLESS that is less than 5 minutes. If it is less than 5 minutes it should be based on 5 minutes
- To help adjust my training time, if I click that the time for the training session was "too long" in the timing quiz, the interval time should be subtracted from the training time
- To help adjust my training time, if I click that the time for the training session was "too short" in the timing quiz, the interval time should be added to the training time
- To help adjust my training time, if I click that the time for the training session was "just right" in the timing quiz, the training time should increase by half the interval 
- To help train my focus to increase, if the number of just right intervals is greater than 4, the training time should be increased by the interval time
- To help reward focus training progress, after a set amount of goals, the level should increase and show a cool new animal on the timer

### After Training Quizzes
- To help me decide what to do next, when a training session ends and both quizes have been completed, the status should show that I just completed a training session
- To adjust training based on ending a session early, when I click end, the last session time should be set to the time completed in the training before it was ended
- To allow me to do a new session, when a training ends and all quizzes have been completed, the buttons to start a new session should display
- To allow me to change my goals for training, when a training ends and all quizzes have been completed, the goal input form should reset
- To help prevent hyperfocus, if I've just done 4 training sessions in a row, the hyperfocus alert should display and recommend I take a break
- To encourage healthy breaks between work sessions, after a training session, the toggle for the timer should switch to "break"
- To track the current training time, the new training time should display in the UI




### Start Break
- To let me take a break if I click break the timer should count down from the break time unless the last session was a break
- To help discourage overly long breaks, if I click break and the last session was also a break, the break time should count down by the break time - sessions in a row * multiplier but this should not be set as the last session time. Instead the break time should be increased by the interval.
- To help with time management, during a break session, the time when the session ends should display
- To end break when interrupted or I need to work, during a break session, an "end" buttons should display
- To help me track my breaks, when a break session starts, the last session time should be set to the current break time
- To help detect hyperfocus or slack, when I start a break session, the number of trainings in a row should be set to zero and the number of breaks in a row should increase by one


### End Break
- To notify me the break is over, a notification should display
- To track my process as a user if the break countdown ends the "total breaks" should increase by one and that should show in the UI
- To make it clear the break is now over, when the break session ends, the "end" button should no longer display
- To help calibrate my timing, the timing quiz should show
- In order to prevent adjusting the break time incorrectly, if the break was interrupted or a consecutive break, no quiz should show

### Break Timing Quiz
- To keep breaks from going below 5 minutes, the time quiz should be based on the total completed time before end UNLESS that is less than 5 minutes. If it is less than 5 minutes it should be based on 5 minutes
- To help adjust my break time, if I click that the time for the break session was "too long" in the timing quiz, the interval time should be subtracted from the break time
- To help adjust my break time, if I click that the time for the break session was "too short" in the timing quiz, the interval time should be added to the training time
- To help adjust my break time, if I click that the time for the training session was "just right" in the timing quiz, nothing should happen
- To help train my focus to increase, if the number of just right intervals is greater than 4, the training time should be increased by the interval time


### After Break Quizzes
- To help me decide what to do next, when a break session ends the status should show that I just completed a break session
- To allow me to do a new session, when a break ends and all quizzes have been completed, the buttons to start a new session should display
- To help prevent slack, if I've just done 4 break sessions in a row, the slack alert should display and recommend I do a training
- To encourage focus, after a break session, the toggle for the timer should switch to "train"
