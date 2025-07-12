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
    /* height: 100px; */
    background-color: var(--neutral-100, #fff);
    border: 1px solid var(--neutral-900, #000);
    border-radius: var(--border-radius-m, 4px);
}
</style>