// Questions Array
const questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create A Password', type: 'password'}
];

// Transition Times
const shakeTime = 100; // Shake Transition time
const switchTime = 200; // Transition between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');


// EVENTS

// Get question on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);
// Next Button Click
nextBtn.addEventListener('click', validate);
// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// Get guestion from array and add to markup
function getQuestion() {
  // get current guestion
  inputLabel.innerHTML = questions[position].question;
  // get current type
  inputLabel.type = questions[position].type || 'text';
  // get current answer
  inputField.value = questions[position].answer || '';
  // Focus on Element
  inputField.focus();

  // set the progress bar width - variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // add user Icon OR back arrow depending on question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Display question to user
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  //Make sure pattern matches if there is one
  if(!inputField.value.match(questions[position].pattern || /.+/)){
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail(){
  formBox.className = 'error';
  // Repeat shake motion - set i to nr of shakes
  for(let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field Input Passed
function inputPass(){
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store answer
  questions[position].answer = inputField.value;

  // Increment the position
  position++;

  // If new question hide current and get next
  if(questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove if no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // form complete
    formComplete();
  }
}

// All fields complete - show h1 complete
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}. You are registred`));
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => h1.style.opacity = 1, 50);
  }, 1000);
}
