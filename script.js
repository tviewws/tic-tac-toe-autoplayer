// automated "o" character player

let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable all buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (for new game and restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable popup
  popupRef.classList.add("hide");
};

// Function that is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  // Use uppercase "X" and "O"
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// Automated 'O' player
const computerPlayer = () => {
  if (!xTurn) {
    // Randomly select an empty button for 'O'
    let emptyButtons = Array.from(btnRef).filter((element) => element.innerText === "");
    if (emptyButtons.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyButtons.length);
      const selectedButton = emptyButtons[randomIndex];
      selectedButton.innerText = "O";
      selectedButton.disabled = true;
      xTurn = true; // Switch back to 'X' after 'O' move
      count += 1;
      winChecker();
    }
  }
};

// New game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Win logic
const winChecker = () => {
  // Looping through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    // Checking if elements are filled
    // If 3 empty elements are the same and would give a win
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        // If all 3 buttons have the same values, then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.disabled = true;
      count += 1;
      winChecker();
      // Call the computerPlayer function after 'X' move
      computerPlayer();
    }
  });
});

// Enable buttons and disable popup on page load
window.onload = enableButtons;
