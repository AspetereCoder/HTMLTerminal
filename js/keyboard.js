export const keyboard = {
    keyboardHTML: document.getElementById("keys"),

    getPressedKey(event) {
        if (event.keyCode === 32) event.preventDefault(); // prevents from spacebar scrolling down the page
        return event.key;
    },

    createKey(key, special=false) {
        const button = document.createElement("button");
        button.classList.add("key");
        if (special) button.classList.add("special-key");
        button.setAttribute("id", key.toLowerCase());
        button.innerHTML = key;

        return button;
    }


};