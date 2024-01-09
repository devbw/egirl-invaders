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

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
}
</style>