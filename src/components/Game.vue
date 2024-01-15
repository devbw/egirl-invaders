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

    <img
      class="weapon"
      v-for="(weapon, index) in weapons"
      :key="index"
      :style="{ top: weapon.top + 'px', left: weapon.left + 'px' }"
      src="https://i.goopics.net/ecwluf.png"
    />

    <img
      class="enemyWeapon"
      v-for="(weapon, index) in enemyWeapon"
      :key="index"
      :style="{ top: weapon.top + 'px', left: weapon.left + 'px' }"
      src="https://i.goopics.net/k6uhat.png"
    />

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
        :style="{ left: mouseX + 'px' }"
        ref="boss"
      />
    </div>

    <div v-if="lose" class="losecontainer__lose">
      <div class="losebackground">
        <div class="losetext">
          <h2>Tu es un gros baiseur..</h2>
        </div>
        <div class="losecontainer__lose__score">
          <div class="losecontainer__lose__score__bloc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 20 20"
            >
              <g fill="none">
                <path
                  d="M17 2.5a.5.5 0 0 0-1 0V3h-.5a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 1 0V4h.5a.5.5 0 0 0 0-1H17v-.5zm-10 3a.5.5 0 0 1-.5.5H6v.5a.5.5 0 0 1-1 0V6h-.5a.5.5 0 0 1 0-1H5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 .5.5zm9 9a.5.5 0 0 1-.5.5H15v.5a.5.5 0 0 1-1 0V15h-.5a.5.5 0 0 1 0-1h.5v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 .5.5zm-2.565-7.934a1.914 1.914 0 0 0-2.708 0l-.477.477l2.707 2.707l.478-.477a1.914 1.914 0 0 0 0-2.707zm-1.185 3.891L9.543 7.75l-6.982 6.982a1.914 1.914 0 1 0 2.707 2.707l6.982-6.982z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <p>Score : {{ enemiesKilled }}</p>
          </div>
          <div class="losecontainer__lose__score__bloc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 640 512"
            >
              <path
                d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48c0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8c0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8c26.5 0 48-21.5 48-48s-21.5-48-48-48z"
                fill="currentColor"
              ></path>
            </svg>
            <p>lvl : {{ lvl }}</p>
          </div>
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
      <button v-if="lose" @click="reload">Restart</button>
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

const reload = () => {
  window.location.reload();
};

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
  width: 15px;
  height: auto;
  position: absolute;
}

.enemyWeapon {
  width: 15px;
  height: auto;
  position: absolute;
}

.boss {
  width: 200px;
  height: auto;
  position: absolute;
  top: 20px;
  transform: translate(-50%, 50%);
  user-select: none;
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
  z-index: 99;
}

.losecontainer__lose {
  height: 55%;
  background-color: rgb(10, 16, 51);
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: 10px solid rgb(126, 16, 136);
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

.losebackground {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-image: url("https://i.goopics.net/whpw47.png");
  background-size: auto 30px;
}

.losecontainer__lose h2 {
  color: rgb(255, 233, 35);
  margin: 0;
  font-size: 1.3em;
}

.losecontainer__lose__thanks {
  color: white;
  background: rgb(126, 16, 136);
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.losecontainer__lose__score {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.losecontainer__lose__score__bloc {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: white;
  background: rgb(126, 16, 136);
  border-radius: 5px;
  padding: 7px 13px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.losecontainer__lose__score__bloc svg {
  margin-right: 10px;
  width: 30px;
  height: auto;
}

.losecontainer__lose__score__skin {
  margin-top: 25px;
  margin-bottom: 10px;
  width: 100px;
  height: auto;
}

.loseimg {
  width: 200px;
  height: auto;
}

.losetext {
  text-align: center;
  background: rgb(126, 16, 136);
  border-radius: 5px;
  padding: 7px 13px;
}
</style>
