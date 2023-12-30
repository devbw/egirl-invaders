const character = document.getElementById("character");
const count = document.getElementById("count");
const gameover = document.getElementById("gameover");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const lives = document.getElementById("lives");
const level = document.getElementById("level");
const container = document.querySelector(".global");
const waitscreen = document.querySelector(".waitscreen");

let egirlDied = 0;
let mouseX = container.clientWidth / 2;
let vitess = 0.8;
let numbObstacles = 6;
let lvl = 1;
let isAttacking = false;
let life = 6;
const enemyRockets = [];

// EVENTS

start.addEventListener("click", () => {
  waitscreen.style.display = "none";
  createObstacle(numbObstacles);
  moveObstacles();
  setLife();

  setInterval(() => {
    createEnemyRocket();
  }, 2000);

  moveEnemyRockets();
});

restart.addEventListener("click", () => {
  location.reload();
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
  if(obstacles.length > 0) {
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
  }
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

const createEnemyRocket = () => {
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();
    const enemyRocket = document.createElement("div");
    enemyRocket.className = "enemyRocket";
    enemyRocket.style.left = obstacleRect.left + 30 + "px";
    enemyRocket.style.top = obstacleRect.top + 60 + "px";
    container.appendChild(enemyRocket);

    enemyRockets.push(enemyRocket);
  });
};

const moveEnemyRockets = () => {
  const characterRect = character.getBoundingClientRect();

  enemyRockets.forEach((enemyRocket) => {
    const enemyRocketRect = enemyRocket.getBoundingClientRect();
    const newY = enemyRocketRect.top + 5;

    if (newY <= container.clientHeight) {
      enemyRocket.style.top = newY + "px";

      if (
        enemyRocketRect.left < characterRect.right &&
        enemyRocketRect.right > characterRect.left &&
        enemyRocketRect.top < characterRect.bottom &&
        enemyRocketRect.bottom > characterRect.top
      ) {
        container.removeChild(enemyRocket);
        life -= 1;
        removeLife();
      }
    } else {
      container.removeChild(enemyRocket);
    }
  });

  requestAnimationFrame(moveEnemyRockets);
};

// UTILS FUNCTIONS

const setLife = () => {
  for (let i = 0; i < life; i++) {
    const lifepoint = document.createElement("div");
    lifepoint.className = "lifepoint";
    lives.appendChild(lifepoint);
  }
};

const removeLife = () => {
  if (lives.childElementCount > 0) {
    const lastLifePoint = lives.lastChild;
    lives.removeChild(lastLifePoint);
  }
  if(life === 0) {
    stopGame();
  }
}

const stopGame = () => {
  console.log('game over')
  const obstacles = document.querySelectorAll(".obstacle");
  obstacles.forEach((obstacle) => {
    container.removeChild(obstacle);
  });
  gameover.style.display = "block";
}

const lvlUp = () => {
  lvl += 1;
  level.textContent = lvl;
  const obstacles = document.querySelectorAll(".obstacle");
  obstacles.forEach((obstacle) => {
    container.removeChild(obstacle);
  });
  createObstacle(numbObstacles);
  console.log("coucouuuu");
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
  if (egirlDied === 90) {
    numbObstacles = 16;
    vitess = 1.8;
    lvlUp();
  }
  if (egirlDied === 110) {
    numbObstacles = 18;
    vitess = 1.9;
    lvlUp();
  }
  if (egirlDied === 130) {
    numbObstacles = 20;
    vitess = 2;
    lvlUp();
  }
  if (egirlDied === 150) {
    numbObstacles = 22;
    vitess = 2.2;
    lvlUp();
  }
};

const randNum = () => {
  return Math.floor(Math.random() * 2) + 1;
};

const moveCharacter = () => {
  character.style.left = mouseX + "px";
};
