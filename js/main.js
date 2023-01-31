import { keyboard } from "./keyboard.js";
import { terminal } from "./terminal.js";

const charKeys = [...`\"1234567890-+QWERTYUIOP[]\\ASDFGHJKL;~|ZXCVBNM<>`];
const specialKeys = ["Delete", "Tab", "Return", "Caps", "Shift", "LShift", "Ctrl", "FN", "Alt", "Space", "LAlt", "LFn", "LCtrl"];

/* Creating and appending the charKeys to  the keyboard */
for (let key of charKeys) {
    const newKey = keyboard.createKey(key);

    newKey.addEventListener("click", () => {
        terminal.addChar(newKey.innerHTML.toLowerCase());
    });

    keyboard.keyboardHTML.appendChild(newKey);
}

/*  Creating and appending special keys to the keyboard */
for (let key of specialKeys) {
    const newKey = keyboard.createKey(key, true);
    keyboard.keyboardHTML.appendChild(newKey);
}

// handling keyboard input
document.addEventListener("keydown", function (event) {
    const pressedKey = keyboard.getPressedKey(event);
    terminal.addChar(pressedKey);
});
