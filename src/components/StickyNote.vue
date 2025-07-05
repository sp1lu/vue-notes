/**
* Script
*/
<script setup lang="ts">
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
})
</script>

/**
* Template
*/
<template>
    <div class="sticky-note" :style="{ backgroundColor: props.color, top: `${props.top}%`, left: `${props.left}%` }">
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