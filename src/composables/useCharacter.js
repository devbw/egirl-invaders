import { ref } from "vue";
import { useEnemy } from "../composables/useEnemy";

const { addEnemy, enemies } = useEnemy();

const weapons = ref([]);
const animationInProgress = ref(false);
const life = ref(6);
const lvl = ref(1);
const enemiesKilled = ref(0);

window.addEventListener("loselifepoint", () => {
  loseLifePoint();
})

const loseLifePoint = () => {
  if(life.value > 0) {
    life.value -= 1;
  }
}
export const useCharacter = () => {
  const createWeapon = (weapon) => {
    weapons.value.push(weapon);
    startMoveAnimation();
  };

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
    life
  };
};
