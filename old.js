
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const clock = document.getElementById('clock');

//debug
const fakeButton = document.getElementById('fake');
const resetButton = document.getElementById('reset');

//basic buttons
const trainingButtons = document.getElementById('training');
const sessionButtons = document.getElementById('sessions');
const trainButton = document.getElementById('train');
const breakButton = document.getElementById('break');
const abortButton = document.getElementById('abort');

// feelings quiz
const feelingsQuiz = document.getElementById('feelings');
const muchButton = document.getElementById('much');
const okButton = document.getElementById('ok');
const notButton = document.getElementById('not');

//how much to increase and decrease when training
const timeIncrease = 60;
const timeDecrease= 60;

// reminders
const water = document.getElementById('water');
const hyperfocus = document.getElementById('hyperfocus');
const levelup = document.getElementById('levelup');

// how many intervals where the time feels right should we go before we try increasing?
const trainingIntervals = 5;

// hide our feelings quiz for now
feelingsQuiz.style.visibility = 'hidden';
// hide the abort button for now
trainingButtons.style.visibility = 'hidden';
// hide the reminders
hyperfocus.style.visibility = 'hidden';
levelup.style.visibility = 'hidden';

// ok let's train!

trainButton.addEventListener('click', function(event) {
  console.log('start training');
  // hide quiz

  //first we'll reset the number of breaks in a row to 0 since we'll be training
  console.log('breaks before ' + localStorage.getItem('breaks'));

  localStorage.setItem('breaks', 0);
  console.log('breaks after should be zero ' + localStorage.getItem('breaks'));

  // we'll increase the number of trainings in a row
  console.log('trainings before ' + localStorage.getItem('trainings'));

  let trainings = parseInt(localStorage.getItem('trainings'));
  localStorage.setItem('trainings', trainings + 1);
  console.log('trainings after ' + localStorage.getItem('trainings'));

  // if trainings in a row is more than 3 let's have a hyperfocus alert!
  if (trainings >= 3) {
    hyperfocus.style.visibility = 'visible';
  }
  //and total trainings
  console.log('totalTrainings before ' + localStorage.getItem('totalTrainings'));

  let totalTrainings = parseInt(localStorage.getItem('totalTrainings'));
  localStorage.setItem('totalTrainings', totalTrainings + 1);
  console.log('totalTrainings after ' + localStorage.getItem('totalTrainings'));

  //show abort buttons
  trainingButtons.style.visibility = 'visible';
  // hide train/break buttons
  sessionButtons.style.visibility = 'hidden';

  // ok time to train!
  let time = parseInt(localStorage.getItem('train'));
  timer(time);
});

// let's take a break!

breakButton.addEventListener('click', function(event) {
  // hide quz
  feelingsQuiz.style.visibility = 'hidden';

  console.log('start break');
  //first we'll reset the number of trainings in a row to 0 since we'll be breaking
  console.log('trainings before ' + localStorage.getItem('trainings'));

  localStorage.setItem('trainings', '0');
  console.log('trainings before ' + localStorage.getItem('trainings'));

  // we'll increase the number of breaks in a row
  console.log('increase number of breaks in a row');
  console.log('breaks before ' + localStorage.getItem('breaks'));

  let breaks = parseInt(localStorage.getItem('breaks'));
  localStorage.setItem('breaks', breaks + 1);
  console.log('breaks after ' + localStorage.getItem('breaks'));

  //and total breaks
  console.log('total breaks before ' + localStorage.getItem('totalBreaks'));

  let totalBreaks = parseInt(localStorage.getItem('totalBreaks'));
  localStorage.setItem('totalBreaks', totalBreaks + 1);
  console.log('total breaks after ' + localStorage.getItem('totalBreaks'));

  //show abort buttons
  trainingButtons.style.visibility = 'visible';
  // hide train/break buttons
  sessionButtons.style.visibility = 'hidden';

  const time = parseInt(localStorage.getItem('break'));
  timer(time);
});

// abort button! (for aborting a focus session
abortButton.addEventListener('click', function(event) {
  // yikes something happened
  // clear interval
  clearInterval(countdown);
  // show train/break buttons
  sessionButtons.style.visibility = 'visible';
  //so first let's figure out if we just had a break or not
  let breaks = parseInt(localStorage.getItem('breaks'));
  console.log('breaks before ' + breaks);
  let trainings = parseInt(localStorage.getItem('trainings'));
  console.log('trainings before ' + trainings);

  // if there are no trainings, we're on a break that was interrupted
  if (trainings == 0) {
    console.log('we were on a break, setting breaks to 0');
    console.log('breaks before ' + localStorage.getItem('breaks'));

    localStorage.setItem('breaks', 0);
    console.log('breaks after ' + localStorage.getItem('breaks'));
  } else {
    // otherwise it was a training and the training was interrupted so let's reset
    console.log('we were on a training, setting trainings to 0');
    console.log('trainings before ' + localStorage.getItem('trainings'));

    localStorage.setItem('trainings', 0);
    console.log('trainings after ' + localStorage.getItem('trainings'));

    console.log('we were on a training and we need to decrease training time');
    console.log('training time before ' + localStorage.getItem('train'));
    let trainingTime = parseInt(localStorage.getItem('train'));
    console.log('training time before ' + trainingTime);

    localStorage.setItem('train', trainingTime - decrease);
    console.log('training time after ' + localStorage.getItem('train'));

    // oh and this resets the # of intervals that's been the right time
    localStorage.setItem('okIntervals', 0);
    console.log('level of okIntervals should be zero' + localStorage.getItem('okIntervals'));
  }
});

