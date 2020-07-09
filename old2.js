//dom
// @todo yikes let's refactor
function showQuiz() {
  // show quiz
  document.getElementById('feelingsQuiz').style.display = 'block';
  // don't show end buttons
  document.getElementById('endButtons').style.display = 'none';
}

function hideGoalQuiz() {
  document.getElementById('goalQuiz').style.display = 'none';
}
function showGoalQuiz() {
  document.getElementById('goalQuiz').style.display = 'block';
}
function setGoalQuiz() {
  const goal = getGoal();
  document.getElementById('goalQuestion').innerHTML = 'Did you focus on ' + goal + '?';
}

function setSessionsStatus(sessions) {
  document.getElementById('sessionsTotal').innerHTML = sessions;
}

function setTrainingTimeStatus(trainingTime) {
  document.getElementById('timeTotal').innerHTML = trainingTime;
}

function setStatusMessage(message) {
  document.getElementById('status-message').innerHTML = message;
}

function resetGoal() {
  document.getElementById('goal').value = '';
}

function hideQuiz() {
  document.getElementById('feelingsQuiz').style.display = 'none';
}

function showStartButtons() {
  document.getElementById('startButtons').style.display = 'block';
}

function hideStartButtons() {
  document.getElementById('startButtons').style.display = 'none';
}

function showEndButtons() {
  document.getElementById('endButtons').style.display = 'block';
}

function hideEndButtons() {
  document.getElementById('endButtons').style.display = 'none';
}

function setStatusTraining() {
  const goal = getGoal();
  document.getElementById('status').innerHTML = 'currently training on ' + goal;
}

function setStatusBreaking() {
  document.getElementById('status').innerHTML = 'currently breaking';
}

function setStatusWasBreaking() {
  document.getElementById('status').innerHTML = 'doing nothing after break';
}

function setStatusWasTraining() {
  document.getElementById('status').innerHTML = 'doing nothing after training';
}

function setQuestionWasTraining(seconds) {
  document.getElementById('quizQuestion').innerHTML = 'How was your ' + secondsConvert(seconds) + ' training?';
}

function setQuestionWasBreaking(seconds) {
  document.getElementById('quizQuestion').innerHTML = 'How was your ' + secondsConvert(seconds) + ' break?';
}

// @todo replace with toggle
function showHyperfocus() {
  console.log('showHyperfocus');
  document.getElementById('hyperfocus').style.display = 'block';
}
function hideHyperfocus() {
  document.getElementById('hyperfocus').style.display = 'none';
}

function hideSlack() {
  document.getElementById('slackmode').style.display = 'none';
}

function showSlack() {
  document.getElementById('slackmode').style.display = 'block';
}

function hideLevelup() {
  document.getElementById('levelup').style.display = 'none';
}

function showClock() {
  document.getElementById('clock').style.display = 'block';
}

function hideClock() {
  document.getElementById('clock').style.display = 'none';
}

function getGoal() {
  let goal = document.getElementById('goal').value;
  return goal;
}

function hideGoal() {
  document.getElementById('goal').classList.add('hidden');
  // document.getElementById('goal').style.display = 'none';
}

function showGoal() {
  document.getElementById('goal').classList.remove('hidden');

  //  document.getElementById('goal').style.display = 'block';
}

function hideTrainButton() {
  document.getElementById('trainButton').style.display = 'none';
}

function showTrainButton() {
  document.getElementById('trainButton').style.display = 'inline';
}

function hideBreakButton() {
  document.getElementById('breakButton').style.display = 'none';
}

function showBreakButton() {
  document.getElementById('breakButton').style.display = 'inline';
}

function uncheckToggle() {
  document.getElementById('toggle1').checked = false;
}

function toggleTrain() {
  hideBreakButton();
  showTrainButton();
  showGoal();
}

function toggleBreak() {
  showBreakButton();
  hideTrainButton();
  hideGoal();
}

function toggle(event) {
  if (event.target.checked) {
    console.log('checked');
    toggleBreak();
  } else {
    console.log('not checked');
    toggleTrain();
  }
}

// moods

function hyperfocusMode() {
  document.getElementById('hyperfocus').style.display = 'block';
}

//timer
let countdown;
let secondsLeft;
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      endTimer();
      //also play sound
      playSound();
      // notify
      notifyMe();
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  document.querySelector('.display__time-left').textContent = display;
}

