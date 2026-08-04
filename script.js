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

