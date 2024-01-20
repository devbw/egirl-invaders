import { ref } from "vue";
import { useEnemy } from "../composables/useEnemy";

const { addEnemy, enemies, cleanEnemies, cleanWeapons } = useEnemy();

const weapons = ref([]);
const animationInProgress = ref(false);
const life = ref(6);
const lvl = ref(1);
const enemiesKilled = ref(0);
const totalEnemiesKilled = ref(0);
const lose = ref(false);

window.addEventListener("loselifepoint", () => {
  loseLifePoint();
});

window.addEventListener("getlifepoint", () => {
  getLifePoint();
});

const loseLifePoint = () => {
  life.value -= 1;
  if (life.value === 0) {
    lose.value = true;
    cleanEnemies();
    cleanWeapons();
  }
};

const getLifePoint = () => {
  life.value += 1;
};

export const useCharacter = () => {
  const createWeapon = (weapon) => {
    weapons.value.push(weapon);
    startMoveAnimation();
  };

  const manageLvl = () => {
    if (enemiesKilled.value === lvl.value * 10) {
      lvl.value += 1;
      window.dispatchEvent(new CustomEvent("lvlup", { detail: lvl.value }));
    }
  };

  const manageBonus = () => {
    if (enemiesKilled.value % 25 === 0) {
      window.dispatchEvent(new CustomEvent("addBonusLife"));
    }
  }

  const startMoveAnimation = () => {
    if (!animationInProgress.value) {
      animationInProgress.value = true;
      moveWeapon();
    }
  };

  const moveWeapon = () => {
    if (weapons.value.length > 0) {
      weapons.value.forEach((weapon, indexWeapon) => {
        if (weapon.top >= 5) {
          weapon.top -= 15;

          enemies.value.forEach((enemy, indexEnemy) => {
            if (
              weapon.left < enemy.left + 60 &&
              weapon.left + 5 > enemy.left &&
              weapon.top < enemy.top + 60
            ) {
              enemies.value.splice(indexEnemy, 1);
              weapons.value.splice(indexWeapon, 1);
              enemiesKilled.value += 1;
              addEnemy(1);
              manageLvl();
              manageBonus();
            }
          });
        } else {
          weapons.value.splice(indexWeapon, 1);
        }
      });

      if (weapons.value.length > 0) {
        requestAnimationFrame(moveWeapon);
      } else {
        animationInProgress.value = false;
      }
    } else {
      animationInProgress.value = false;
    }
  };

  return {
    createWeapon,
    moveWeapon,
    loseLifePoint,
    weapons,
    enemiesKilled,
    lvl,
    life,
    lose,
  };
};
