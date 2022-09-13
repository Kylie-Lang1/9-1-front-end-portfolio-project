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
const submit = document.querySelector(`#submit`)
const answer = document.querySelector(`.answer`)

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
        score.classList.remove(`hidden`)
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
        for(let i=0; i<15; i++){
            num = (Math.random()*res.length).toFixed(0)
            if (!randomNum.includes(num)){
                randomNum[i] = Number(num) 
            } else {
                randomNum[i] = Number(num+1)
            }
            console.log(randomNum)
        }

        //Adding text content for first question
        questionNum.textContent = `Question ${qCount}:`
        console.log(res)
        q.textContent = `${res[randomNum[0]][`question`]}`

        //Adding event listener for each question submit
        submit.addEventListener(`click`, (event) => {
            event.preventDefault()

            answer.innerHTML = `<span>Answer:</span> ${res[randomNum[0]][`answer`]}`
            
        })

        // for(let i=0; i<15; i++){
        //     q.textContent = `${res[randomNum[i]]}`
        // }
        // console.log(res)
        // q.textContent = `${res[0][`question`]}`
    })
    .catch(err => console.log(err))
})


// fetch(${BASE_URL})