<template>
  <div class="Skins">
    <h2>Chose your skin</h2>
    <div class="ContainerSkins">
      <img
        v-for="(skin, index) in skins"
        :key="index"
        :src="getPathImage(skin)"
        @click="sendSkins(skin)"
      />
    </div>
  </div>
</template>

<script setup>
import { useSkins } from "../composables/useSkins";

const { sendSkins } = useSkins();

const skins = [
  "https://i.goopics.net/v6suhm.png",
  "https://i.goopics.net/q4nqjv.png",
  "https://i.goopics.net/3glip4.png",
  "https://i.goopics.net/s9owz8.png",
  "https://i.goopics.net/fungp6.png",
  "https://i.goopics.net/ubffqm.png",
  "https://i.goopics.net/5bwk4a.png",
  "https://i.goopics.net/7infp7.png",
  "https://i.goopics.net/x2ph1o.png",
  "https://i.goopics.net/xo80k5.png",
];

const getPathImage = (filename) => {
  return filename;
};
</script>

<style scoped>
.Skins {
  background: radial-gradient(
    circle,
    rgba(182, 100, 152, 1) 0%,
    rgba(18, 26, 91, 1) 60%,
    rgb(8, 13, 49) 100%
  );
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 70vw;
  padding: 0 40px;
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  border: 3px solid white;
}

.ContainerSkins {
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

h2 {
  margin-bottom: 80px;
}

img {
  height: 120px;
  width: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

img:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>
