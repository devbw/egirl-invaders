const character = document.getElementById("character");
const count = document.getElementById("count");
const start = document.getElementById("start");
const container = document.querySelector(".global");
const waitscreen = document.querySelector(".waitscreen");

let egirlDied = 0;

start.addEventListener("click", () => {
  waitscreen.style.display = "none";
})

let mouseX = container.clientWidth / 2;

document.addEventListener("click", () => createRocket());

const randNum = () => {
  return Math.floor(Math.random() * 2) + 1;
}

const createObstacle = (number) => {
  for (let i = 0; i < number; i++) {
    const choseImg = randNum();
    const obstacle = document.createElement('img');
    obstacle.className = 'obstacle';
    obstacle.src = choseImg === 1 ? './img/egirl.png' : './img/egirl2.png';
    obstacle.style.position = 'absolute';
    obstacle.style.left = `${Math.floor(Math.random() * (container.clientWidth - 20))}px`;
    obstacle.style.top = `${Math.floor(Math.random() * (container.clientHeight / 3))}px`;
    container.appendChild(obstacle);
  }
}

createObstacle(6)

container.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  moveCharacter();
});

const moveCharacter = () => {
  character.style.left = mouseX + "px";
  requestAnimationFrame(moveCharacter);
}

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

      const obstacles = document.querySelectorAll('.obstacle');
      obstacles.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          rocketRect.left < obstacleRect.right &&
          rocketRect.right > obstacleRect.left &&
          rocketRect.top < obstacleRect.bottom &&
          rocketRect.bottom > obstacleRect.top
        ) {
          container.removeChild(obstacle);
          egirlDied += 1;
          count.textContent = egirlDied;
          createObstacle(1);
        }
      });

      requestAnimationFrame(moveRocket);
    } else {
      container.removeChild(rocket);
    }
  };

  moveRocket();
};
