<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
let swipeDirection = ref(null);
let cardAnimation = ref(null);

const handleSwipeLeft = () => {
    swipeDirection.value = 'left';
    cardAnimation.value = 'swipe-left';
    toast.add({ severity: 'error', summary: 'Insight', detail: 'Insight discarded', life: 3000 });
};

const handleSwipeRight = () => {
    swipeDirection.value = 'right';
    cardAnimation.value = 'swipe-right';
    toast.add({ severity: 'success', summary: 'Insight', detail: 'Insight added to your list', life: 3000 });
};

const afterLeave = () => {
    swipeDirection.value = null;
};
</script>
<template>
    <Transition name="swipe" @after-leave="afterLeave">
        <Card v-if="swipeDirection === null" v-touch:swipe.left="handleSwipeLeft" v-touch:swipe.right="handleSwipeRight"
            :class="cardAnimation">
            <template #header>
                <img alt="user header" class="border-round" src="https://picsum.photos/290/200"
                    style="width: 100%; height: auto;" />
            </template>
            <template #title>Embracing Technological Innovation</template>
            <template #subtitle>
                <Tag severity="primary" value="Technology Adoption"></Tag>
            </template>
            <template #content>
                <p class="m-0">Staying ahead in the competitive business landscape requires adopting and
                    integrating
                    the latest technologies. This approach can streamline operations, enhance customer
                    experiences,
                    and open new markets.</p>
            </template>
            <template #footer>
                <div class="text-center">
                    <Button icon="pi pi-thumbs-down" aria-label="Dislike" severity="danger" size="large" rounded text />
                    <Button icon="pi pi-thumbs-up" class="mr-1" aria-label="Add" severity="success" size="large" rounded
                        text />
                </div>
            </template>
        </Card>
    </Transition>
    <Toast position="bottom-center" />
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
</style>
