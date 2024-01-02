<template>
  <div class="Waitscreen">
    <img src="../assets/egirlinvader.png" class="logo" />
    <div class="actions">
      <button>SKINS</button>
      <button @click="toggleWaitscreen">START THE PURGE</button>
      <button>LEADERBOARD</button>
    </div>
  </div>
</template>

<script setup>
import { useWaitscreen } from "../composables/useWaitscreen";

const { toggleWaitscreen } = useWaitscreen();
</script>

<style scoped>
.Waitscreen {
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
  height: 100vh;
  padding: 0 40px;
  overflow: hidden;
}

.logo {
  width: 100%;
  max-width: 470px;
  height: auto;
  animation: flicker 4s linear infinite both;
}

.actions {
  display: flex;
}

button {
  margin-right: 10px;
}

button:last-child {
  margin-right: 0px;
}

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
  }
  31.98% {
    opacity: 1;
  }
  32% {
    opacity: 0;
  }
  32.8% {
    opacity: 0;
  }
  32.82% {
    opacity: 1;
  }
  34.98% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  35.7% {
    opacity: 0;
  }
  35.72% {
    opacity: 1;
  }
  36.98% {
    opacity: 1;
  }
  37% {
    opacity: 0;
  }
  37.6% {
    opacity: 0;
  }
  37.62% {
    opacity: 1;
  }
  67.98% {
    opacity: 1;
  }
  68% {
    opacity: 0;
  }
  68.4% {
    opacity: 0;
  }
  68.42% {
    opacity: 1;
  }
  95.98% {
    opacity: 1;
  }
  96% {
    opacity: 0;
  }
  96.7% {
    opacity: 0;
  }
  96.72% {
    opacity: 1;
  }
  98.98% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  99.6% {
    opacity: 0;
  }
  99.62% {
    opacity: 1;
  }
}
</style>
