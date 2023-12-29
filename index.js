const character = document.getElementById("character");
const count = document.getElementById("count");
const start = document.getElementById("start");
const level = document.getElementById("level");
const container = document.querySelector(".global");
const waitscreen = document.querySelector(".waitscreen");

let egirlDied = 0;
let mouseX = container.clientWidth / 2;
let vitess = 0.8;
let numbObstacles = 6;
let lvl = 1;
let isAttacking = false;

// EVENTS

start.addEventListener("click", () => {
  waitscreen.style.display = "none";
});

document.addEventListener("click", () => createRocket());

container.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  moveCharacter();
});

// END EVENTS

const createObstacle = (number) => {
  for (let i = 0; i < number; i++) {
    const choseImg = randNum();
    const obstacle = document.createElement("img");
    obstacle.className = "obstacle no-outline";
    obstacle.src = choseImg === 1 ? "./img/egirl.png" : "./img/egirl2.png";
    obstacle.style.position = "absolute";
    obstacle.style.left = `${Math.floor(
      Math.random() * (container.clientWidth - 20)
    )}px`;
    obstacle.style.top = `${Math.floor(
      Math.random() * (container.clientHeight / 3)
    )}px`;
    obstacle.direction = Math.random() < 0.5 ? 1 : -1;

    container.appendChild(obstacle);
  }
};

const moveObstacles = () => {
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();

    obstacle.style.left =
      obstacleRect.left + obstacle.direction * vitess + "px";

    if (obstacleRect.left > container.clientWidth && obstacle.direction === 1) {
      obstacle.style.left = -10 + "px";
    } else if (obstacleRect.right < -10 && obstacle.direction === -1) {
      obstacle.style.left = container.clientWidth + "px";
    }
  });
  requestAnimationFrame(moveObstacles);
};

const createRocket = () => {
  const rocket = document.createElement("div");
  rocket.className = "rocket";
  const characterRect = character.getBoundingClientRect();
  rocket.style.left = mouseX + "px";
  rocket.style.top = characterRect.top + "px";
  container.appendChild(rocket);

  const moveRocket = () => {
    const rocketRect = rocket.getBoundingClientRect();
    const newY = rocketRect.top - 15;

    if (newY >= 0) {
      rocket.style.top = newY + "px";

      const obstacles = document.querySelectorAll(".obstacle");
      obstacles.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          rocketRect.left < obstacleRect.right &&
          rocketRect.right > obstacleRect.left &&
          rocketRect.top < obstacleRect.bottom &&
          rocketRect.bottom > obstacleRect.top
        ) {
          container.removeChild(obstacle);
          container.removeChild(rocket);
          egirlDied += 1;
          count.textContent = egirlDied;
          createObstacle(1);
          checkLvlUp();
        }
      });
      if (container.contains(rocket)) {
        requestAnimationFrame(moveRocket);
      }
    } else {
      container.removeChild(rocket);
    }
  };
  moveRocket();
};

// UTILS FUNCTIONS

const lvlUp = () => {
  lvl += 1;
  level.textContent = lvl;
  const obstacles = document.querySelectorAll(".obstacle");
  obstacles.forEach((obstacle) => {
    container.removeChild(obstacle);
  });
  createObstacle(numbObstacles);
  console.log('coucouuuu')
};

const checkLvlUp = () => {
  if (egirlDied === 10) {
    numbObstacles = 8;
    isAttacking = true;
    lvlUp();
  }
  if (egirlDied === 30) {
    numbObstacles = 10;
    vitess = 0.9;
    lvlUp();
  }
  if (egirlDied === 50) {
    numbObstacles = 12;
    vitess = 1.2;
    lvlUp();
  }
  if (egirlDied === 70) {
    numbObstacles = 14;
    vitess = 1.6;
    lvlUp();
  }
};

const randNum = () => {
  return Math.floor(Math.random() * 2) + 1;
};

const moveCharacter = () => {
  character.style.left = mouseX + "px";
};

// SETUP

createObstacle(numbObstacles);
moveObstacles();
