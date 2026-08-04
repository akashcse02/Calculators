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