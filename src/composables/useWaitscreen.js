import { ref } from "vue";
import { useEnemy } from "../composables/useEnemy";

const { setEnemy, createWeapon, throwWeapon } = useEnemy();

const isWaitscreen = ref(true);

export const useWaitscreen = () => {
  const toggleWaitscreen = () => {
    isWaitscreen.value = !isWaitscreen.value;
    setEnemy(6);
    setInterval(() => {
      createWeapon();
    }, 2000);

    throwWeapon();
  };

  return {
    toggleWaitscreen,
    isWaitscreen,
  };
};
