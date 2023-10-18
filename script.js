document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let operator = "";
    let firstOperand = "";

    function updateDisplay() {
        display.value = currentInput;
    }

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = button.textContent;
            if (!isNaN(value) || value === ".") {
                currentInput += value;
                updateDisplay();
            } else if (value === "C") {
                currentInput = "";
                firstOperand = "";
                operator = "";
                updateDisplay();
            } else if (value === "←") {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            } else if (value === "=") {
                if (operator && firstOperand) {
                    currentInput = calculate(firstOperand, currentInput, operator).toString();
                    operator = "";
                    firstOperand = "";
                    updateDisplay();
                }
            } else {
                if (firstOperand) {
                    currentInput = calculate(firstOperand, currentInput, operator).toString();
                    operator = value;
                    firstOperand = currentInput;
                } else {
                    operator = value;
                    firstOperand = currentInput;
                }
                currentInput = "";
            }
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                if (b === 0) {
                    return "Error";
                }
                return a / b;
        }
    }
});
