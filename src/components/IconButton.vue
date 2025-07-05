<script setup lang="ts">
const props = defineProps<{
    text: string,
    icon?: string
}>();
</script>

<template>
    <div class="icon-button">
        <button type="button" class="button">
            <span class="button__icon"></span>
            <span class="button__text">{{ text }}</span>
        </button>
    </div>
</template>

<style>
.button {
    display: flex;
    align-items: center;
}

.button__icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: blue;
    mask-image: url('../assets/icons/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg');
    mask-size: cover;
    -webkit-mask-image: url('../assets/icons/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg');
}
</style>