let height = 4;
let width = 4;
let row = 0;
let col = 0;

let gameOver = false;

window.onload = async () => {
  // API PART
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  let json = await res.json();
  let { dictionary } = json;
  currentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  currentWord.word = currentWord.word.toUpperCase();

  var word = currentWord.word;
  console.log(word);
  console.log(currentWord.hint);
  // Creating the board
  const initialize = () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let tile = document.createElement("span");
        tile.id = i.toString() + "-" + j.toString();
        tile.classList.add("tile");
        tile.innerText = "";
        document.getElementById("board").appendChild(tile);
      }
    }

    // Listen for key press
    document.addEventListener("keyup", (e) => {
      if (gameOver) return;

      if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
          let currentTile = document.getElementById(
            row.toString() + "-" + col.toString()
          );
          if (currentTile.innerText == "") {
            currentTile.innerText = e.code[3];
            col += 1;
          }
        }
      } else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
          col -= 1;
        }
        let currentTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        currentTile.innerText = "";
      } else if (e.code == "Enter") {
        if (col != width) {
          alert("You must complete the word first");
        } else if (col == width) {
          update();
          row += 1;
          col = 0;
        }
      }

      if (!gameOver && row == height) {
        gameOver = true;
      }
    });
  };
  function update() {
    let correct = 0;
    let letterCount = {};
    for (let i = 0; i < word.length; i++) {
      letter = word[i];
      if (letterCount[letter]) {
        letterCount[letter] += 1;
      } else {
        letterCount[letter] = 1;
      }
    }
    // first iteration,  check all the correct ones
    for (let k = 0; k < width; k++) {
      let currentTile = document.getElementById(
        row.toString() + "-" + k.toString()
      );
      let letter = currentTile.innerText;

      // If it is in correct position
      if (word[k] == letter) {
        currentTile.classList.add("correct");
        correct += 1;
        letterCount[letter] -= 1;
      }
      if (correct == width) {
        gameOver = true;
        const originalDiv = document.getElementById("board");
        const replacementDiv = document.getElementById("imgg");
        originalDiv.style.display = "none";
        replacementDiv.style.display = "block";

        var dive = document.getElementById("right");
        dive.style.display = "block";
        dive.innerText = "You guessed the word " + word + " correctly!!";
      }
    }
    // go again  and mark which ones are present and in what
    for (let k = 0; k < width; k++) {
      let currentTile = document.getElementById(
        row.toString() + "-" + k.toString()
      );
      let letter = currentTile.innerText;

      if (!currentTile.classList.contains("correct")) {
        if (word.includes(letter) && letterCount[letter] > 0) {
          currentTile.classList.add("present");
          letterCount[letter] -= 1;
        } else {
          currentTile.classList.add("absent");
        }
      }
    }
    if (gameOver == false) {
    }
    if (row == 3) {
      var dive = document.getElementById("wrong");
      dive.style.display = "block";
      dive.innerText = "Oops, You missed the word " + word + " and lost!";
    }
  }

  function hintSection() {
    document.getElementById("hintSection").innerHTML = currentWord.hint;
  }

  hintSection();
  initialize();
};

function GoDark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  iii.classList.toggle("dark-mode");
  dark.classList.toggle("dark-mode");
  question.classList.toggle("dark-mode");
}

function toggleDiv() {
  var div = document.getElementById("hintSection");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

function infoButton() {
  var div = document.getElementById("infobox");
  div.classList.toggle("hidden");
  div.style.textAlign = "center";
  var parent = document.getElementById("parent");
  if (parent.style.display == "flex") {
    parent.style.display = "block";
  } else {
    parent.style.display = "flex";
  }
  var divet = document.getElementsByClassName("left");
}
