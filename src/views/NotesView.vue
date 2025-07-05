/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { onMounted, ref, watch } from 'vue';

/** Composables */
import { useNotes } from '../composables';

/** Models */
import { Note, type Position } from '../models';

/** Components */
import ContextMenu from '../components/ContextMenu.vue';
import StickyNote from '../components/StickyNote.vue';
import ToolsBar from '../components/ToolsBar.vue';
import IconButton from '../components/IconButton.vue';
import NewStickyNote from '../components/NewStickyNote.vue';

/** Composables */
const { allNotes, subscribeToAllNotes, addNote } = useNotes();

/** Refs */
const showContextMenu = ref<boolean>(false);
const contextMenuPosition = ref<Position>({ top: 50, left: 50 });

const isCreatingNote = ref<boolean>(false);

/** Component lifecycle */
onMounted(async () => {
    subscribeToAllNotes();
});

watch(allNotes, (newNotes) => {
    console.log(newNotes);
});

/** Methods */
const onPageLClick = (): void => {
    if (isCreatingNote.value) addNote(new Note(new Date().getTime() + '', 'TESTING', 'red', contextMenuPosition.value));

    showContextMenu.value = false;
    isCreatingNote.value = false;
    contextMenuPosition.value = { top: 0, left: 0 };
}

const onPageRClick = (event: MouseEvent): void => {
    contextMenuPosition.value = { top: event.clientY, left: event.clientX };
    isCreatingNote.value = false;
    showContextMenu.value = true;
}

const onNewNoteBtnClick = (): void => {
    showContextMenu.value = false;
    isCreatingNote.value = true;
}
</script>

/**
* Template
@click.right.prevent="onPageClick"
*/
<template>
    <div class="notes-view" @click.left="onPageLClick" @click.right.prevent="onPageRClick">
        <sticky-note v-for="note in allNotes" :text="note.text" :color="note.color"
            :top="note.position ? note.position.top : 50" :left="note.position ? note.position.left : 50" />

        <tools-bar>
            <template v-slot:content>
                <p>SONO PROIETTATO</p>
            </template>
        </tools-bar>

        <context-menu v-if="showContextMenu" :top="contextMenuPosition.top" :left="contextMenuPosition.left"
            @click.stop>
            <template v-slot:content>
                <icon-button text="New note" @click.stop="onNewNoteBtnClick" />
            </template>
        </context-menu>

        <new-sticky-note v-if="isCreatingNote" :top="contextMenuPosition.top" :left="contextMenuPosition.left"
            @click.stop />
    </div>
</template>

<style scoped>
.notes-view {
    background-color: #f0f0f0;
    height: 100dvh;
    width: 100dvw;
}
</style>