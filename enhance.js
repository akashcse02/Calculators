/* =====================================================
   Calculators AM — Enhancement Layer (JS)
   Animations, theme, mobile nav, new calculators,
   scientific calculator upgrades (mode/memory/history)
===================================================== */

/* ---------- Page loader ---------- */
window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    if (loader) {
        setTimeout(() => loader.classList.add("loaded"), 350);
    }
    animateStats();
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add("in-view"));
}

/* ---------- Animated stat counters ---------- */
function animateStats() {
    document.querySelectorAll(".home-stats strong[data-count]").forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 900;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    });
}

/* ---------- Toast helper ---------- */
function showToast(message, isError) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle("error", !!isError);
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Ripple effect on buttons ---------- */
document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
});

/* ---------- Result pop animation on any readonly result field ---------- */
function popResult(el) {
    if (!el) return;
    el.classList.remove("result-pop");
    void el.offsetWidth;
    el.classList.add("result-pop");
}

["result", "grade-result", "bmi-result", "pct-result", "age-next-birthday", "conv-result"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new MutationObserver(() => popResult(el));
    observer.observe(el, { attributes: true, attributeFilter: ["value"] });
});

/* ---------- Theme toggle (persisted) ---------- */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("calc-am-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        localStorage.setItem("calc-am-theme", isLight ? "light" : "dark");
    });
}

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
const navOverlay = document.getElementById("nav-overlay");

function closeNav() {
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
    navOverlay.classList.remove("show");
}

if (navToggle && mainNav && navOverlay) {
    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navOverlay.classList.toggle("show", isOpen);
    });

    navOverlay.addEventListener("click", closeNav);
    mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
}

/* ---------- Scroll-spy active nav link ---------- */
const navLinks = document.querySelectorAll(".main-nav a");
const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((a) => a.classList.remove("active"));
                    const link = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
                    if (link) link.classList.add("active");
                }
            });
        },
        { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((sec) => spyObserver.observe(sec));
}

/* ---------- Back to top ---------- */
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =====================================================
   AGE CALCULATOR
===================================================== */
(function ageCalculator() {
    const dobInput = document.getElementById("age-dob");
    const btn = document.getElementById("age-btn");
    const refreshBtn = document.getElementById("age-refresh");
    const grid = document.getElementById("age-result-grid");
    const yearsEl = document.getElementById("age-years");
    const monthsEl = document.getElementById("age-months");
    const daysEl = document.getElementById("age-days");
    const nextBirthdayEl = document.getElementById("age-next-birthday");
    if (!dobInput || !btn) return;

    btn.addEventListener("click", () => {
        if (!dobInput.value) {
            nextBirthdayEl.value = "Please choose your date of birth.";
            grid.hidden = true;
            return;
        }
        const dob = new Date(dobInput.value);
        const today = new Date();

        if (dob > today) {
            nextBirthdayEl.value = "Date of birth cannot be in the future.";
            grid.hidden = true;
            return;
        }

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        yearsEl.textContent = years;
        monthsEl.textContent = months;
        daysEl.textContent = days;
        grid.hidden = false;

        let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        if (next < today) next.setFullYear(today.getFullYear() + 1);
        const diffDays = Math.ceil((next - today) / (1000 * 60 * 60 * 24));

        nextBirthdayEl.value =
            diffDays === 0 ? "🎉 Happy Birthday today!" : `${diffDays} day(s) until your next birthday`;
    });

    dobInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") btn.click();
    });

    refreshBtn.addEventListener("click", () => {
        dobInput.value = "";
        nextBirthdayEl.value = "";
        grid.hidden = true;
    });
})();

