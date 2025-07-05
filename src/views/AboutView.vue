/**
 * Script
 */
<script setup lang="ts">
import { useAuth } from '../composables';

const { user, signInWithGoogle, logOut } = useAuth();
</script>

/**
 * Template
 */
<template>
    <div class="about">
        <p>about works!</p>
        <p>{{ user ? user.email : 'Utente non loggato' }}</p>
    </div>
</template>