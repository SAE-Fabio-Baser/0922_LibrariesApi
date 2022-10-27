class Calculator {

    valueA = null
    valueB = null
    operator = "add"
    result = 0

    constructor(containerElement) {
        this.container = containerElement

        this.resultDiv = containerElement.querySelector(".result")
        this.controls = this.container.querySelectorAll("div[data-calc]")
        this.numKeys = this.container.querySelectorAll("div[data-num]")

        this.defineEventListeners()
        this.update()
    }

    update() {

        this.numKeys.forEach(numKey => {
            const num = numKey.dataset["num"]
            if (num === this.valueA || num === this.valueB) {
                numKey.classList.add("active")
            } else {
                numKey.classList.remove("active")
            }
        })

        this.controls.forEach(controlBtn => {
            if (controlBtn.dataset["calc"] === this.operator) {
                controlBtn.classList.add("active")
            } else {
                controlBtn.classList.remove("active")
            }
        })

    }

    calculate() {

        if (!this.valueA || !this.valueB) return

        const calculateFuncs = {
            add: (a, b) => a + b,
            sub: (a, b) => a - b,
            div: (a, b) => a / b,
            mult: (a, b) => a * b
        }

        const calc = calculateFuncs[this.operator]

        this.result = calc(parseFloat(this.valueA), parseFloat(this.valueB))
        console.log(this.result)

        this.resultDiv.innerText = this.result
        this.update()
    }

    setOperator(operator) {
        if (operator === "calculate") {
            this.calculate()
        } else if (operator === "clear") {
            this.valueA = null
            this.valueB = null
            this.operator = "add"
            this.result = 0
        } else {
            this.operator = operator
        }
    }

    setValue(newValue) {

        if (this.valueA !== null) {
            this.valueB = newValue
        } else {
            this.valueA = newValue
        }

    }

    defineEventListeners() {

        this.controls.forEach(controlButton => {
            controlButton.addEventListener("click", () => {
                const clickedControlChar = controlButton.dataset["calc"]
                this.setOperator(clickedControlChar)
                this.update()
            })
        })

        this.numKeys.forEach(numButton => {
            numButton.addEventListener("click", () => {
                const clickedNum = numButton.dataset["num"]
                this.setValue(clickedNum)
                this.update()
            })
        })
    }
}

export default Calculator