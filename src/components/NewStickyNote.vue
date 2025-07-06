/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { ref, watch } from 'vue';

/** Props */
const { top, left } = defineProps<{
    top: number,
    left: number
}>();

/** Emits */
const emits = defineEmits<{
    'data-change': [{ text: string, color: string }]
}>();

/** Refs */
const text = ref<string>('');
const color = ref<string>('yellow');

/** Watchers */
watch([text, color], ([newText, newColor]) => {
    emits('data-change', {
        text: newText,
        color: newColor
    });
});
</script>

/**
* Template
*/
<template>
    <div class="new-sticky-note" :style="{ top: `${top}%`, left: `${left}%` }">
        <div class="note" :style="{ backgroundColor: color }">
            <textarea class="textarea" v-model="text"></textarea>
        </div>

        <div class="options">
            <div class="colors">
                <label for="blue" class="color blue">
                    <input id="blue" class="radio" type="radio" name="color" value="blue" v-model="color">
                </label>
                <label for="yellow" class="color yellow">
                    <input id="yellow" class="radio" type="radio" name="color" value="yellow" v-model="color">
                </label>
                <label for="purple" class="color purple">
                    <input id="purple" class="radio" type="radio" name="color" value="purple" v-model="color">
                </label>
            </div>
        </div>
    </div>
</template>

/**
* Style
*/
<style>
.new-sticky-note {
    position: fixed;
    width: 100px;
    height: 100px;
}

.textarea {
    background-color: transparent;
    width: 100%;
    height: 100%;
}

.colors {
    display: flex;
}

.color {
    width: 16px;
    height: 16px;
    border-radius: 100%;
}

.blue {
    background-color: blue;
}

.yellow {
    background-color: yellow;
}

.purple {
    background-color: purple;
}

.color:has(.radio:checked) {
    border: 1px solid green;
}

.radio {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
}
</style>