import { ref } from "vue";

const isSkins = ref(false);
const usedSkin = ref(imageUrl)

const imagePath = `/skins/Mochi.png`;
const imageUrl = import.meta.env.BASE_URL + imagePath;

export const useSkins = () => {
  const toggleSkins = () => {
    isSkins.value = !isSkins.value;
  };

  const sendSkins = (skin) => {
    const imagePath = `/skins/${skin}`;
    const imageUrl = import.meta.env.BASE_URL + imagePath;
    usedSkin.value = imageUrl;
    window.dispatchEvent(new CustomEvent("skinChosed"));
  }

  return {
    toggleSkins,
    sendSkins,
    usedSkin,
    isSkins,
  };
};