/* =====================================================
   PERCENTAGE CALCULATOR
===================================================== */
(function percentageCalculator() {
    const xInput = document.getElementById("pct-x");
    const yInput = document.getElementById("pct-y");
    const calcBtn = document.getElementById("pct-calculate");
    const refreshBtn = document.getElementById("pct-refresh");
    const resultEl = document.getElementById("pct-result");
    const tabs = document.querySelectorAll('.Percentage-calculator .tab-btn');
    if (!calcBtn) return;

    let mode = "of";
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            mode = tab.dataset.mode;
            const placeholders = {
                of: ["X (percentage)", "Y (of this number)"],
                is: ["X (this value)", "Y (out of this total)"],
                change: ["Old value", "New value"],
            };
            xInput.placeholder = placeholders[mode][0];
            yInput.placeholder = placeholders[mode][1];
        });
    });

    calcBtn.addEventListener("click", () => {
        const x = parseFloat(xInput.value);
        const y = parseFloat(yInput.value);

        if (Number.isNaN(x) || Number.isNaN(y)) {
            resultEl.value = "Please enter both numbers.";
            return;
        }

        let text = "";
        if (mode === "of") {
            const val = (x / 100) * y;
            text = `${x}% of ${y} = ${val.toFixed(4).replace(/\.?0+$/, "")}`;
        } else if (mode === "is") {
            if (y === 0) {
                text = "Y cannot be zero.";
            } else {
                const val = (x / y) * 100;
                text = `${x} is ${val.toFixed(2)}% of ${y}`;
            }
        } else {
            if (x === 0) {
                text = "Old value cannot be zero.";
            } else {
                const val = ((y - x) / x) * 100;
                const dir = val >= 0 ? "increase" : "decrease";
                text = `${Math.abs(val).toFixed(2)}% ${dir} (from ${x} to ${y})`;
            }
        }
        resultEl.value = text;
    });

    refreshBtn.addEventListener("click", () => {
        xInput.value = "";
        yInput.value = "";
        resultEl.value = "";
    });
})();

/* =====================================================
   UNIT CONVERTER
===================================================== */
(function unitConverter() {
    const valueInput = document.getElementById("conv-value");
    const fromSelect = document.getElementById("conv-from");
    const toSelect = document.getElementById("conv-to");
    const resultEl = document.getElementById("conv-result");
    const refreshBtn = document.getElementById("conv-refresh");
    const tabs = document.querySelectorAll('.Converter-calculator .tab-btn');
    if (!valueInput) return;

    const units = {
        length: {
            m: { label: "Meters (m)", toBase: 1 },
            km: { label: "Kilometers (km)", toBase: 1000 },
            cm: { label: "Centimeters (cm)", toBase: 0.01 },
            mm: { label: "Millimeters (mm)", toBase: 0.001 },
            mi: { label: "Miles (mi)", toBase: 1609.344 },
            yd: { label: "Yards (yd)", toBase: 0.9144 },
            ft: { label: "Feet (ft)", toBase: 0.3048 },
            in: { label: "Inches (in)", toBase: 0.0254 },
        },
        weight: {
            kg: { label: "Kilograms (kg)", toBase: 1 },
            g: { label: "Grams (g)", toBase: 0.001 },
            mg: { label: "Milligrams (mg)", toBase: 0.000001 },
            lb: { label: "Pounds (lb)", toBase: 0.45359237 },
            oz: { label: "Ounces (oz)", toBase: 0.028349523 },
            ton: { label: "Metric Ton (t)", toBase: 1000 },
        },
        temperature: {
            c: { label: "Celsius (°C)" },
            f: { label: "Fahrenheit (°F)" },
            k: { label: "Kelvin (K)" },
        },
    };

    let category = "length";

    function populateSelects() {
        const opts = Object.entries(units[category])
            .map(([key, u]) => `<option value="${key}">${u.label}</option>`)
            .join("");
        fromSelect.innerHTML = opts;
        toSelect.innerHTML = opts;
        if (toSelect.options.length > 1) toSelect.selectedIndex = 1;
        convert();
    }

    function convert() {
        const value = parseFloat(valueInput.value);
        if (Number.isNaN(value)) {
            resultEl.value = "";
            return;
        }
        const from = fromSelect.value;
        const to = toSelect.value;

        if (category === "temperature") {
            resultEl.value = convertTemperature(value, from, to).toFixed(4).replace(/\.?0+$/, "");
            return;
        }

        const base = value * units[category][from].toBase;
        const result = base / units[category][to].toBase;
        resultEl.value = result.toFixed(6).replace(/\.?0+$/, "");
    }

    function convertTemperature(value, from, to) {
        let celsius;
        if (from === "c") celsius = value;
        else if (from === "f") celsius = (value - 32) * (5 / 9);
        else celsius = value - 273.15;

        if (to === "c") return celsius;
        if (to === "f") return celsius * (9 / 5) + 32;
        return celsius + 273.15;
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            category = tab.dataset.unit;
            populateSelects();
        });
    });

    [valueInput, fromSelect, toSelect].forEach((el) => el.addEventListener("input", convert));

    refreshBtn.addEventListener("click", () => {
        valueInput.value = "";
        resultEl.value = "";
        populateSelects();
    });

    populateSelects();
})();

