import { ref } from 'vue';

const isWaitscreen = ref(true);

export const useWaitscreen = () => {

    const toggleWaitscreen = () => {
        isWaitscreen.value = !isWaitscreen.value;
    }

    return {
        toggleWaitscreen,
        isWaitscreen
    }
}