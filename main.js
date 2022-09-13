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
const qCount = 1
const scoreCount = 0

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

    if(category.includes(`Select`) === true || difficulty.includes(`Select`) === true){
        window.alert(`Please select both a category and difficulty level.`)
    } else {
        select.classList.toggle(`hidden`)
        main.classList.remove(`hidden`)
        question.classList.remove(`hidden`)
        score.classList.remove(`hidden`)
    }

    if(difficulty === `easy`){
        difficulty = 100
    } else if (difficulty === `medium`){
        difficulty = 300
    } else if (difficulty === `hard`){
        difficulty = 600
    }

    if(category.includes(`cities`)){
        category = citiesId
    } else if (category === `Trivia`){
        category = triviaId
    } else if (category.includes(`History`)){
        category = historyId
    } else if (category.includes(`TV`)){
        category = tvTrivId
    }

    fetch(`${BASE_URL}clues?category=${category}&value=${difficulty}`)
    .then(res => res.json())
    .then(res => {
        questionNum.textContent = `Question ${qCount}:`
        
        let randomNum = []
        for(let i=0; i<15; i++){
            randomNum[i] = (Math.random()*100).toFixed(0)
            console.log(randomNum)
        }

        for(let i=0; i<15; i++){

        }
        // console.log(res)
        // q.textContent = `${res[0][`question`]}`
    })
    .catch(err => console.log(err))
})


// fetch(${BASE_URL})