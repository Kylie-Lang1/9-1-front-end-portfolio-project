//Define base URL and search query parameters
const BASE_URL = `http://jservice.io/api/`;
const clues = `clues`;
const random = `random`;

//Define category IDs
const citiesId = `1`;
const triviaId = `2`;
const historyId = `4`;
const tvTrivId = `10`;

//Define value IDs
const easyId = `100`;
const mediumId = `300`;
const hardId = `600`;

//Create counter variables
let qCount = 1;
let scoreCount = 0;

//Selecting elements from the DOM
const popup = document.querySelector(`.popup`);
const select = document.querySelector(`.select`);
const intro = document.querySelector(`.intro`);
const button = document.querySelector(`button`);
const question = document.querySelector(`.question`);
const questionNum = document.querySelector(`.count`);
const score = document.querySelector(`.score`);
const main = document.querySelector(`main`);
const scoreNumber = document.querySelector(`.number`);

//Selecting multiple elements from the DOM
const qs = document.querySelectorAll(`.q`);
const answers = document.querySelectorAll(`.answer`);
const textAnswers = document.querySelectorAll(`text_answer`);
const submits = document.querySelectorAll(`.submit`);

//Declaring variables that can be re-assigned vales
let playerName = ``;
let category = ``;
let difficulty = ``;

//Response for successful API call
fetch(`${BASE_URL}${clues}`)
  .then((res) => res.json())
  .then(() => {
    popup.classList.toggle(`hidden`);
  })
  .catch((err) => console.log(err));

//Add event listener to name submit button
popup.addEventListener(`submit`, (event) => {
  event.preventDefault();
  playerName = `${event.target[0].value}`;
  popup.classList.toggle(`hidden`);
  select.classList.toggle(`hidden`);
});

//Add event listener for category/difficulty submit button
select.addEventListener(`submit`, (event) => {
  event.preventDefault();

  category = `${event.target.category.value}`;
  difficulty = `${event.target.difficulty.value}`;

  //Guard clause with error alert if category and difficulty not selected
  if (
    category.includes(`Select`) === true ||
    difficulty.includes(`Select`) === true
  ) {
    window.alert(`Please select both a category and difficulty level.`);
  } else {
    select.classList.toggle(`hidden`);
    main.classList.remove(`hidden`);
    question.classList.remove(`hidden`);
    score.classList.remove(`hidden`)
  }

  //Re-assigning selected difficulty to API search parameter value
  if (difficulty === `easy`) {
    difficulty = easyId;
  } else if (difficulty === `medium`) {
    difficulty = mediumId;
  } else if (difficulty === `hard`) {
    difficulty = hardId;
  }

  //Re-assigning selected category to API search parameter value
  if (category.includes(`cities`)) {
    category = citiesId;
  } else if (category === `Trivia`) {
    category = triviaId;
  } else if (category.includes(`History`)) {
    category = historyId;
  } else if (category.includes(`TV`)) {
    category = tvTrivId;
  }

  //Fetching API data for selected search parameters
  fetch(`${BASE_URL}clues?category=${category}&value=${difficulty}`)
    .then((res) => res.json())
    .then((res) => {
      //Random number generator
      let randomNum = [];
      for (let i = 0; i < 10; i++) {
        let num = (Math.random() * res.length).toFixed(0);
        if (!randomNum.includes(num) && num <= res.length) {
          randomNum[i] = Number(num);
        } else if (Number(num + 1) <= res.length) {
          randomNum[i] = Number(num + 1);
        } else {
          randomNum[i] = Number(num - 1);
        }
      }

      //Adding text content for questions from API
      for (let i = 0; i < 10; i++) {
        let qNum = 1;

        qs.forEach((q, i) => {
            q.textContent = `${res[randomNum[i]][`question`]}`;
        });

        answers.forEach((answer, i) => {
          answer.innerHTML = `<span>Answer:</span> ${
            res[randomNum[i]][`answer`]
          }`;
          answer.classList.add(`hidden`);
        });

        textAnswers.forEach((text) => {
          text.classList.remove(`hidden`);
        });

        //Adding event listener to submit to show correct answer with different styling based on incorrect/correct input
        submits.forEach((submit, i) => {
          submit.addEventListener(`click`, (event) => {
            event.preventDefault();

            //Selecting answer elements and setting variable for correct answer
            const ans = document.querySelector(`.answer.q${qNum}`);
            const input = document.querySelector(`#answer${qNum}`);
            const text = document.querySelector(`.text_answer.q${qNum}`)
            const correctAns = res[randomNum[i]][`answer`];

            //Add/remove .hidden class for elements
            submit.classList.add(`hidden`);
            text.classList.add(`hidden`);
            ans.classList.remove(`hidden`);

            //Changing styling of revealed correct answer based on incorrect/correct input
            if (correctAns.toLowerCase().includes(input.value.toLowerCase()) && input.value.length >= correctAns.length-2) {
              ans.style.color = `green`;
            } else {
              ans.style.color = `red`;
            }

            //Adding to score for correct answers
            if (ans.style.color === `green`){
                scoreCount += res[randomNum[i]][`value`]
                scoreNumber.innerText = `${scoreCount}`
            }

            //Show next question after submitting previous question
            document.querySelector(`.question.q${qNum + 1}`).classList.remove(`hidden`);

            //Increment qNum for the next question
            qNum++;
          });
        });
      }
    })
    .catch((err) => console.log(err));
});