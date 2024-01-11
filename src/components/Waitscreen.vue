<template>
  <div class="Waitscreen">
    <img src="https://i.goopics.net/canmhr.png" class="logo" />
    <div class="actions">
      <button @click="toggleSkins">SKINS</button>
      <button @click="toggleWaitscreen">START THE PURGE</button>
      <button>LEADERBOARD</button>
    </div>
    <div>
      <button @click="redirectToPaypal">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a10.72 10.72 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.27 72.27 0 0 0-20.73-15.82z"
            fill="currentColor"
          ></path>
          <path
            d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.58 12.58 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19z"
            fill="currentColor"
          ></path>
        </svg>
        <p>Soutenir sur PayPal</p>
      </button>
    </div>
    <Skins v-if="skins" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Skins from "./Skins.vue";
import { useWaitscreen } from "../composables/useWaitscreen";

const { toggleWaitscreen } = useWaitscreen();
const skins = ref(false);
const toggleSkins = () => {
  skins.value = !skins.value;
};
window.addEventListener("skinChosed", () => {
  skins.value = !skins.value;
});

const redirectToPaypal = () => {
  window.open("https://paypal.me/Ackermiam", "_blank");
};
</script>

<style scoped>
.Waitscreen {
  background: url("https://i.goopics.net/u4n1no.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 40px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

a {
  color: white;
}

.logo {
  width: 100%;
  max-width: 470px;
  height: auto;
  animation: flicker 4s linear infinite both;
}

.icon {
  width: 20px;
  height: auto;
  margin-right: 5px;
}

.actions {
  display: flex;
}

button {
  margin-right: 10px;
  display: flex;
  align-items: center;
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
