/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { onMounted, watch } from 'vue';
import type { User } from 'firebase/auth';

/** Composables */
import { useAuth } from '../composables';

/** Composables */
const { user, signInWithGoogle, logOut } = useAuth();

/** Watchers */
// watch(user, (newUser: User | null) => {
//     console.log(newUser);
// });
</script>

/**
* Template
*/
<template>
    <div class="home">
        <p>home works!</p>
        <button type="button" @click="signInWithGoogle" v-if="!user">Login</button>
        <button type="button" @click="logOut" v-else>Logout</button>
        <p>{{ user ? user.email : 'Non loggato' }}</p>
    </div>
</template>