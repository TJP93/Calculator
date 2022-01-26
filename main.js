class Calculator {
    constructor(previousOperandText, currentOperandText) {
     this.previousOperandText = previousOperandText
     this.currentOperandText = currentOperandText
     this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    delete() {
    this.currentOperand = this.currentOperand/toString().slice(0, -1)
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    selectOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.getResult()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    getResult() {
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                calculation = prev + current
                break
             case '-':
                 calculation = prev - current
                 break
            case '÷':
                calculation = prev / current
                break
            case '*':
                calculation = prev * current
                break
            default:
                return
        }
        this.currentOperand = calculation
        this.operation = undefined
        this.previousOperand = ''
                   
    }

    updateDisplay() {
      this.currentOperandText.innerText = this.currentOperand
      this.previousOperandText.innerText = this.previousOperand
    }
}


// const variables & querySelectors from HTML


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

// button functionality 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)  
      calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.selectOperation(button.innerText)  
      calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.getResult()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})