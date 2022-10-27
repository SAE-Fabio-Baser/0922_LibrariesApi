import Calculator from "./calculator.js";

const showCalcButton = document.querySelector("#showCalculator")
const calculatorContainer = document.querySelector("#calculatorContainer")

showCalcButton.addEventListener("click", async () => {
    loadHTML("calculator.html")
        .then(res => {
            insertIntoDOM(res, calculatorContainer)
            showCalcButton.remove()

            const calc = new Calculator(calculatorContainer)
            window.wurstbrot = calc
            console.log(calc)
        })
})

async function loadHTML(path) {
    const response = await fetch(path)
    return await response.text()
}

function insertIntoDOM(htmlText, parentElement) {
    parentElement.innerHTML = htmlText
}