import { ref } from "vue";
import { useEnemy } from "../composables/useEnemy";

const { setEnemy, createEnemyWeapon, throwWeapon } = useEnemy();

const isWaitscreen = ref(true);

export const useWaitscreen = () => {
  const toggleWaitscreen = () => {
    isWaitscreen.value = !isWaitscreen.value;
    setEnemy(6);
    setInterval(() => {
      createEnemyWeapon();
    }, 2000);

    throwWeapon();
  };

  return {
    toggleWaitscreen,
    isWaitscreen,
  };
};
