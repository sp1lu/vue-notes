/**
* Script
*/
<script setup lang="ts">
const { top, left } = defineProps<{
    top: number,
    left: number
}>();
</script>

/**
* Template
*/
<template>
    <div class="context-menu" :style="{ top: `${top}%`, left: `${left}%` }">
        <slot name="content"></slot>
    </div>
</template>

/**
* Style
*/
<style scoped>
.context-menu {
    position: fixed;
    width: 100px;
    height: 100px;
    background-color: red;
}
</style>