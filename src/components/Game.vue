<template>
  <div
    class="Game"
    @click="createWeapon({ left: mouseX, top: characterRect.top })"
  >
    <div ref="character" class="mochi" id="character">
      <img src="../assets/Mochi.png" class="character" draggable="false" />
    </div>

    <div class="containerlife">
      <div v-for="(points, index) in life" :key="index" class="life"></div>
    </div>

    <p class="score">Score : {{ enemiesKilled }}</p>

    <p class="level">lvl : {{ lvl }}</p>

    <div
      class="weapon"
      v-for="(weapon, index) in weapons"
      :key="index"
      :style="{ top: weapon.top + 'px', left: weapon.left + 'px' }"
    ></div>

    <div
      class="enemyWeapon"
      v-for="(weapon, index) in enemyWeapon"
      :key="index"
      :style="{ top: weapon.top + 'px', left: weapon.left + 'px' }"
    ></div>

    <img
      v-for="(egirl, index) in enemies"
      :key="index"
      src="../assets/egirl.png"
      class="enemy"
      :style="{ top: egirl.top + 'px', left: egirl.left + 'px' }"
      draggable="false"
    />

    <div v-if="lose" class="losecontainer">
      <img src="../assets/amouranthcrying.png" class="loseimg"/>
      <h2 class="losetext">Tu as succombé !</h2>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCharacter } from "../composables/useCharacter";
import { useEnemy } from "../composables/useEnemy";

const { createWeapon, weapons, enemiesKilled, lvl, life, lose } = useCharacter();

const character = ref();
const characterRect = ref();
const mouseX = ref();

const getMouseX = (event) => {
  character.value.style.left = event.clientX + "px";
  characterRect.value = character.value.getBoundingClientRect();
  mouseX.value = event.clientX;
};

const { enemies, enemyWeapon, manageSpeed, manageSpeedWeapon, createEnemyWeapon, addEnemy } = useEnemy();

window.addEventListener('lvlup', () => {
    manageSpeed(0.05);
    manageSpeedWeapon(0.09);
    addEnemy(1);
    createEnemyWeapon();
  })

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
.enemyWeapon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(244, 121, 255);
  border: 2px solid rgb(100, 255, 79);
  position: absolute;
}

.score {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
}

.level {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
}

.life {
  width: 8px;
  height: 8px;
  background: rgb(38, 235, 136);
  border: 2px solid rgb(14, 105, 26);
  border-radius: 50%;
  margin-right: 3px;
}

.containerlife {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.losecontainer {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loseimg {
  width: 200px;
  height: auto;
}

.losetext {
  font-size: 35px;
  color: white;
  text-align: center;
}
</style>
