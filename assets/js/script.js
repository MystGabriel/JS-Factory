// SWIPER

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2.3,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        480: {
            slidesPerView: 1.3,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        850: {
            slidesPerView: 2.3,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});

// DRAG & DROP

let cards = document.querySelector('.cards')

new Sortable(cards, {
    animation: 300
})

// WEATHER

const tempEl = document.querySelector('.current-temp-text')
const cityEl = document.querySelector('.current-location-text')

const form = document.getElementById('form')
const search = document.getElementById('search')

const apiKey = '0e80ab03339fdfcc5be49f8d1b81ba92'

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cors"
    })

    const respData = await resp.json()

    addWeatherToPage(respData)
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp)

    const weatherData = data.weather[0].main

    console.log(data)

    const weather = document.createElement('p')
    const city = document.createElement('p')

    weather.innerHTML = `${weatherData} <br> ${temp} ºC`
    city.innerHTML = `${search.value}`

    tempEl.innerHTML = ""
    cityEl.innerHTML = ""

    tempEl.appendChild(weather)
    cityEl.appendChild(city)
}

function KtoC(K) {
    return (K - 273.15).toFixed(1)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const city = search.value

    if (city) {
        getWeatherByLocation(city)
    }
})

// TODO

const formTask = document.getElementById('form-task')
const createTask = document.getElementById('create-task')
const addTaskEl = document.querySelector('.tasks')
const qtdTasks = document.querySelector('.qtd-tasks')

new Sortable(addTaskEl, {
    animation: 300
})

function idGen() {

    const timestamp = new Date()

    const id =
        timestamp.getHours().toString() +
        timestamp.getMinutes().toString() +
        timestamp.getSeconds().toString() +
        timestamp.getMilliseconds().toString()

    return id
}

function addTask(task) {

    idGen()

    const createTaskDiv = document.createElement('div')

    id = idGen()

    createTaskDiv.setAttribute("class", "task-content")
    createTaskDiv.setAttribute("id-data", id)

    createTaskDiv.innerHTML = `
        <div class="check-input">
            <input type="checkbox">
            <label for="check">${task}</label>
        </div>
        <div class="delete-btn">
            <button class="delete" onclick="removeEl()" id-data=${id}>
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `

    addTaskEl.appendChild(createTaskDiv)

    qtdTasksEl()

}

function removeEl() {

    const remove = document.querySelector('.task-content')

    remove.parentNode.removeChild(remove)

    qtdTasksEl()

}

function qtdTasksEl() {

    const countTasks = addTaskEl.children.length

    qtdTasks.innerHTML = `<p>Tasks - ${countTasks}</p>`

}

formTask.addEventListener('submit', (e) => {
    e.preventDefault()

    const task = createTask.value

    createTask.value = ''

    addTask(task)
})

qtdTasksEl()