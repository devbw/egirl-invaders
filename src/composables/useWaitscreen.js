import { ref } from "vue";
import { useEnemy } from "../composables/useEnemy";
import { useBonus } from "../composables/useBonus";

const { setEnemy, createEnemyWeapon, throwWeapon } = useEnemy();
const { throwBonus } = useBonus();

const isWaitscreen = ref(true);

export const useWaitscreen = () => {
  const toggleWaitscreen = () => {
    isWaitscreen.value = !isWaitscreen.value;
    setEnemy(6);
    setInterval(() => {
      createEnemyWeapon();
    }, 2000);

    throwWeapon();
    throwBonus();
  };

  return {
    toggleWaitscreen,
    isWaitscreen,
  };
};
