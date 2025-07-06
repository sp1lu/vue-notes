/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { ref } from 'vue';

/** Props */
const props = withDefaults(defineProps<{
    text: string,
    color?: string,
    top?: number
    left?: number
}>(), {
    color: 'yellow',
    top: 50,
    left: 50
});

/** Refs */
const top = ref<number>(props.top);
const left = ref<number>(props.left);
const isMoving = ref<boolean>(false);

/** Methods */
const onMouseDown = (): void => {
    isMoving.value = true;
}

const onMouseUp = (): void => {
    isMoving.value = false;
}

const onMouseMove = (event: MouseEvent): void => {
    if (!isMoving.value) return;
    top.value = (event.clientY / window.innerHeight) * 100;
    left.value = (event.clientX / window.innerWidth) * 100;
}
</script>

/**
* Template
*/
<template>
    <div class="sticky-note" :style="{ backgroundColor: props.color, top: `${top}%`, left: `${left}%` }"
        @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove">
        <p>{{ text }}</p>
    </div>
</template>

/**
* Style
*/
<style scoped>
.sticky-note {
    position: fixed;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}
</style>