/** Libraries */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

/** Guards */
import { userGuard } from './guards';

/** Router */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('./views/HomeView.vue')
    },
    {
        path: '/notes',
        name: 'notes',
        component: () => import('./views/NotesView.vue'),
        beforeEnter: userGuard
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: () => import('./views/PrivacyPolicyView.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;