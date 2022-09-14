// setting my variables

// const calculator = document.querySelector(`calculator`);
// const keys = document.querySelector(`calculatorKeys`);

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
// const minusButton = document.querySelector("[data-negative]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


// make a class "calculator" with all the functions I expect the calculator to do
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        currentOperandTextElement.style.color = "black";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        currentOperandTextElement.style.color = "black";
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
       this.currentOperand = this.currentOperand.toString() + number.toString();
       currentOperandTextElement.style.color = "black";
    }

    // appendNegativeNumber(number) {
    //   if (number === "." && this.currentOperand.includes(".")) return;
    //    this.currentOperand = this.currentOperand.toString() + number.toString();
    // }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        currentOperandTextElement.style.color = "black";
    }

    compute() {
       let computation
       const prev = parseFloat(this.previousOperand);
       const current = parseFloat(this.currentOperand);
       if (isNaN(prev) || isNaN(current)) return;
       switch (this.operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "÷":
            computation = prev / current
            break
        default:
            return       
       }
       this.currentOperand = computation;
       this.operation = undefined;
       this.previousOperand = ".";
       currentOperandTextElement.style.color = "green";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = "";
            } else {
                integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
            };
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            };
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        };
        
    }
}


// create a new calculator function 
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay(); 
    });
});

// minusButton.addEventListener("click", button => {
//   calculator.appendNumber(button.innerText)
//   calculator.updateDisplay()
// })

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
    
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});

// function updateDisplay() {
//     this.questionDisplay.innerText = this.question
// }

// keys.addEventListener("click", e => {
// if (e.target.matches(`button`)) {
// const key = e.target
// const action = key.dataset.action
// const keyContent = key.textContent
// const displayedNum = display.textContent
// }

// })

// if (!action) {
//     if (displayedNum === `0` || previousKeyType === "operator") {
//         display.textContent = keyContent
//     } else {
//         display.textContent = displayedNum + keyContent
//     }
// }

// if (action === 'decimal') {
//     display.textContent = displayedNum + '.'
// }

// if (
//     action === 'add' ||
//     action === 'subtract' ||
//     action === 'multiply' ||
//     action === 'divide'
// ) {
//     key.classList.add('is-depressed')
//     calculator.dataset.previousKeyType = "operator"
// }

// keys.addEventListener("click", e => {
//     if (e.target.matches("button")) {
//         const key = e.target
//         Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"))
//     }
// })

// if (action === "calculate") {
//     const secondValue = displayedNum
// }

// if (
//     action === 'add' ||
//     action === 'subtract' ||
//     action === 'multiply' ||
//     action === 'divide'
// ) {
//     calculator.dataset.firstValue = displayedNum
//     calculator.dataset.operator = action
// }

// if (action === "calculate") {
//     const firstValue = calculator.dataset.firstValue
//     const operator = calculator.dataset.operator
//     const secondValue = displayedNum

//     display.textContent = calculate(firstValue, operator, secondValue)
// }

// const calculate = (n1, operator, n2) => {
//     let result = ""
//     if (operator === "add") {
//         result = parseFloat(n1) + parseFloat(n2)
// } else if (operator === "subtract") {
//     result = parseFloat(n1) - parseFloat(n2)
// } else if (operator === "multiply") {
//     result = parseFloat(n1) * parseFloat(n2)
// } else if (operator === "divide") {
//     result = parseFloat(n1) / parseFloat(n2)
// } return result
// }

// function fitElementToParent(el, padding) {
//     var timeout = null;
//     function resize() {
//       if (timeout) clearTimeout(timeout);
//       anime.set(el, {scale: 1});
//       var pad = padding || 0;
//       var parentEl = el.parentNode;
//       var elOffsetWidth = el.offsetWidth - pad;
//       var parentOffsetWidth = parentEl.offsetWidth;
//       var ratio = parentOffsetWidth / elOffsetWidth;
//       timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
//     }
//     resize();
//     window.addEventListener('resize', resize);
//   }
  
//   var layeredAnimation = (function() {
  
//     var transformEls = document.querySelectorAll('.transform-progress');
//     var layeredAnimationEl = document.querySelector('.layered-animations');
//     var shapeEls = layeredAnimationEl.querySelectorAll('.shape');
//     var triangleEl = layeredAnimationEl.querySelector('polygon');
//     var trianglePoints = triangleEl.getAttribute('points').split(' ');
//     var easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine', 'spring'];
  
//     fitElementToParent(layeredAnimationEl);
  
//     function createKeyframes(value) {
//       var keyframes = [];
//       for (var i = 0; i < 30; i++) keyframes.push({ value: value });
//       return keyframes;
//     }
  
//     function animateShape(el) {
  
//       var circleEl = el.querySelector('circle');
//       var rectEl = el.querySelector('rect');
//       var polyEl = el.querySelector('polygon');
  
//       var animation = anime.timeline({
//         targets: el,
//         duration: function() { return anime.random(600, 2200); },
//         easing: function() { return easings[anime.random(0, easings.length - 1)]; },
//         complete: function(anim) { animateShape(anim.animatables[0].target); },
//       })
//       .add({
//         translateX: createKeyframes(function(el) { 
//           return el.classList.contains('large') ? anime.random(-300, 300) : anime.random(-520, 520);
//         }),
//         translateY: createKeyframes(function(el) { 
//           return el.classList.contains('large') ? anime.random(-110, 110) : anime.random(-280, 280);
//         }),
//         rotate: createKeyframes(function() { return anime.random(-180, 180); }),
//       }, 0);
//       if (circleEl) {
//         animation.add({
//           targets: circleEl,
//           r: createKeyframes(function() { return anime.random(32, 72); }),
//         }, 0);
//       }
//       if (rectEl) {
//         animation.add({
//           targets: rectEl,
//           width: createKeyframes(function() { return anime.random(64, 120); }),
//           height: createKeyframes(function() { return anime.random(64, 120); }),
//         }, 0);
//       }
//       if (polyEl) {
//         animation.add({
//           targets: polyEl,
//           points: createKeyframes(function() { 
//             var scale = anime.random(72, 180) / 100;
//             return trianglePoints.map(function(p) { return p * scale; }).join(' ');
//           }),
//         }, 0);
//       }
  
//     }
  
//     for (var i = 0; i < shapeEls.length; i++) {
//       animateShape(shapeEls[i]);
//     }
  
//   })();
  