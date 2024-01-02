<template>
  <div
    class="Game"
    ref="container"
    @click="createWeapon({ left: mouseX, top: characterRect.top })"
  >
    <div ref="character" class="mochi">
      <img src="../assets/Mochi.png" class="character" draggable="false" />
    </div>
    <div
      class="weapon"
      v-for="(weapon, index) in weapons"
      :key="index"
      :style="{ top: weapon.top + 'px', left: weapon.left + 'px' }"
    ></div>
    <img
      src="../assets/egirl.png"
      v-for="(egirl, index) in enemies"
      :key="index"
      class="enemy"
      :style="{ top: egirl.top + 'px', left: egirl.left + 'px' }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCharacter } from "../composables/useCharacter";
import { useEnemy } from "../composables/useEnemy";

const { createWeapon, weapons } = useCharacter();
const { setEnemy, enemies } = useEnemy();

const character = ref();
const container = ref();
const mouseX = ref();
const characterRect = ref();
const skin = ref("../assets/Mochi.png");

const getMouseX = (event) => {
  character.value.style.left = event.clientX + "px";
  characterRect.value = character.value.getBoundingClientRect();
  mouseX.value = event.clientX;
};

setEnemy(6);

onMounted(() => window.addEventListener("mousemove", getMouseX));
onUnmounted(() => window.removeEventListener("mousemove", getMouseX));
</script>

<style>
.Game {
  background: radial-gradient(
    circle,
    rgba(182, 100, 152, 1) 0%,
    rgba(18, 26, 91, 1) 60%,
    rgb(8, 13, 49) 100%
  );
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.mochi {
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
}

.character {
  width: 100%;
  height: auto;
}

.enemy {
  position: absolute;
  width: 60px;
  height: 60px;
  outline: none;
  user-select: none;
}

.weapon {
  width: 5px;
  height: 10px;
  border-radius: 5px;
  background: white;
  position: absolute;
}
</style>
