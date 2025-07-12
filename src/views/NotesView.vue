/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from 'firebase/auth';

/** Composables */
import { useAuth, useNotes } from '../composables';

/** Models */
import { Note, type Position } from '../models';

/** Components */
import ContextMenu from '../components/ContextMenu.vue';
import StickyNote from '../components/StickyNote.vue';
import ToolsBar from '../components/ToolsBar.vue';
import IconButton from '../components/IconButton.vue';
import NewStickyNote from '../components/NewStickyNote.vue';

/** Composables */
const { user, logOut } = useAuth();
const { allNotes, subscribeToAllNotes, addNote, updateNotePosition } = useNotes();
const { push } = useRouter();

/** Refs */
const showContextMenu = ref<boolean>(false);
const contextMenuPosition = ref<Position>({ top: 50, left: 50 });

const isCreatingNote = ref<boolean>(false);
const newNoteData = reactive<{ text: string | null, color: string | null }>({ text: null, color: null });

/** Component lifecycle */
onMounted(async () => {
    subscribeToAllNotes();
});

watch(user, (newUser: User | null) => {
    if (!newUser) push('/home');
});

watch(allNotes, (newNotes) => {
    console.log(newNotes);
});

/** Methods */
const onPageLClick = (): void => {
    if (isCreatingNote.value && Object.values(newNoteData).every((v): v is string => v !== null && v !== '')) {
        addNote(new Note(new Date().getTime() + '', newNoteData.text!, user.value ? user.value.uid : '', newNoteData.color!, contextMenuPosition.value));

        newNoteData.text = null;
        newNoteData.color = null;
    }

    showContextMenu.value = false;
    isCreatingNote.value = false;
    contextMenuPosition.value = { top: 0, left: 0 };
}

const onPageRClick = (event: MouseEvent): void => {
    contextMenuPosition.value = { top: (event.clientY / window.innerHeight) * 100, left: (event.clientX / window.innerWidth) * 100 };
    isCreatingNote.value = false;
    showContextMenu.value = true;
}

const onNewNoteBtnClick = (): void => {
    showContextMenu.value = false;
    isCreatingNote.value = true;
}

const onNewNoteChange = (data: { text: string, color: string }): void => {
    newNoteData.text = data.text;
    newNoteData.color = data.color;
}

const onNoteMove = (position: Position, id: string): void => {
    updateNotePosition(id, position!);
}
</script>

/**
* Template
*/
<template>
    <button type="button" @click="logOut">LOGOUT</button>
    <div class="notes-view" @click.left="onPageLClick" @click.right.prevent="onPageRClick">
        <sticky-note v-for="note in allNotes" :text="note.text" :color="note.color"
            :top="note.position ? note.position.top : 50" :left="note.position ? note.position.left : 50"
            @note-position-change="onNoteMove($event, note.id)" />

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
            @click.stop @data-change="onNewNoteChange" />
    </div>
</template>

<style scoped>
.notes-view {
    background-color: #f0f0f0;
    height: 100dvh;
    width: 100dvw;
}
</style>