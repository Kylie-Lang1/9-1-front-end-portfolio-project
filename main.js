//Define base URL and search query parameters
const BASE_URL = `http://jservice.io/api/`
const clues = `clues`
// const category = `category`
// const difficulty = `value`
const random = `random`

//Define category IDs
const citiesId = `1`
const triviaId = `2`
const historyId = `4`
const tvTrivId = `10`

//Define value IDs
const easyId = `100`
const mediumId = `300`
const hardId = `600`

//Create counter variables
let qCount = 1
let scoreCount = 0

//Selecting elements from the DOM
const popup = document.querySelector(`.popup`)
const select = document.querySelector(`.select`)
const instructions = document.querySelector(`.header p`)
const intro = document.querySelector(`.intro`)
const button = document.querySelector(`button`)
const question = document.querySelector(`.question`)
const questionNum = document.querySelector(`.count`)
const score = document.querySelector(`.score`)
const main = document.querySelector(`main`)
const q = document.querySelector(`.q`)
const submit = document.querySelector(`#submit`)
const answer = document.querySelector(`.answer`)
const textInput = document.querySelector(`#answer`)

const qs = document.querySelectorAll(`.q`)
const answers = document.querySelectorAll(`.answer`)
const textAnswers = document.querySelectorAll(`text_answer`)
const submits = document.querySelectorAll(`.submit`)

//Declaring variables that can be re-assigned vales
let playerName = ``
let category = ``
let difficulty = ``

//Response for successful API call
fetch(`${BASE_URL}${clues}`)
.then(res => res.json())
.then(() => {
    popup.classList.toggle(`hidden`)
})
.catch(err => console.log(err))

//Add event listener to name submit button
popup.addEventListener(`submit`, (event) => {
    event.preventDefault()
    playerName = `${event.target[0].value}`
    popup.classList.toggle(`hidden`)
    select.classList.toggle(`hidden`)
    instructions.classList.toggle(`hidden`)
    intro.classList.toggle(`hidden`)
})

//Add event listener for category/difficulty submit button
select.addEventListener(`submit`, (event) => {
    event.preventDefault()

    category = `${event.target.category.value}`
    difficulty = `${event.target.difficulty.value}`

    //Guard clause with error alert if category and difficulty not selected
    if(category.includes(`Select`) === true || difficulty.includes(`Select`) === true){
        window.alert(`Please select both a category and difficulty level.`)
    } else {
        select.classList.toggle(`hidden`)
        main.classList.remove(`hidden`)
        question.classList.remove(`hidden`)
        // score.classList.remove(`hidden`)
    }

    //Re-assigning selected difficulty to API search parameter value
    if(difficulty === `easy`){
        difficulty = easyId
    } else if (difficulty === `medium`){
        difficulty = mediumId
    } else if (difficulty === `hard`){
        difficulty = hardId
    }

    //Re-assigning selected category to API search parameter value
    if(category.includes(`cities`)){
        category = citiesId
    } else if (category === `Trivia`){
        category = triviaId
    } else if (category.includes(`History`)){
        category = historyId
    } else if (category.includes(`TV`)){
        category = tvTrivId
    }

    //Fetching API data for selected search parameters
    fetch(`${BASE_URL}clues?category=${category}&value=${difficulty}`)
    .then(res => res.json())
    .then(res => {
        
        //Random number generator
        let randomNum = []
        for(let i=0; i<10; i++){
            const num = (Math.random()*res.length).toFixed(0)
            if (!randomNum.includes(num) && num <= res.length){
                randomNum[i] = Number(num) 
            } else if (Number(num+1) <= res.length){
                randomNum[i] = Number(num+1)
            } else {
                randomNum[i] = Number(num-1)
            }
        }
        
        //Adding text content for questions from API
        for(let i=0; i<10; i++){

            let qNum = 1
            // const correctAnswer = `${res[randomNum[i]][`answer`]}`
            // const currentQ = `${res[randomNum[i]][`question`]}`

            qs.forEach((q) => {
                q.textContent = `${res[randomNum[i]][`question`]}`
                console.log(q)
            })
            answers.forEach((answer) => {
                answer.innerHTML = `<span>Answer:</span> ${res[randomNum[i]][`answer`]}`
                answer.classList.add(`hidden`)
                console.log(answer)
                // console.log(correctAnswer)
            })

            textAnswers.forEach((text) => {
                textAnswers.classList.remove(`hidden`)
            })

            submits.forEach((submit) => {
                submit.addEventListener(`click`, (event) => {
                    event.preventDefault()
                    console.log(event)

                    const correctAnswer = `${res[randomNum[i]][`answer`]}`
                    const a = document.querySelector(`.answer.q${qNum}`)
                    const input = document.querySelector(`#answer${qNum}`)
                    console.log(input)

                    submit.classList.add(`hidden`)
                    document.querySelector(`.text_answer.q${qNum}`).classList.add(`hidden`)
                    a.classList.remove(`hidden`)
                    if(correctAnswer.toLowerCase().includes(input.value.toLowerCase()) && (input.value.length >= (correctAnswer.length-2))){
                        a.style.color = `green`
                    } else {
                        a.style.color = `red`
                    }
                    console.log(a)
                    console.log(res[randomNum[i]][`answer`])
                    console.log(event.target.value)

                    document.querySelector(`.question.q${qNum+1}`).classList.remove(`hidden`)
                    qNum++
                })
            })
        }
    })
    .catch(err => console.log(err))
})
