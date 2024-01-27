import { WORDS_LIST } from "./common/constants";
import { addClassesTo, changeClass, removeClassesFrom } from "./common/utils";
import * as _ from "lodash";

type Word = { letters: string; hidden: string, level: string };

class Hangman {
  private loader: HTMLElement;
  private index: number;
  private word: Word;
  private loser: number;
  private winner: number;
  private key: any;
  private maximumAttempts: number;
  private wordText: HTMLElement;
  private levelText: HTMLElement;

  init() {
    console.info("Game started!");
    const head: HTMLElement = document.querySelector("#head");
    const rightArm: HTMLElement = document.querySelector("#right-arm");
    const body: HTMLElement = document.querySelector("#body");
    const rightLeg: HTMLElement = document.querySelector("#right-leg");
    const leftArm: HTMLElement = document.querySelector("#left-arm");
    const leftLeg: HTMLElement = document.querySelector("#left-leg");

    head.classList.add("invisible");
    body.classList.add("invisible");
    rightArm.classList.add("invisible");
    leftArm.classList.add("invisible");
    leftLeg.classList.add("invisible");
    rightLeg.classList.add("invisible");

    this.loader = document.querySelector(".hangman-loader");
    this.initLoad();
    this.index = this.getIndex();
    this.word = WORDS_LIST[this.index];
    this.loser = 0;
    this.winner = 0;
    this.key = null;
    this.maximumAttempts = 5;
    this.wordText = document.getElementById("word");
    this.levelText = document.getElementById("level");

    this.writeWord();
    this.writeKeyword();
    this.attachKeyEvent();
    this.attachChangeWordEvent();
    _.debounce(this.endLoad, 999);
  }

  restart() {
    this.init();
  }

  initLoad() {
    addClassesTo([this.loader], ["is-active"]);
  }
  endLoad() {
    removeClassesFrom([this.loader], ["is-active"]);
  }

  attachKeyEvent() {
    const keyElements = document.querySelectorAll(".key");
  
    keyElements.forEach((keyElement) => {
      keyElement.addEventListener("click", () => {
        this.pressKey(keyElement);
      });
    });
  }
  
  attachChangeWordEvent() {
    const changeWordElement = document.querySelector(".change-word");
  
    changeWordElement.addEventListener("click", () => {
      this.restart();
    });
  }
  

  getIndex() {
    const max = WORDS_LIST.length;
    const min = 0;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  writeWord() {
    this.wordText.innerHTML = "";

    const { letters, hidden, level } = this.word;

    for (let i = 0; i <= letters.length - 1; i++) {
      let letter = letters[i].toUpperCase();

      let visibility = hidden.toUpperCase().includes(letter)
        ? "invisible"
        : "visible";

      this.wordText.innerHTML += `<span class="letter"><span class="${visibility}">${letter}</span></span>`;
    }
    this.levelText.innerHTML = level.toUpperCase();
  }
  writeKeyword() {
    const keyboardContainer = document.querySelector(".keyboard");

    keyboardContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      //let br = i == 73 || i == 82 ? `<br>` : ``;
      let letter = String.fromCharCode(i);
      let status =
        this.word.letters.toUpperCase().includes(letter) &&
        !this.word.hidden.toUpperCase().includes(letter)
          ? "disabled"
          : null;

      const btn = document.createElement("button");
      btn.innerHTML = letter;
      btn.value = letter;
      if (status) {
        btn.setAttribute("disabled", status);
      }
      btn.classList.add("key","shadow","shadow-hover");
  
      keyboardContainer.appendChild(btn);
    }
  }
  pressKey(key: any) {
    key.setAttribute("disabled", "disabled");
    const spans: NodeListOf<HTMLElement> =
      document.querySelectorAll(".letter span");
    let letterIndexes = this.findLetter(key.value);
    letterIndexes.forEach((index: any) => {
      changeClass(spans[index], "invisible", "visible");
    });
    this.key = key;
    this.checkWord();
  }

  findLetter(letter: string) {
    return this.word.letters
      .toUpperCase()
      .split("")
      .map((l: any, k: any) => {
        return l === letter.toUpperCase() ? k : -1;
      })
      .filter((e: number) => e !== -1);
  }

  checkWord() {
    const letters = document.querySelectorAll(".letter span.visible");
    const word = this.word.letters;
    const parts = [
      undefined,
      "#head",
      "#body",
      "#right-arm",
      "#right-leg",
      "#left-arm",
      "#left-leg",
    ];
  
    if (letters.length >= word.length) {
      console.info("You are the winner");
      setTimeout(() => {
        this.restart();
      }, 2000);
      return;
    }
  
    if (this.key && !this.word.letters.toUpperCase().includes(this.key.value)) {
      this.loser++;
      const loserPart:HTMLElement = document.querySelector(parts[this.loser]);
      
      if (loserPart) {
        removeClassesFrom([loserPart], ["invisible"]);
      }
  
      if (this.loser > this.maximumAttempts) {
        alert("You lost!");
        this.restart();
      }
    }
  }
  
}

const game = new Hangman();
game.init();
