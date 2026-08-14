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

    //------------------=================----------------------
// Advanced Scientific Calculator Logic (Casio fx-991EX PRO)

let exDisplay = document.getElementById('ex-display');
let isShift = false;
let isAlpha = false;
let angleMode = 'DEG';
let lastAns = 0;

function updateStatus() {
    document.getElementById('shift-indicator').textContent = isShift ? 'S' : '';
    document.getElementById('alpha-indicator').textContent = isAlpha ? 'A' : '';
    document.getElementById('mode-indicator').textContent = angleMode;
}

function toggleShift() { isShift = !isShift; isAlpha = false; updateStatus(); }
function toggleAlpha() { isAlpha = !isAlpha; isShift = false; updateStatus(); }
function toggleMode() { angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG'; updateStatus(); }

function handleFunc(normalVal, shiftVal) {
    if (isShift) {
        insertVal(shiftVal);
        isShift = false;
        updateStatus();
    } else if (isAlpha && normalVal === ')') {
        insertVal('x');
        isAlpha = false;
        updateStatus();
    } else {
        insertVal(normalVal);
    }
}

function insertVal(val) { if (exDisplay) exDisplay.value += val; }
function clearAll() { if (exDisplay) exDisplay.value = ''; isShift = false; isAlpha = false; updateStatus(); }
function deleteChar() { if (exDisplay) exDisplay.value = exDisplay.value.slice(0, -1); }

// Math Wrappers for DEG/RAD support
function toRad(x) { return angleMode === 'DEG' ? x * (Math.PI / 180) : x; }
function toDeg(x) { return angleMode === 'DEG' ? x * (180 / Math.PI) : x; }

window.sin = function(x) { return parseFloat(Math.sin(toRad(x)).toFixed(10)); }
window.cos = function(x) { return parseFloat(Math.cos(toRad(x)).toFixed(10)); }
window.tan = function(x) { 
    if(angleMode === 'DEG' && x % 180 === 90) throw new Error("Math Error"); 
    return parseFloat(Math.tan(toRad(x)).toFixed(10)); 
}
window.asin = function(x) { return toDeg(Math.asin(x)); }
window.acos = function(x) { return toDeg(Math.acos(x)); }
window.atan = function(x) { return toDeg(Math.atan(x)); }
window.log = function(x) { return Math.log10(x); }
window.ln = function(x) { return Math.log(x); }
window.sqrt = function(x) { return Math.sqrt(x); }
window.cbrt = function(x) { return Math.cbrt(x); }

// Matrix Functions (2x2 and 3x3)
window.det = function(m) {
    if(m.length === 4) return m[0]*m[3] - m[1]*m[2];
    if(m.length === 9) return m[0]*(m[4]*m[8]-m[5]*m[7]) - m[1]*(m[3]*m[8]-m[5]*m[6]) + m[2]*(m[3]*m[7]-m[4]*m[6]);
    throw new Error("Dim Error");
}
window.inv = function(m) {
    if(m.length === 4) {
        let d = window.det(m);
        if(d === 0) throw new Error("Math Error");
        return [ m[3]/d, -m[1]/d, -m[2]/d, m[0]/d ];
    }
    throw new Error("Dim Error");
}

function calculateEx() {
    if (!exDisplay) return;
    try {
        let eq = exDisplay.value;
        if(eq.trim() === '') return;

        eq = eq.replace(/Ans/g, lastAns);
        eq = eq.replace(/π/g, 'Math.PI');
        eq = eq.replace(/e\^/g, 'Math.exp(');
        eq = eq.replace(/10\^/g, '10**');
        eq = eq.replace(/×10\^/g, '*10**');
        eq = eq.replace(/x²/g, '**2');
        eq = eq.replace(/\^/g, '**');
        eq = eq.replace(/×/g, '*');
        eq = eq.replace(/÷/g, '/');
        
        eq = eq.replace(/\{/g, '[').replace(/\}/g, ']');

        let result = eval(eq);
        
        if (Array.isArray(result)) {
            result = result.map(n => Number.isInteger(n) ? n : parseFloat(n.toFixed(4)));
            exDisplay.value = '[' + result.join(', ') + ']';
        } else if (result !== undefined && !Number.isNaN(result)) {
            result = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
            lastAns = result;
            exDisplay.value = result;
        } else {
            throw new Error("Math Error");
        }
    } catch (e) {
        exDisplay.value = e.message.includes("Error") ? e.message : 'Syntax Error';
    }
}
//------------------=================----------------------
// BMI Calculator

const bmiWeightInput = document.getElementById("bmi-weight");
const bmiHeightInput = document.getElementById("bmi-height");
const bmiBtn = document.getElementById("bmi-btn");
const bmiResult = document.getElementById("bmi-result");
const bmiCategory = document.getElementById("bmi-category");
const bmiRefreshBtn = document.getElementById("bmi-refresh");

bmiBtn.addEventListener("click", () => {
    const weight = parseFloat(bmiWeightInput.value);
    const heightCm = parseFloat(bmiHeightInput.value);

    // ইনপুট ভ্যালিডেশন চেক
    if (Number.isNaN(weight) || weight <= 0 || Number.isNaN(heightCm) || heightCm <= 0) {
        bmiResult.value = "Please enter valid numbers.";
        bmiCategory.value = "";
        bmiCategory.style.color = "initial";
        return;
    }

    // Height সেন্টিমিটার থেকে মিটারে কনভার্ট করা
    const heightM = heightCm / 100;
    
    // BMI ফর্মুলা: Weight (kg) / Height (m)²
    const bmi = (weight / (heightM * heightM)).toFixed(2);

    bmiResult.value = `Your BMI: ${bmi}`;

    let category = "";
    let color = "";

    // BMI ক্যাটাগরি এবং কালার সেট করা
    if (bmi < 18.5) {
        category = "Underweight";
        color = "#ff9800"; // Orange
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal Weight";
        color = "#4caf50"; // Green
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        color = "#ff9800"; // Orange
    } else {
        category = "Obesity";
        color = "#f44336"; // Red
    }

    bmiCategory.value = `Category: ${category}`;
    bmiCategory.style.color = color;
    bmiCategory.style.fontWeight = "bold";
});

// BMI Calculator Refresh
bmiRefreshBtn.addEventListener("click", () => {
    bmiWeightInput.value = "";
    bmiHeightInput.value = "";
    bmiResult.value = "";
    
    bmiCategory.value = "";
    bmiCategory.style.color = "initial";
    
    bmiWeightInput.focus();
});

//------------------=================----------------------
// Weather Calculator (No API Key Required + Auto Suggestion)

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const suggestionsList = document.getElementById("suggestions-list");
const weatherResult = document.getElementById("weather-result");
const weatherError = document.getElementById("weather-error");

const cityNameEl = document.getElementById("city-name");
const weatherDateEl = document.getElementById("weather-date");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const weatherDescEl = document.getElementById("weather-desc");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const pressureEl = document.getElementById("pressure");

let debounceTimer;
let selectedLocation = null;

// WMO Weather Codes Mapping
const weatherCodes = {
    0: { desc: "Clear Sky", icon: "01d" },
    1: { desc: "Mainly Clear", icon: "02d" },
    2: { desc: "Partly Cloudy", icon: "03d" },
    3: { desc: "Overcast", icon: "04d" },
    45: { desc: "Fog", icon: "50d" },
    48: { desc: "Depositing Rime Fog", icon: "50d" },
    51: { desc: "Light Drizzle", icon: "09d" },
    53: { desc: "Moderate Drizzle", icon: "09d" },
    55: { desc: "Dense Drizzle", icon: "09d" },
    61: { desc: "Slight Rain", icon: "10d" },
    63: { desc: "Moderate Rain", icon: "10d" },
    65: { desc: "Heavy Rain", icon: "10d" },
    71: { desc: "Slight Snow Fall", icon: "13d" },
    73: { desc: "Moderate Snow Fall", icon: "13d" },
    75: { desc: "Heavy Snow Fall", icon: "13d" },
    95: { desc: "Thunderstorm", icon: "11d" }
};

// 1. Fetch City Suggestions
cityInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        suggestionsList.classList.add("hidden");
        return;
    }

    debounceTimer = setTimeout(async () => {
        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`);
            const data = await res.json();
            
            if (data.results && data.results.length > 0) {
                showSuggestions(data.results);
            } else {
                suggestionsList.classList.add("hidden");
            }
        } catch (err) {
            console.error("Error fetching cities", err);
        }
    }, 500);
});

// 2. Show Suggestions Dropdown
function showSuggestions(results) {
    suggestionsList.innerHTML = "";
    results.forEach(place => {
        const li = document.createElement("li");
        const countryName = place.country ? `, ${place.country}` : "";
        li.textContent = `${place.name}${countryName}`;
        
        li.addEventListener("click", () => {
            cityInput.value = li.textContent;
            suggestionsList.classList.add("hidden");
            selectedLocation = {
                name: li.textContent,
                lat: place.latitude,
                lon: place.longitude
            };
            getWeather(selectedLocation.lat, selectedLocation.lon, selectedLocation.name);
        });
        
        suggestionsList.appendChild(li);
    });
    suggestionsList.classList.remove("hidden");
}

// Hide suggestion list when clicking outside
document.addEventListener("click", (e) => {
    if (!cityInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.classList.add("hidden");
    }
});

// 3. Fetch Actual Weather Data
async function getWeather(lat, lon, displayName) {
    weatherResult.classList.add("hidden");
    weatherError.classList.add("hidden");

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m`;
        const res = await fetch(url);
        const data = await res.json();
        
        updateWeatherUI(data.current, displayName);
    } catch (err) {
        weatherError.classList.remove("hidden");
    }
}

// 4. Update the UI with real data
function updateWeatherUI(current, displayName) {
    cityNameEl.textContent = displayName;
    
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    weatherDateEl.textContent = new Date().toLocaleDateString('en-US', options);

    const weatherInfo = weatherCodes[current.weather_code] || { desc: "Unknown", icon: "02d" };
    
    weatherIconEl.src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
    temperatureEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    weatherDescEl.textContent = weatherInfo.desc;

    feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}°C`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windSpeedEl.textContent = `${current.wind_speed_10m.toFixed(1)} km/h`;
    pressureEl.textContent = `${current.surface_pressure} hPa`;

    weatherResult.classList.remove("hidden");
}

// Search button click (fallback if user doesn't click suggestion)
searchBtn.addEventListener("click", () => {
    if (selectedLocation && cityInput.value === selectedLocation.name) {
        getWeather(selectedLocation.lat, selectedLocation.lon, selectedLocation.name);
    } else {
        // If user just typed and clicked search without selecting from list
        cityInput.dispatchEvent(new Event('input'));
    }
});