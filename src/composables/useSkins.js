import { ref } from "vue";

const isSkins = ref(false);
const usedSkin = ref("https://i.goopics.net/v6suhm.png");

export const useSkins = () => {
  const toggleSkins = () => {
    isSkins.value = !isSkins.value;
  };

  const sendSkins = (skin) => {
    usedSkin.value = skin;
    window.dispatchEvent(new CustomEvent("skinChosed"));
  };

  return {
    toggleSkins,
    sendSkins,
    usedSkin,
    isSkins,
  };
};
