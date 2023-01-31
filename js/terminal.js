import { computer } from "../js/computer.js";

export const terminal = {    
    terminalBody: document.querySelector(".terminal"),
    terminalInput: document.getElementById("terminal-textarea"),
    lines: document.getElementById("terminal-textarea").children,
    lineCounter: 0,
    currentDir: '~',

    commands: {
        cmds() { // show avaliable commands

            terminal.getCurrentLine().innerHTML += "<br>------COMMANDS--------<br> cmds - show this<br> clear - clears the terminal<br> ls - list directories<br> mkdir ...ARGS - create directories<br> whoami - shows the current user";
	    terminal.toggleCursorAnimation();
            terminal.addNewLine();
        },
      
        clear() { // clears the terminal 
	    terminal.toggleCursorAnimation();
            terminal.terminalInput.innerHTML = `<p><span>${terminal.currentDir}$></span></p>`;
            terminal.lineCounter = 0;
	    terminal.toggleCursorAnimation();
        },

        help() { // same as cmds
            this.cmds();
        },

        whoami() { // show the default user
            terminal.getCurrentLine().innerHTML += `<br>default_user<br>`;
	    terminal.toggleCursorAnimation();
            terminal.addNewLine();
        },

	mkdir(args) { // create directories
	    const dirsToCreate = args;
	    const currentDir = computer.getDir(terminal.currentDir);

	    console.log(`Diretorios a serem criados em ${currentDir.name}`, dirsToCreate);

	    for (let dir of dirsToCreate) {
		for (let createdDirs of currentDir.directories) {
		    if (createdDirs.name === dir) { // checking to see if the dir already exists
			terminal.throwError(`error: ${dir} already exists`);
			return;
		    }
		}
		currentDir.directories.push({name: dir, directories: []});
	    }

	    terminal.toggleCursorAnimation();
	    terminal.addNewLine();
	},

	ls() { // list directories
	    const currentDir = computer.getDir(terminal.currentDir);

	    for (let dir of currentDir.directories)  {
		terminal.getCurrentLine().innerHTML += `<br>${dir.name}`;
	    }

	    terminal.toggleCursorAnimation();
	    terminal.addNewLine();
	},

	cd(args) { // change directorie
	    const dirToChange = args[0];

	    if (args.length === 0)  {
		terminal.currentDir = `~`;
		terminal.toggleCursorAnimation();
		terminal.addNewLine();
		return;
	    } else if (args.length > 1) {
		terminal.throwError("error: cd command only accepts one argument");
		return;
	    }
	
	    let currentDir = computer.getDir(terminal.currentDir);
	    currentDir = currentDir.directories;

	    for (let dir of currentDir) {
		if (dirToChange === dir.name) {
		    currentDir = dir;
		}
	    }

	    if (!currentDir.name) { // checking to see if currentDir is undefined
		terminal.throwError(`error: ${dirToChange} doesn't exist`);
		return;

	    } 
	    terminal.currentDir = currentDir.name;
	    terminal.toggleCursorAnimation();
	    terminal.addNewLine();
	}
    },

    execute(input) {

        if (input.name.length < 1) {
            return;
        }
    
        for (let command in this.commands) { // looking if the command exists
            if (input.name === command) { 
                this.commands[input.name](input.arguments); // it exists, so we execute it
                return;
            }
        }

        // if this block is reached, then we show an error to the user

        this.throwError(`${input.name}: command not found`);
    },


    getLines() {
        return this.lines;
    },

    addNewLine() { // Will add new line and increment the lineCounter
        const newLine = document.createElement("p");
        newLine.innerHTML = `<span>${this.currentDir}$></span>`;
        newLine.classList.toggle("blink");
	this.terminalInput.appendChild(newLine);

        this.lineCounter += 1;
    },

    deleteLastChar() {
        const currentLine = this.getCurrentLine();
        if (currentLine.innerHTML.length > 2) currentLine.innerHTML = currentLine.innerHTML.slice(0, currentLine.innerHTML.length - 1);   
    },

    addChar(char) {
        const acceptedKeys = [..."abcdefghijklmnopqrstuvwxyz0123456789-+_=\"\'\\ |,.<>;:/?[]{}ç!@#$%¨&*()"];

        for (let key of acceptedKeys) {
            if (char === key || char === key.toUpperCase()) {
                this.getCurrentLine().innerHTML += char;
            }
        }

        if (char === "Enter") {
            this.execute(this.evaluateCurrentLine());
        } else if (char === "Backspace") {
            this.deleteLastChar();
        }
    },

    getCurrentLine() {
        return this.getLines()[this.lineCounter];
    },

    evaluateCurrentLine() {
        const currentLine = this.getCurrentLine();
        let stringSeparator = currentLine.textContent.indexOf(">");
        let stringToEval = currentLine.textContent.slice(stringSeparator + 1); // removing the "$>" from string
        let cmd, args;
        [cmd, args] = [stringToEval.split(" ")[0], stringToEval.split(" ").slice(1)];
        
        return {name: cmd, arguments: args};
    },

    throwError(errorString) { // when the user types a command that don't exist, this will show
	this.toggleCursorAnimation();
        this.addNewLine();
        this.getCurrentLine().innerHTML = errorString;
	this.toggleCursorAnimation();
        this.addNewLine();
    },

    toggleCursorAnimation() {
	terminal.getCurrentLine().classList.toggle("blink");
    }
};