/* =====================================================
   LOAN / EMI CALCULATOR
===================================================== */
(function loanCalculator() {
    const principalInput = document.getElementById("loan-principal");
    const rateInput = document.getElementById("loan-rate");
    const tenureInput = document.getElementById("loan-tenure");
    const calcBtn = document.getElementById("loan-calculate");
    const refreshBtn = document.getElementById("loan-refresh");
    const emiEl = document.getElementById("loan-emi-result");
    const interestEl = document.getElementById("loan-interest-result");
    const totalEl = document.getElementById("loan-total-result");
    if (!calcBtn) return;

    calcBtn.addEventListener("click", () => {
        const principal = parseFloat(principalInput.value);
        const annualRate = parseFloat(rateInput.value);
        const years = parseFloat(tenureInput.value);

        if (Number.isNaN(principal) || principal <= 0) {
            showToast("Enter a valid loan amount", true);
            return;
        }
        if (Number.isNaN(annualRate) || annualRate < 0) {
            showToast("Enter a valid interest rate", true);
            return;
        }
        if (Number.isNaN(years) || years <= 0) {
            showToast("Enter a valid tenure", true);
            return;
        }

        const months = years * 12;
        const monthlyRate = annualRate / 12 / 100;

        let emi;
        if (monthlyRate === 0) {
            emi = principal / months;
        } else {
            emi =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);
        }

        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        emiEl.textContent = emi.toFixed(2);
        interestEl.textContent = totalInterest.toFixed(2);
        totalEl.textContent = totalPayment.toFixed(2);

        [emiEl, interestEl, totalEl].forEach(popResult);
    });

    refreshBtn.addEventListener("click", () => {
        principalInput.value = "";
        rateInput.value = "";
        tenureInput.value = "";
        emiEl.textContent = "0.00";
        interestEl.textContent = "0.00";
        totalEl.textContent = "0.00";
    });
})();

