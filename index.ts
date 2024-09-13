// Selecionando elementos do DOM com tipos apropriados
const main = document.querySelector("main") as HTMLElement;
const root = document.querySelector(":root") as HTMLElement;
const input = document.getElementById("input") as HTMLInputElement;
const resultInput = document.getElementById("result") as HTMLInputElement;

// Definindo o array com as teclas permitidas
const allowedKeys: string[] = [
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
  const button = charKeyBtn as HTMLButtonElement;
  button.addEventListener("click", function () {
    const value = button.dataset.value;
    input.value += value || "";
  });
});

// Evento para o botão Clear
document.getElementById("clear")?.addEventListener("click", function () {
  input.value = "";
  input.focus();
  resultInput.classList.remove("error");
  resultInput.value = "";
});

input.addEventListener("keydown", function (ev: KeyboardEvent) {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  } else if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
  }
});

document.getElementById("equal")?.addEventListener("click", calculate);

function calculate() {
  try {
    const result = eval(input.value);
    resultInput.value = result;
    resultInput.classList.remove("error");
  } catch {
    resultInput.value = "ERROR";
    resultInput.classList.add("error");
  }
}

// Evento para copiar o resultado para o clipboard
document.getElementById("copyToClipboard")?.addEventListener("click", (ev) => {
  const button = ev.currentTarget as HTMLButtonElement;
  if (button.innerText === "Copy") {
    button.innerText = "Copied!";
    button.classList.add("success");
    navigator.clipboard.writeText(resultInput.value);
  } else {
    button.innerText = "Copy";
    button.classList.remove("success");
  }
});

// Evento para alternar o tema
document.getElementById("themeSwitcher")?.addEventListener("click", () => {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
