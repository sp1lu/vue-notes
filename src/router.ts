import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

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
        component: () => import('./views/NotesView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/AboutView.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;