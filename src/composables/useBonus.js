import { ref, onMounted } from "vue";

const bonus = ref([]);

export const useBonus = () => {
  const createBonus = () => {
    bonus.value.push({
      left: Math.floor(Math.random() * (window.innerWidth - 20)),
      top: -10,
    });
  };

  const throwBonus = () => {
    if (bonus.value.length > 0) {
      const character = document.querySelector("#character");
      if (character) {
        const characterRect = character.getBoundingClientRect();
        bonus.value.forEach((bonu, index) => {
          if (bonu.top < window.innerHeight) {
            bonu.top += 5;
            if (
              bonu.left < characterRect.right &&
              bonu.left + 10 > characterRect.left &&
              bonu.top < characterRect.bottom &&
              bonu.top + 10 > characterRect.top
            ) {
              bonus.value.splice(index, 1);
              window.dispatchEvent(new CustomEvent("getlifepoint"));
            }
          } else {
            bonus.value.splice(index, 1);
          }
        });
      }
    }
    requestAnimationFrame(throwBonus);
  };

  return {
    bonus,
    throwBonus,
    createBonus
  };
};
