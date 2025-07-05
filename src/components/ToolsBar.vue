/**
* Script
*/
<script setup lang="ts">

</script>

/**
* Template
*/
<template>
    <div class="tools-bar">
        <slot name="content"></slot>
    </div>
</template>

/**
* Style
*/
<style scoped>
.tools-bar {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: aquamarine;
}
</style>