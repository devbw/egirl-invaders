import { ref } from 'vue';

const weapons = ref([]);
const animationInProgress = ref(false);
const life = ref(6);
const lvl = ref(1);

export const useCharacter = () => {

    const createWeapon = (weapon) => {
        weapons.value.push(weapon);
        startMoveAnimation();
    }
    
    const startMoveAnimation = () => {
        if (!animationInProgress.value) {
            animationInProgress.value = true;
            moveWeapon();
        }
    }
    
    const moveWeapon = () => {
        if (weapons.value.length > 0) {
            weapons.value.forEach((weapon, index) => {
                if (weapon.top >= 5) {
                    weapon.top -= 15;
                } else {
                    weapons.value.splice(index, 1);
                }
            });
    
            if (weapons.value.length > 0) {
                requestAnimationFrame(moveWeapon);
            } else {
                animationInProgress.value = false;
            }
        } else {
            animationInProgress.value = false;
        }
    };
    

    return {
        createWeapon,
        moveWeapon,
        weapons
    }
}