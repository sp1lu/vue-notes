/**
* Script
*/
<script setup lang="ts">
import { useAuth } from './composables';

const { user } = useAuth();
</script>

/**
* Template
*/
<template>
  <RouterView />
</template>

<style scoped></style>
