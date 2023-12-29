<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'What is Trendingly?', icon: 'pi pi-fw pi-chart-line', to: '/' },
            { label: 'My Feed', icon: 'pi pi-fw pi-mobile', to: '/feed' }
        ]
    },
    {
        label: 'Generate Insights',
        items: [
            { label: 'News', icon: 'pi pi-fw pi-book', to: '/news' },
            { label: 'Knowledge Base', icon: 'pi pi-fw pi-globe', to: '/knowledge-base' }
        ]
    },
    {
        label: 'Review Insights',
        items: [{ label: 'My Insights', icon: 'pi pi-fw pi-database', to: '/my-insights' }]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
