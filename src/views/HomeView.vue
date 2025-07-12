/**
* Script
*/
<script setup lang="ts">
/** Libraries */
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from 'firebase/auth';

/** Composables */
import { useAuth } from '../composables';

/** Composables */
const { user, signInWithGoogle } = useAuth();
const { push } = useRouter();

/** Refs */

/** Watchers */
watch(user, (newUser: User | null) => {
    if (newUser) push('/notes');
});
</script>

/**
* Template
*/
<template>
    <div class="home">
        <form class="form">
            <img src="../assets/images/noootes_logo.svg" alt="Noootes logo" class="logo">
            <h1 class="form__title">Welcome to Noootes</h1>
            <p class="form__desc">A simple note-taking app shamelessly inspired by Miro — minimal, no clutter, just
                sticky notes.</p>
            <button type="button" class="login-btn" @click="signInWithGoogle">
                <span class="login-btn__icon">
                    <img src="../assets/icons/google-logo.svg" alt="Google logo icon">
                </span>
                <span class="login-btn__text">Sign in with Google</span>
            </button>
            <span class="privacy-policy">By signing up you accept our <router-link to="/privacy-policy">privacy policy</router-link>.</span>
        </form>
    </div>
</template>

/**
* Style
*/
<style scoped>
.home {
    height: 100dvh;
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4%;
    background-color: var(--neutral-200, #eee);
}

.logo {
    width: 48px;
    height: auto;
}

.form {
    max-width: 448px;
    padding: 40px;
    border: 2px solid var(--neutral-900);
    border-radius: var(--border-radius-l);
    background-color: var(--neutral-100, #fff);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}

.form__title,
.form__desc {
    text-align: center;
}

.form__desc {
    margin: 0 0 16px 0;
}

.login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;
    font-weight: 600;
    background-color: var(--accent-400);
    color: var(--neutral-100, #fff);
    padding: 8px 16px;
    border-radius: var(--border-radius-m);

    &:disabled {
        cursor: not-allowed;
        opacity: .5;
    }

    &:hover {
        background-color: var(--accent-500);
    }
}

.login-btn__icon {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--neutral-100, #fff);
    border-radius: 100%;
    padding: 4px;
}

.privacy-policy {
    cursor: pointer;
    font-size: .75rem;
    display: flex;
    align-items: center;
    gap: 4px;
}

@media screen and (max-width: 768px) {
    .form {
        padding: 40px 24px;
    }
}
</style>