/* =====================================================
   SCIENTIFIC CALCULATOR UPGRADES
   (mode cycling DEG/RAD/GRAD, memory, factorial,
   nPr/nCr, hyperbolic, history, keyboard support)
===================================================== */
(function scientificUpgrades() {
    const exDisplay = document.getElementById("ex-display");
    if (!exDisplay || typeof window.calculateEx !== "function") return;

    let memoryValue = 0;
    let history = [];

    /* ---- Mode: cycle DEG -> RAD -> GRAD ----
       NOTE: `angleMode` is declared with `let` at the top level of
       script.js. Classic (non-module) <script> tags share one global
       lexical scope, so referencing the bare identifier here mutates
       the SAME variable script.js's updateStatus()/toRad()/toDeg()
       already read — do not use window.angleMode, it would be a
       different, disconnected value. */
    window.toggleMode = function () {
        const order = ["DEG", "RAD", "GRAD"];
        const idx = order.indexOf(angleMode);
        angleMode = order[(idx + 1) % order.length];
        if (typeof updateStatus === "function") updateStatus();
    };

    // Extend toRad/toDeg to support GRAD (still reading the shared `angleMode`)
    window.toRad = function (x) {
        if (angleMode === "DEG") return (x * Math.PI) / 180;
        if (angleMode === "GRAD") return (x * Math.PI) / 200;
        return x;
    };
    window.toDeg = function (x) {
        if (angleMode === "DEG") return (x * 180) / Math.PI;
        if (angleMode === "GRAD") return (x * 200) / Math.PI;
        return x;
    };

    /* ---- Extra math functions (exposed globally for the eval-based engine) ---- */
    window.sinh = (x) => Math.sinh(x);
    window.cosh = (x) => Math.cosh(x);
    window.tanh = (x) => Math.tanh(x);

    function factorial(n) {
        n = Math.round(n);
        if (n < 0) throw new Error("Math Error");
        if (n > 170) throw new Error("Overflow");
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }
    window.factorial = factorial;

    window.nPr = (n, r) => factorial(n) / factorial(n - r);
    window.nCr = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));

    /* ---- Memory ---- */
    function updateMemoryIndicator() {
        const el = document.getElementById("memory-indicator");
        if (el) el.textContent = memoryValue !== 0 ? "M" : "";
    }

    window.memoryClear = function () {
        memoryValue = 0;
        updateMemoryIndicator();
    };
    window.memoryRecall = function () {
        window.insertVal(String(memoryValue));
    };
    window.memoryAdd = function () {
        const val = parseFloat(exDisplay.value);
        if (!Number.isNaN(val)) memoryValue += val;
        updateMemoryIndicator();
    };
    window.memorySub = function () {
        const val = parseFloat(exDisplay.value);
        if (!Number.isNaN(val)) memoryValue -= val;
        updateMemoryIndicator();
    };

    /* ---- History panel ---- */
    const historyPanel = document.getElementById("history-panel");
    const historyList = document.getElementById("history-list");
    const historyClearBtn = document.getElementById("history-clear");

    window.toggleHistory = function () {
        historyPanel.classList.toggle("open");
    };

    function renderHistory() {
        if (!historyList) return;
        if (history.length === 0) {
            historyList.innerHTML = '<li class="history-empty">No calculations yet</li>';
            return;
        }
        historyList.innerHTML = history
            .slice()
            .reverse()
            .map(
                (h) =>
                    `<li data-eq="${h.result}"><span class="h-expr">${h.expr}</span><span class="h-eq">= ${h.result}</span></li>`
            )
            .join("");

        historyList.querySelectorAll("li[data-eq]").forEach((li) => {
            li.addEventListener("click", () => {
                exDisplay.value = li.dataset.eq;
            });
        });
    }

    if (historyClearBtn) {
        historyClearBtn.addEventListener("click", () => {
            history = [];
            renderHistory();
        });
    }

    /* ---- Wrap calculateEx to support factorial (N!) and push into history ---- */
    const originalCalculateEx = window.calculateEx;
    window.calculateEx = function () {
        const expr = exDisplay.value;
        // Convert simple postfix factorial like "5!" or "12.0!" into factorial(5)
        if (/!/.test(exDisplay.value)) {
            exDisplay.value = exDisplay.value.replace(/(\d+(?:\.\d+)?)!/g, "factorial($1)");
        }
        originalCalculateEx();
        const resultLine = document.getElementById("ex-history-line");
        if (expr.trim() !== "" && !exDisplay.value.toLowerCase().includes("error")) {
            history.push({ expr, result: exDisplay.value });
            if (history.length > 30) history.shift();
            renderHistory();
            if (resultLine) resultLine.textContent = expr + " =";
            popResult(exDisplay);
        }
    };

    /* ---- Keyboard support ---- */
    document.addEventListener("keydown", (e) => {
        const scientificSection = document.getElementById("scientific");
        if (!scientificSection) return;
        const rect = scientificSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        const key = e.key;
        if (/^[0-9.]$/.test(key)) {
            window.insertVal(key);
        } else if (key === "+" || key === "-") {
            window.insertVal(key === "+" ? "+" : "-");
        } else if (key === "*") {
            window.insertVal("×");
        } else if (key === "/") {
            e.preventDefault();
            window.insertVal("÷");
        } else if (key === "(" || key === ")") {
            window.insertVal(key);
        } else if (key === "Enter" || key === "=") {
            e.preventDefault();
            window.calculateEx();
        } else if (key === "Backspace") {
            window.deleteChar();
        } else if (key === "Escape") {
            window.clearAll();
        }
    });
})();
