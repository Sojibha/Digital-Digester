let score = 0;
let remainingItems = 10;
let timer = 20;
let timerInterval = null;
let tickSound = new Audio("tick.mp3"); // Tick-tock sound
let yaySound = new Audio("yay.mp3");   // Yay sound
let awwwSound = new Audio("sad.mp3"); // Awww sound

const wasteItems = [
  { id: "food", src: "apple.png", bin: "food-bin" },
  { id: "plastic", src: "bottle.png", bin: "plastic-bin" },
  { id: "paper", src: "paper.png", bin: "paper-bin" },
];

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text");
  const binId = event.target.closest(".bin").id;

  const feedback = document.getElementById("feedback");

  const correctBin = wasteItems.find(item => item.id === itemId).bin;
  if (binId === correctBin) {
    score += 10;
    feedback.textContent = "Correct! ✔️";
    feedback.style.color = "green";
  } else {
    score -= 5;
    feedback.textContent = "Wrong! ❌";
    feedback.style.color = "red";
  }

  document.getElementById("score").textContent = score;
  document.getElementById("remaining").textContent = --remainingItems;

  const wasteContainer = document.getElementById("waste-container");
  wasteContainer.innerHTML = "";

  if (remainingItems > 0) {
    spawnWasteItem();
  }
}

function spawnWasteItem() {
  const wasteContainer = document.getElementById("waste-container");
  const randomIndex = Math.floor(Math.random() * wasteItems.length);
  const waste = wasteItems[randomIndex];

  const img = document.createElement("img");
  img.id = waste.id;
  img.src = waste.src;
  img.alt = waste.id;
  img.className = "waste-item";
  img.draggable = true;
  img.ondragstart = drag;

  wasteContainer.appendChild(img);
}

function startGame() {
  score = 0;
  remainingItems = 10;
  timer = 20;

  document.getElementById("score").textContent = score;
  document.getElementById("remaining").textContent = remainingItems;
  document.getElementById("timer").textContent = timer;
  document.getElementById("feedback").textContent = "";

  spawnWasteItem();
  document.getElementById("start-btn").disabled = true;

  timerInterval = setInterval(() => {
    if (timer <= 6) {
      tickSound.playbackRate = 2.0;
    } else {
      tickSound.playbackRate = 1.0;
    }

    tickSound.play();
    document.getElementById("timer").textContent = --timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  let message = "";

  if (score >= 90) {
    message = "Excellent! 🌟";
    yaySound.play();
  } else if (score >= 70) {
    message = "Good! 😊";
    yaySound.play();
  } else if (score >= 40) {
    message = "Bad! 😕";
    awwwSound.play();
  } else {
    message = "Terrible! 😢";
    awwwSound.play();
  }

  setTimeout(() => {
    alert(`Game Over!\nYour Score: ${score}\nPerformance: ${message}`);
    location.reload();
  }, 500);
}

// Moving balls generator
function createMovingBalls() {
  const container = document.querySelector(".moving-balls");
  for (let i = 0; i < 20; i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.left = `${Math.random() * 100}vw`;
    ball.style.top = `${Math.random() * 100}vh`;
    ball.style.width = `${Math.random() * 50 + 20}px`;
    ball.style.height = ball.style.width;
    ball.style.animationDuration = `${Math.random() * 10 + 5}s`;
    container.appendChild(ball);
  }
}

// Start floating balls
createMovingBalls();
// Added function to generate moving stars
function createStars() {
    const container = document.querySelector(".star-overlay");
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 5 + 3}s`;
      container.appendChild(star);
    }
  }
  
  // Call the createStars function to add stars
  createStars();
  
