const character = document.getElementById("character");
const count = document.getElementById("count");
const start = document.getElementById("start");
const container = document.querySelector(".global");
const waitscreen = document.querySelector(".waitscreen");

let egirlDied = 0;
let mouseX = container.clientWidth / 2;
let vitess = 0.8;

start.addEventListener("click", () => {
  waitscreen.style.display = "none";
});

document.addEventListener("click", () => createRocket());

container.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  moveCharacter();
});

const randNum = () => {
  return Math.floor(Math.random() * 2) + 1;
};

const createObstacle = (number) => {
  for (let i = 0; i < number; i++) {
    const choseImg = randNum();
    const obstacle = document.createElement("img");
    obstacle.className = "obstacle no-outline";
    obstacle.src = choseImg === 1 ? "./img/egirl.png" : "./img/egirl2.png";
    obstacle.style.position = "absolute";
    obstacle.style.left = `${Math.floor(Math.random() * (container.clientWidth - 20))}px`;
    obstacle.style.top = `${Math.floor(Math.random() * (container.clientHeight / 3))}px`;

    // Ajouter la propriété direction à l'obstacle (1 pour droite, -1 pour gauche)
    obstacle.direction = Math.random() < 0.5 ? 1 : -1;

    container.appendChild(obstacle);
  }
};

createObstacle(7);

const moveObstacles = () => {
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();

    obstacle.style.left = obstacleRect.left + obstacle.direction * vitess + "px";

    if (obstacleRect.left > container.clientWidth && obstacle.direction === 1) {
      obstacle.style.left = -10 + "px";
    } else if (obstacleRect.right < -10 && obstacle.direction === -1) {
      obstacle.style.left = container.clientWidth + "px";
    }
  });

  requestAnimationFrame(moveObstacles);
};

moveObstacles();

const moveCharacter = () => {
  character.style.left = mouseX + "px";
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
