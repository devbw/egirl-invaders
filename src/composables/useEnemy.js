import { ref } from "vue";

const enemies = ref([]);
const speed = ref(1);

export const useEnemy = () => {
  const setEnemy = (enemy) => {
    addEnemy(enemy);
    moveEnemy();
  };

  const addEnemy  = (enemy) => {
    for (let i = 0; i < enemy; i++) {
      enemies.value.push({
        top: Math.floor(Math.random() * (window.innerHeight / 3)),
        left: Math.floor(Math.random() * (window.innerWidth - 20)),
        direction: Math.random() < 0.5 ? 1 : -1,
      });
    }
  }

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
    enemies,
  };
};
