/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { onMounted, ref } from 'vue';

/** Composables */
import { useNotes } from '../composables';

/** Models */
import { Note } from '../models';

/** Composables */
const { getAllNotes } = useNotes();

/** Properties */
const notes = ref<Note[]>([]);

/** Component lifecycle */
onMounted(async () => {
    // const notes: any[] = await getAllNotes();
    notes.value = await getAllNotes();
    console.log(notes.value);
});

/** Methods */
const onPageClick = (): void => {
    console.log('Create new note!');
}
</script>

/**
* Template
@click.right.prevent="onPageClick"
*/
<template>
    <div class="notes-view">
        <p>notes view works!</p>
        <div class="note" v-for="note in notes" :style="{ top: note.position ? `${note.position.top}%` : '50%', left: note.position ? `${note.position.left}%` : '50%' }">
            {{ note.text }}
        </div>
    </div>
</template>

<style>
.notes-view {
    height: 100dvh;
    width: 100dvw;
}

.note {
    position: fixed;
    background-color: aqua;
    height: 100px;
    width: 100px;
    transform: translate(-50%, -50%);
}
</style>