function secondsConvert(seconds) {
  console.log('seconds', seconds);
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

  return display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  document.querySelector('.display__end-time').textContent = `Done at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function endTimer() {
  clearInterval(countdown);
  console.log('countdown', countdown);
  // show quiz
  // showQuiz();
  hideClock();

  // change status
  // hide end buttons
  hideEndButtons();
  let storage = getStorage();
  console.log('storage is', storage);
  let interruption = storage.lastSessionTime - secondsLeft;
  console.log('secondsLeft', secondsLeft);
  console.log("  storage['lastSessionTime']", interruption);

  if (storage['previousState'] === 1) {
    if (secondsLeft < 0) {
            console.log("not Interrupted")

      setGoalQuiz();
      showGoalQuiz();
      setQuestionWasTraining(storage.lastSessionTime);
    } else {
      console.log("Interrupted")
      storage['lastSessionTime'] = interruption;
      setGoalQuiz();
      showGoalQuiz();
      setQuestionWasTraining(interruption);
    }
    setStatusWasTraining();
  }

  if (storage['previousState'] === 2) {
    if (secondsLeft < 0) {
            console.log("not Interrupted")

      showQuiz();
      setQuestionWasBreaking(storage.lastSessionTime);
    } else {
      console.log("Interrupted")
      wasInterrupted();
    }

    setStatusWasBreaking();
  }

  setStorage(storage);
  console.log('new storage is', storage);
}

// my local storage
const data = {
  // initial training focus is 20 minutes which is 1200 seconds
  trainingTime: 1200,
  //initial break is 10 minutes which is 600 seconds
  breakTime: 600,
  // trainings in a row is initially zero
  trainingsConsecutive: 0,
  // break intervals in a row is initially 0
  breaksConsecutive: 0,
  //total trainings
  totalTrainings: 0,
  //total breaks
  totalBreaks: 0,
  //intervals where you haven't increased time
  justRightIntervals: 0,
  // goals
  goals: 0,
  // mood
  hyperfocus: 0,
  slack: 0,
  // last state 0 is none, 1 is training, 2 is break
  previousState: 0,
  // amount to alter time when training
  intervalTime: 60,
  // time of session last triggered
  lastSessionTime: 0,
};

function load() {
  // hide buttons we aren't using
  hideEndButtons();
  hideGoalQuiz();
  hideQuiz();
  hideClock();
  hideHyperfocus();
  hideSlack();
  hideLevelup();
  toggleTrain();
  uncheckToggle();
  //let's decide whether or not to show
  console.log('test', test);
  //let's store our values if there aren't any yet
  if (!localStorage.getItem('trainingTime')) {
    for (const key in data) {
      console.log('initial set up of storage');
      localStorage.setItem(key, data[key]);
    }
  } else {
    console.log("OK we already have local storage, let's get it");
    let storage = getStorage();
    setSessionsStatus(storage.totalTrainings);
    setTrainingTimeStatus(secondsConvert(storage.trainingTime));
    if (storage.slack === 1) {
      showSlack();
    }

    if (storage.hyperfocus === 1) {
      showHyperfocus();
    }
  }
}

//let's run load
load();

// this parses storage and gets our items in the right format
// parseInt
function getStorage() {
  let storage = {};
  for (const key in data) {
    //get localstorage
    const item = localStorage.getItem(key);
    const parsed = parseInt(item);
    if (isNaN(parsed)) {
      storage[key] = item;
    } else {
      storage[key] = parsed;
    }
  }

  console.log(storage);
  return storage;
}

function setStorage(newData) {
  for (const key in newData) {
    //get localstorage
    localStorage.setItem(key, newData[key]);
  }
}

// statuses

function test(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();
  console.log(event);
}

function doTrain() {
  console.log('doing training');
  hideSlack();
  showEndButtons();
  hideStartButtons();
  setStatusTraining();
  showClock();

  /// storage actions
  let storage = getStorage();
  // increase total trainings
  storage['totalTrainings'] += 1;
  // slack mode ends
  storage['slack'] = 0;
  if (storage['previousState'] === 1) {
    console.log("previous state was training so we'll increase trainings consecutive");
    storage['trainingsConsecutive'] += 1;
  } else {
    console.log("previous state was either breaking or none so we'll start breaks consecutive and reset trainings consecutive");
    storage['trainingsConsecutive'] = 1;
    storage['breaksConsecutive'] = 0;
  }

  storage['lastSessionTime'] = storage.trainingTime;

  // now the previous state will be trained
  storage['previousState'] = 1;

  // lets check for hyperfocus
  storage = hyperfocusCheck(storage);
  // put our storage in order
  setStorage(storage);
  console.log('our final storage is', storage);

  // timer go!
  timer(storage.trainingTime);
}

function takeBreak() {
  console.log('taking break');
  setStatusBreaking();
  showEndButtons();
  hideStartButtons();
  hideHyperfocus();
  showClock();

  /// storage actions
  let storage = getStorage();
  // increase total breaks
  storage['totalBreaks'] += 1;

  // end hyperfocus
  storage['hypefocus'] = 0;

  let breakTime = 0;

  if (storage['previousState'] === 2) {
    console.log("previous state was breaking so we'll increase breaks consecutive and decrease back time");
    storage['breaksConsecutive'] += 1;
    // you just took a break so you only get a smaller one
    breakTime = storage.breakTime / (storage.breaksConsecutive / 2);
  } else {
    console.log("previous state was either training or none so we'll start breaks consecutive and reset trainings consecutive");
    storage['trainingsConsecutive'] = 0;
    storage['breaksConsecutive'] = 1;
    breakTime = storage.breakTime;
  }

  // now the previous state will be breaked
  storage['previousState'] = 2;

  //updated trained time
  storage['lastSessionTime'] = breakTime;

  //check slack mode
  storage = slackCheck(storage);

  // put our storage in order
  setStorage(storage);
  console.log('our final storage is', storage);
  console.log('breaktime is', breakTime);
  // timer go!
  timer(breakTime);
}

//TODO create a function for interrupt, abort can use sessionToolong
function wasInterrupted() {
  console.log('was interrupted so not updating storage');
  showStartButtons();
}

function sessionTooLong() {
  console.log('session too long');
  hideQuiz();
  clearInterval(countdown);

  /// storage actions
  let storage = getStorage();

  //reset
  storage['justRightIntervals'] = 0;

  // decrease the time of the affected training type
  if (storage['previousState'] === 1) {
    storage['trainingTime'] = storage['lastSessionTime'] - storage['intervalTime'];
  }

  if (storage['previousState'] === 2) {
    if (storage['breaksConsecutive'] > 1) {
      //don't change
    } else if (storage['lastSessionTime'] !== storage['breakTime']) {
      //also don't change bc was interrtupted
      console.log("don't change bc break was interrupted");
    } else {
      storage['breakTime'] = storage['lastSessionTime'] - storage['intervalTime'];
    }
  }

  // put our storage in order
  setStorage(storage);
  console.log('our final storage is', storage);

  // check for moods

  // moodCheck();
  showStartButtons();
}

function sessionTooShort() {
  console.log('session too short');

  hideQuiz();
  /// storage actions
  let storage = getStorage();

  //reset
  storage['justRightIntervals'] = 0;

  // incrase the time of the affected training type
  if (storage['previousState'] === 1) {
    storage['trainingTime'] = storage['lastSessionTime'] + storage['intervalTime'];
  }

  if (storage['previousState'] === 2) {
    if (storage['breaksConsecutive'] > 1) {
      console.log("don't change bc more than one break in a row");

      //don't change
    } else if (storage['lastSessionTime'] !== storage['breakTime']) {
      //also don't change bc was interrtupted
      console.log("don't change bc break was interrupted");
    } else {
      storage['breakTime'] = storage['lastSessionTime'] + storage['intervalTime'];
    }
  }

  // put our storage in order
  setStorage(storage);
  console.log('our final storage is', storage);

  // check for moods

  // moodCheck();
  showStartButtons();
}

function sessionJustRight() {
  hideQuiz();
  let storage = getStorage();

  if (storage['previousState'] === 1) {
    let newTime = storage['lastSessionTime'] + storage['intervalTime']/2
    storage['trainingTime'] = storage['lastSessionTime'];
  }

  if (storage['previousState'] === 2) {
    if (storage['breaksConsecutive'] > 1) {
      //don't change
    } else if (storage['lastSessionTime'] !== storage['breakTime']) {
      //also don't change bc was interrtupted
      console.log("don't change bc break was interrupted");
    } else {
      storage['breakTime'] = storage['lastSessionTime'];
    }
  }
  // increase ok intervals
  storage['justRightIntervals'] += 1;
  setStorage(storage);
  console.log('our final storage is', storage);

  showStartButtons();
}

// goal quiz
function didGoal() {
  let storage = getStorage();
  console.log('storage is', storage);
  storage['goals'] += 1;
  console.log('new storage is', storage);
  setStorage(storage);

  hideGoalQuiz();
  resetGoal();
  showQuiz();
}

function noGoal() {
  hideGoalQuiz();
  resetGoal();
  showQuiz();
}

//moods

function slackCheck(storage) {
  console.log('storage before slack check', storage);
  let newStorage = storage;
  if (storage.breaksConsecutive >= 4) {
    console.log('start slack mode');
    showSlack();
    newStorage.slack = 1;
    //decrease break time
    newStorage.breakTime -= storage.intervalTime;
    // decrease training time
    newStorage.trainingTime -= storage.intervalTime;
  } else {
    newStorage.slack = 0;
    hideSlack();
    console.log('slack check none found');
  }

  console.log('storage after', newStorage);

  return newStorage;
}

function hyperfocusCheck(storage) {
  console.log('storage before hyperfocus check', storage);
  let newStorage = storage;
  // are we already hyperfocused?
  if (storage.trainingsConsecutive >= 4) {
    console.log('start hyperfocus mode');
    showHyperfocus();
    newStorage.hyperfocus = 1;
    newStorage.trainingTime -= storage.intervalTime;
    newStorage.breakTime += storage.intervalTime;
  } else {
    console.log('hyper focus check none found');
    newStorage.hyperfocus = 0;
  }

  console.log('storage after', newStorage);

  return newStorage;
}
function newDay() {
  let storage = getStorage();
  // increase total breaks
  storage['justRightIntervals'] = 0;

  storage['previousState'] = 0;
  storage['slack'] = 0;
  storage['hyperfocus'] = 0;

  storage['totalBreaks'] = 0;
  storage['totalTrainings'] = 0;
  storage['goals'] = 0;

  storage['breaksConsecutive'] = 0;
  storage['trainingsConsecutive'] = 0;

  // put our storage in order
  setStorage(storage);
}

//buttons
document.getElementById('trainButton').addEventListener('click', doTrain);
document.getElementById('breakButton').addEventListener('click', takeBreak);
document.getElementById('tooLong').addEventListener('click', sessionTooLong);
document.getElementById('tooShort').addEventListener('click', sessionTooShort);
document.getElementById('justRight').addEventListener('click', sessionJustRight);
document.getElementById('endEarly').addEventListener('click', endTimer);
document.getElementById('noGoal').addEventListener('click', noGoal);
document.getElementById('yesGoal').addEventListener('click', didGoal);
document.getElementById('newDay').addEventListener('click', newDay);
document.getElementById('toggle1').addEventListener('change', toggle);

//document.forms[0].addEventListener('submit', test)

//forms

// https://www.sitepoint.com/web-audio-api-add-sound-to-web-page/
const context = new AudioContext();

function playSound() {
  const oscillatorNode = context.createOscillator();
  const gainNode = context.createGain();

  oscillatorNode.type = 'sine';
  oscillatorNode.frequency.setValueAtTime(150, context.currentTime);
  oscillatorNode.frequency.exponentialRampToValueAtTime(500, context.currentTime + 0.5);

  gainNode.gain.setValueAtTime(0.3, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

  oscillatorNode.connect(gainNode);
  gainNode.connect(context.destination);

  oscillatorNode.start();
  oscillatorNode.stop(context.currentTime + 0.5);
}

//https://codepen.io/ademola/pen/VbjjjM

function notifyMe() {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications');
  }

  switch (Notification.permission) {
    case 'granted':
      notify();
      break;
    case 'denied':
    default:
      Notification.requestPermission();
      notify();
  }
}

function notify() {
  var notification = new Notification('Session over!');
}

//debug

const fakeButton = document.getElementById('fake');
const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', function(event) {
  localStorage.clear();
});

fakeButton.addEventListener('click', function(event) {
  console.log('test fake button');
  // ok time to train!
  timer(2);
});
