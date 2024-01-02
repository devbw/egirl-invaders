import { ref } from "vue";

const enemies = ref([]);
const enemyWeapon = ref([]);
const speedWeapon = ref(5);
const speed = ref(1);

export const useEnemy = () => {
  const setEnemy = (enemy) => {
    addEnemy(enemy);
    moveEnemy();
  };

  const createWeapon = () => {
    enemies.value.forEach((enemy) => {
      enemyWeapon.value.push({
        left: enemy.left + 30,
        top: enemy.top + 60,
      });
    });
  };

  const throwWeapon = () => {
    if (enemies.value.length > 0) {
      const character = document.querySelector("#character");
      if (character) {
        const characterRect = character.getBoundingClientRect();
        enemyWeapon.value.forEach((weapon, index) => {
          if (weapon.top < window.innerHeight) {
            weapon.top += speedWeapon.value;
            if (
              weapon.left < characterRect.right &&
              weapon.left + 10 > characterRect.left &&
              weapon.top < characterRect.bottom &&
              weapon.top + 10 > characterRect.top
            ) {
              enemyWeapon.value.splice(index, 1);
              window.dispatchEvent(
                new CustomEvent("loselifepoint")
              );
            }
          } else {
            enemyWeapon.value.splice(index, 1);
          }
        });
      }
    }
    requestAnimationFrame(throwWeapon);
  };

  const addEnemy = (enemy) => {
    for (let i = 0; i < enemy; i++) {
      enemies.value.push({
        top: Math.floor(Math.random() * (window.innerHeight / 3)),
        left: Math.floor(Math.random() * (window.innerWidth - 20)),
        direction: Math.random() < 0.5 ? 1 : -1,
      });
    }
  };

  const cleanEnemies = () => {
    enemies.value = [];
  };

  const moveEnemy = () => {
    if (enemies.value.length > 0) {
      enemies.value.forEach((enemy) => {
        enemy.left = enemy.left + enemy.direction * speed.value;

        if (enemy.left > window.innerWidth && enemy.direction === 1) {
          enemy.left = -10;
        } else if (enemy.left <= 10 && enemy.direction === -1) {
          enemy.left = window.innerWidth - 10;
        }
      });
      requestAnimationFrame(moveEnemy);
    }
  };

  return {
    setEnemy,
    addEnemy,
    cleanEnemies,
    createWeapon,
    throwWeapon,
    enemies,
    enemyWeapon,
  };
};