// quiz time!
muchButton.addEventListener('click', function(event) {
  // ah so the last interval was too long!
  //so first let's figure out if we just had a break or not
  let breaks = parseInt(localStorage.getItem('breaks'));
  let trainings = parseInt(localStorage.getItem('trainings'));
  // if there are no trainings, we're on a break and the break was too long :( let's decrease it
  if (trainings === 0) {
    console.log('we were on a break and we need to decrease break time');
    console.log('break time before ' + localStorage.getItem('break'));
    let breakTime = parseInt(localStorage.getItem('break'));
    localStorage.setItem('break', breakTime - decrease);
    console.log('break time after ' + localStorage.getItem('break'));
  } else {
    // otherwise it was a training and the training was too long :( let's decrease it
    console.log('we were on a training and we need to decrease training time');
    console.log('training time before ' + localStorage.getItem('training'));
    let trainingTime = parseInt(localStorage.getItem('training'));
    localStorage.setItem('training', trainingTime - decrease);
    console.log('training time after ' + localStorage.getItem('training'));
  }
  feelingsQuiz.style.visibility = 'hidden';
});

okButton.addEventListener('click', function(event) {
  //yay! but let's try increasing time sometimes to see if we can get some improvements in focus
  // so let's see, how many intervals have you had where things have been OK?
  let okIntervals = parseInt(localStorage.getItem('okIntervals'));
  console.log("we've had " + okIntervals + 'ok intervals so far');
  if (okIntervals >= intervalIncrease) {
    console.log('OK interversals are over 5');
    // let's get the current training time and increase it
    let trainingTime = parseInt(localStorage.getItem('training'));
    console.log('Current training time is ' + trainingTime + ' lets increase it');
    localStorage.setItem('training', trainingTime + increase);
    console.log('training time after ' + localStorage.getItem('training'));

    // oh and this resets the # of intervals that's been the right time
    localStorage.setItem('okIntervals', 0);
    // let them know they've leveled up
    levelup.style.visibility = 'visible';
  } else {
    //otherwise let's set the number of OK intervals in a row
    console.log('OK intervals was not more than 5');
    localStorage.setItem('okIntervals', okIntervals + 1);
    console.log('increasing ok intervals to' + localStorage.getItem('okIntervals'));
  }

  feelingsQuiz.style.visibility = 'hidden';
});

notButton.addEventListener('click', function(event) {
  // ah so the last interval was too short!
  //so first let's figure out if we just had a break or not
  let breaks = localStorage.getItem('breaks');
  let trainings = localStorage.getItem('trainings');
  // if there are no trainings, we're on a break and the break wasn't long enough, let's increase it
  if (trainings == 0) {
    console.log('we were just on a break');

    let breakTime = parseInt(localStorage.getItem('break'));
    console.log('break time before ' + breakTime);

    localStorage.setItem('break', breakTime + increase);
    console.log('break time after ' + localStorage.getItem('break'));
  } else {
    console.log('we were just training');
    // otherwise it was a training and the training wasn't long enough, so let's increase
    let trainingTime = parseInt(localStorage.getItem('train'));
    console.log('training time before ' + trainingTime);

    localStorage.setItem('train', trainingTime + increase);
    console.log('training time after ' + localStorage.getItem('train'));

    // oh and this resets the # of intervals that's been the right time
    localStorage.setItem('okIntervals', 0);
    console.log('level of okIntervals should be zero' + localStorage.getItem('okIntervals'));
  }
  feelingsQuiz.style.visibility = 'hidden';
});

// reset button for debugging
resetButton.addEventListener('click', function(event) {
  localStorage.clear();
});

fakeButton.addEventListener('click', function(event) {
  console.log('test fake button');
  // ok time to train!
  timer(2);
});

function increase(what, amount) {
  let current = getStorage(); 
  console.log('current storage', current);
  current[what] += amount; 
  console.log('storage after increase time', current);
  setStorage(current)
  console.log('new local storage values', getStorage());

}

function decrease(what, amount) {
  let current = getStorage(); 
  console.log('current storage', current);
  //only works for training right now
  current[what] -= amount; 
  console.log('storage after increase time', current);
  setStorage(current)
  console.log('new local storage values', getStorage());
}


const machine = {
 currentState: 'idle',
  states: {
    'idle': {
      train: 'training',
      break: 'breaking'

    },
    'breaking': {
      end: 'idle'
    },
    'training': {
      end: 'idle'
    }
  }
}


const input = function (name) {
  const state = machine.currentState;

  if (machine.states[state][name]) {
    machine.currentState = machine.states[state][name];
  }
  console.log(`${ state } + ${ name } --> ${ machine.currentState }`);
}



