<script setup>
import InsightCard from '../../components/InsightCard.vue';
</script>

<template>
    <TabView :scrollable="true">
        <TabPanel header="For Me">
            <InsightCard></InsightCard>
        </TabPanel>
        <TabPanel header="Artificial Intelligence">
            <InsightCard></InsightCard>
        </TabPanel>
        <TabPanel header="Health">
            <InsightCard></InsightCard>
        </TabPanel>
    </TabView>
</template>

<style scoped>
.swipe-right {
    animation: swipeRight 0.5s forwards;
}

.swipe-left {
    animation: swipeLeft 0.5s forwards;
}

@keyframes swipeRight {
    0% {
        transform: translateX(0) rotate(0);
    }

    100% {
        transform: translateX(100vw) rotate(20deg);
        opacity: 0;
    }
}

@keyframes swipeLeft {
    0% {
        transform: translateX(0) rotate(0);
    }

    100% {
        transform: translateX(-100vw) rotate(-20deg);
        opacity: 0;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
        /* Adjust this value for larger or smaller float */
    }
}
</style>
