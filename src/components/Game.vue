<template>
  <div
    class="Game"
    @click="createWeapon({ left: mouseX, top: characterRect.top })"
  >
    <div ref="character" class="mochi" id="character">
      <img :src="usedSkin" class="character" draggable="false" />
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
      src="https://i.goopics.net/7p292c.png"
      class="enemy"
      :style="{ top: egirl.top + 'px', left: egirl.left + 'px' }"
      draggable="false"
    />

    <div v-if="isBoss">
      <img
        src="https://i.goopics.net/q44rz8.png"
        draggable="false"
        class="boss"
      />
    </div>

    <div v-if="lose" class="losecontainer__lose">
      <h2 class="losetext">Tu es un gros baiseur..</h2>
      <div class="losecontainer__lose__score">
        <p>Score : {{ enemiesKilled }}</p>
        <p>lvl : {{ lvl }}</p>
        <img
          :src="usedSkin"
          draggable="false"
          class="losecontainer__lose__score__skin"
        />
      </div>
      <div class="losecontainer__lose__thanks">
        <p>
          Merci pour leur aide et idées : KeroSan, Chapelain, Hunt, Honda,
          Heavent, Esypso
        </p>
      </div>
    </div>

    <div v-if="lose" class="losecontainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCharacter } from "../composables/useCharacter";
import { useEnemy } from "../composables/useEnemy";
import { useSkins } from "../composables/useSkins";

const { createWeapon, weapons, enemiesKilled, lvl, life, lose } =
  useCharacter();
const { usedSkin } = useSkins();

const character = ref();
const characterRect = ref();
const mouseX = ref();

const getMouseX = (event) => {
  character.value.style.left = event.clientX + "px";
  characterRect.value = character.value.getBoundingClientRect();
  mouseX.value = event.clientX;
};

const {
  enemies,
  enemyWeapon,
  manageSpeed,
  manageSpeedWeapon,
  createEnemyWeapon,
  addEnemy,
  activeBoss,
  isBoss,
} = useEnemy();

window.addEventListener("lvlup", () => {
  if (lvl.value % 5 === 0) {
    window.dispatchEvent(new CustomEvent("activeBoss"));
  } else {
    manageSpeed(0.05);
    manageSpeedWeapon(0.08);
    addEnemy(1);
    createEnemyWeapon();
  }
});

onMounted(() => {
  window.addEventListener("mousemove", getMouseX);
  //window.addEventListener("activeBoss", activeBoss);
});
onUnmounted(() => window.removeEventListener("mousemove", getMouseX));

const type = async (isType, type) => {
  return await newMedia.related(type).create(specificMediaInfos);
};
</script>

<style>
.Game {
  background: url("https://i.goopics.net/xppvjd.png");
  background-size: cover;
  background-repeat: no-repeat;
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
  filter: drop-shadow(0 0 5px rgb(31, 31, 31));
}

.enemy {
  position: absolute;
  width: 60px;
  height: auto;
  outline: none;
  user-select: none;
  filter: drop-shadow(0 0 4px rgb(0, 0, 0));
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

.boss {
  width: 200px;
  height: auto;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 50%);
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
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("https://i.goopics.net/q44rz8.png") repeat;
  background-size: auto 100px;
  opacity: 0.15;
  z-index: 99;
}

.losecontainer__lose {
  height: 50%;
  background: white;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.losecontainer__lose h2 {
  color: rgb(126, 16, 136);
  margin-top: 0;
}

.losecontainer__lose__thanks {
  color: white;
  background: rgb(126, 16, 136);
  padding: 10px 15px;
  border-radius: 5px;
}

.losecontainer__lose__score {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.losecontainer__lose__score p {
  color: rgb(126, 16, 136);
  margin-bottom: 10px;
}

.losecontainer__lose__score__skin {
  margin-top: 25px;
  width: 100px;
  height: auto;
}

.loseimg {
  width: 200px;
  height: auto;
}

.losetext {
  font-size: 2rem;
  color: white;
  text-align: center;
}
</style>
