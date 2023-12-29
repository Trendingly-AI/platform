import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { createAuthGuard } from '@auth0/auth0-vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/feed',
                    name: 'feed',
                    component: () => import('@/views/Dashboard.vue'),
                    beforeEnter: createAuthGuard()
                },
                {
                    path: '/',
                    name: 'intro',
                    component: () => import('@/views/pages/Intro.vue'),
                    beforeEnter: createAuthGuard()
                },
                {
                    path: '/news',
                    name: 'news',
                    component: () => import('@/views/pages/News.vue'),
                    beforeEnter: createAuthGuard()
                },
                {
                    path: '/my-insights',
                    name: 'My Insights',
                    component: () => import('@/views/pages/MyInsights.vue'),
                    beforeEnter: createAuthGuard()
                },
                {
                    path: '/knowledge-base',
                    name: 'Knowledge Base',
                    component: () => import('@/views/pages/KnowledgeBase.vue'),
                    beforeEnter: createAuthGuard()
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('@/views/pages/Profile.vue'),
                    beforeEnter: createAuthGuard()
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
