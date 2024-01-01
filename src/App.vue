<template>
  <Waitscreen v-if="isWaitscreen"/>
  <Game v-else/>
</template>

<script setup>
import Waitscreen from './components/Waitscreen.vue';
import Game from './components/Game.vue'
import { useWaitscreen } from './composables/useWaitscreen'

const { isWaitscreen } = useWaitscreen();

</script>
