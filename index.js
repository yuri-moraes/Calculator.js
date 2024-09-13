var _a, _b, _c, _d;
// Selecionando elementos do DOM com tipos apropriados
var main = document.querySelector("main");
var root = document.querySelector(":root");
var input = document.getElementById("input");
var resultInput = document.getElementById("result");
// Definindo o array com as teclas permitidas
var allowedKeys = [
    "(",
    ")",
    "/",
    "*",
    "-",
    "+",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "0",
    ".",
    "%",
    " ",
];
document.querySelectorAll(".charkey").forEach(function (charKeyBtn) {
    var button = charKeyBtn;
    button.addEventListener("click", function () {
        var value = button.dataset.value;
        input.value += value || "";
    });
});
// Evento para o botão Clear
(_a = document.getElementById("clear")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    input.value = "";
    input.focus();
    resultInput.classList.remove("error");
    resultInput.value = "";
});
input.addEventListener("keydown", function (ev) {
    ev.preventDefault();
    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key;
        return;
    }
    else if (ev.key === "Backspace") {
        input.value = input.value.slice(0, -1);
    }
    if (ev.key === "Enter") {
        calculate();
    }
});
(_b = document.getElementById("equal")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", calculate);
function calculate() {
    try {
        var result = eval(input.value);
        resultInput.value = result;
        resultInput.classList.remove("error");
    }
    catch (_a) {
        resultInput.value = "ERROR";
        resultInput.classList.add("error");
    }
}
// Evento para copiar o resultado para o clipboard
(_c = document.getElementById("copyToClipboard")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (ev) {
    var button = ev.currentTarget;
    if (button.innerText === "Copy") {
        button.innerText = "Copied!";
        button.classList.add("success");
        navigator.clipboard.writeText(resultInput.value);
    }
    else {
        button.innerText = "Copy";
        button.classList.remove("success");
    }
});
// Evento para alternar o tema
(_d = document.getElementById("themeSwitcher")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    if (main.dataset.theme === "dark") {
        root.style.setProperty("--bg-color", "#f1f5f9");
        root.style.setProperty("--border-color", "#666");
        root.style.setProperty("--font-color", "#212529");
        root.style.setProperty("--primary-color", "#26834a");
        main.dataset.theme = "light";
    }
    else {
        root.style.setProperty("--bg-color", "#212529");
        root.style.setProperty("--border-color", "#666");
        root.style.setProperty("--font-color", "#f1f5f9");
        root.style.setProperty("--primary-color", "#4dff91");
        main.dataset.theme = "dark";
    }
});
