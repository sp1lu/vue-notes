/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { computed, ref, useTemplateRef } from 'vue';

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

/** Emits */
const emits = defineEmits<{
    'note-position-change': [{ top: number, left: number }];
}>();

/** Refs */
const noteRef = useTemplateRef('noteRef');
const top = ref<number>(props.top);
const left = ref<number>(props.left);
const isMoving = ref<boolean>(false);
const offsetY = ref<number>(0);
const offsetX = ref<number>(0);

/** Computeds */
const getZIndex = computed<number>(() => {
    return isMoving.value ? 999 : 0;
});

/** Methods */
const onMouseDown = (event: MouseEvent): void => {    
    const clientRect: DOMRect | undefined = noteRef.value?.getBoundingClientRect();
    if (!clientRect) return;
    
    offsetY.value = event.clientY - clientRect.top;
    offsetX.value = event.clientX - clientRect.left;

    isMoving.value = true;
}

const onMouseUp = (): void => {
    isMoving.value = false;
    if (top.value !== props.top || left.value !== props.left) emits('note-position-change', { top: top.value, left: left.value });
}

const onMouseMove = (event: MouseEvent): void => {
    if (!isMoving.value) return;
    const clientRect: DOMRect | undefined = noteRef.value?.getBoundingClientRect();
    if (!clientRect) return;
    top.value = ((event.clientY - offsetY.value) / window.innerHeight) * 100;
    left.value = ((event.clientX - offsetX.value) / window.innerWidth) * 100;
}
</script>

/**
* Template
*/
<template>
    <div class="sticky-note" :style="{ backgroundColor: props.color, top: `${top}%`, left: `${left}%`, zIndex: `${getZIndex}` }"
        @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove" ref="noteRef">
        <p>{{ text }}</p>
    </div>
</template>

/**
* Style
*/
<style scoped>
.sticky-note {
    position: fixed;
    /* transform: translate(-50%, -50%); */
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}
</style>