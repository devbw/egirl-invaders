import { ref } from "vue";

const isSkins = ref(false);
const usedSkin = ref('src/assets/skins/Mochi.png')

export const useSkins = () => {
  const toggleSkins = () => {
    isSkins.value = !isSkins.value;
  };

  const sendSkins = (skin) => {
    usedSkin.value = `src/assets/skins/${skin}`;
    window.dispatchEvent(new CustomEvent("skinChosed"));
  }

  return {
    toggleSkins,
    sendSkins,
    usedSkin,
    isSkins,
  };
};
