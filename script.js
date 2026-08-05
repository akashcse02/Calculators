const add=(a, b) => a + b;
const sub=(a, b) => a - b;
const mul=(a, b) => a * b;
const div=(a, b) => a / b;


function calculate(a, b, op) {
 switch(op) {
    case '+':
        return add(a, b);
    case '-':
        return sub(a, b);
    case '*':
        return mul(a, b);
    case '/':
        return div(a, b);
    default:
        throw new Error('Invalid operator');
 }
}

const aEl=document.getElementById('a');
const bEl=document.getElementById('b');
const opEl=document.getElementById('op');
const resultEl=document.getElementById('result');
 
document.getElementById('calculate').addEventListener('click', () => {
    const a=Number(aEl.value);
    const b=Number(bEl.value);
    const op=opEl.value;

    try {
        const result=calculate(a, b, op);
        resultEl.value=result;
    } catch (error) {
        resultEl.value='Error: ' + error.message;
    }
});
// Simple Calculator Refresh
const simpleRefreshBtn = document.getElementById("simple-refresh");

simpleRefreshBtn.addEventListener("click", () => {
    aEl.value = "";
    bEl.value = "";
    opEl.value = "+";
    resultEl.value = "";

    aEl.focus();
});



//------------------=================----------------------
//Grade Calculator

const input = document.getElementById("marks");
const btn = document.getElementById("btn");
const out = document.getElementById("grade-result");

function calculateGrade(marks) {
    if (marks >= 80) {
        return { grade: "A+", pass: true, msg: "Congratulations!" };
    } else if (marks >= 75) {
        return { grade: "A", pass: true, msg: "Well done!" };
    } else if (marks >= 70) {
        return { grade: "A-", pass: true, msg: "Good job!" };
    } else if (marks >= 65) {
        return { grade: "B+", pass: true, msg: "Keep it up!" };
    } else if (marks >= 60) {
        return { grade: "B", pass: true, msg: "Nice work!" };
    } else if (marks >= 55) {
        return { grade: "B-", pass: true, msg: "You can do better!" };
    } else if (marks >= 50) {
        return { grade: "C", pass: true, msg: "You passed!" };
    } else if (marks >= 45) {
        return { grade: "D", pass: true, msg: "You passed!" };
    } else {
        return { grade: "F", pass: false, msg: "You failed!" };
    }
}

btn.addEventListener("click", () => {
    const value = input.value.trim();
    const marks = Number(value);

    if (value === "" || Number.isNaN(marks) || marks < 0 || marks > 100) {
        out.value = "Enter a valid number from 0 to 100.";
        out.classList.remove("pass");
        out.classList.add("fail");
        return;
    }

    const result = calculateGrade(marks);

    out.value = `Grade: ${result.grade} — ${result.msg}`;
    out.classList.remove("pass", "fail");
    out.classList.add(result.pass ? "pass" : "fail");
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

// Grade Calculator Refresh
const gradeRefreshBtn = document.getElementById("grade-refresh");

gradeRefreshBtn.addEventListener("click", () => {
    input.value = "";
    out.value = "";

    out.classList.remove("pass", "fail");

    input.focus();
});




//Tip calculator-
//connnect with Element ----

    const billAmountInput = document.getElementById("bill-amount");
    const currencySelect = document.getElementById("currency");
    const tipPercentageInput = document.getElementById("tip-percentage");
    const tipOptionSelect = document.getElementById("tip-option");
    const numberOfPeopleInput = document.getElementById("number-of-people");
    const tipCalculateButton = document.getElementById("tip-calculate");
    const tipRefreshButton = document.getElementById("tip-refresh");
    const tipAmountResult = document.getElementById("tip-amount-result");
    const totalBillResult = document.getElementById("total-bill-result");
    const perPersonResult = document.getElementById("per-person-result");

   
   
   
   //Conditions---

    if (tipOptionSelect && tipPercentageInput) {
        tipOptionSelect.addEventListener("change", function () {
            tipPercentageInput.value = tipOptionSelect.value;
        });
    }
    if (tipPercentageInput && tipOptionSelect) {
        tipPercentageInput.addEventListener("input", function () {
            const inputValue = tipPercentageInput.value;
            const matchingOption = Array.from(
                tipOptionSelect.options
            ).some(function (option) {
                return option.value === inputValue;
            });

            if (matchingOption) {
                tipOptionSelect.value = inputValue;
            }
        });
    }

    if (
        billAmountInput &&
        currencySelect &&
        tipPercentageInput &&
        numberOfPeopleInput &&
        tipCalculateButton &&
        tipAmountResult &&
        totalBillResult &&
        perPersonResult
    ) {
        tipCalculateButton.addEventListener("click", calculateTip);
    }

    function calculateTip() {
        const billAmount = parseFloat(billAmountInput.value);
        const tipPercentage = parseFloat(tipPercentageInput.value);
        const numberOfPeople = parseInt(
            numberOfPeopleInput.value,
            10
        );

        const currencySymbol = currencySelect.value;

        if (Number.isNaN(billAmount) || billAmount < 0) {
            alert("Please enter a valid bill amount.");
            billAmountInput.focus();
            return;
        }

        if (
            Number.isNaN(tipPercentage) ||
            tipPercentage < 0
        ) {
            alert("Please enter a valid tip percentage.");
            tipPercentageInput.focus();
            return;
        }

        if (
            Number.isNaN(numberOfPeople) ||
            numberOfPeople < 1
        ) 
        {
            alert("Number of people must be at least 1.");
            numberOfPeopleInput.focus();
            return;
        }




//Link------
        const tipAmount =
            billAmount * (tipPercentage / 100);

        const totalBill =
            billAmount + tipAmount;

        const amountPerPerson =
            totalBill / numberOfPeople;

        tipAmountResult.textContent =
            `${currencySymbol}${tipAmount.toFixed(2)}`;

        totalBillResult.textContent =
            `${currencySymbol}${totalBill.toFixed(2)}`;

        perPersonResult.textContent =
            `${currencySymbol}${amountPerPerson.toFixed(2)}`;
    }

   
    if (currencySelect) {
        currencySelect.addEventListener("change", function () {
            if (billAmountInput.value !== "") {
                calculateTip();
            } else {
                resetTipResults(currencySelect.value);
            }
        });
    }

    if (tipRefreshButton) {
        tipRefreshButton.addEventListener("click", function () {
            billAmountInput.value = "";
            currencySelect.value = "$";
            tipPercentageInput.value = "10";
            tipOptionSelect.value = "10";
            numberOfPeopleInput.value = "1";

            resetTipResults("$");

            billAmountInput.focus();
        });
    }

    function resetTipResults(currencySymbol) {
        tipAmountResult.textContent =
            `${currencySymbol}0.00`;

        totalBillResult.textContent =
            `${currencySymbol}0.00`;

        perPersonResult.textContent =
            `${currencySymbol}0.00`;
    }
