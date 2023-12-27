<script setup>
import { ref, onMounted } from "vue";
// import { ProductService } from '@/service/ProductService';
import InsightsService from '@/service/InsightsService';

let insightsService = new InsightsService();
onMounted(() => {
    insightsService.getInsightsSmall().then((data) => (insights.value = data));
});

const insights = ref();
</script>
<template>
    <DataView :value="insights">
        <template #list="slotProps">
            <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
                        :class="{ 'border-top-1 surface-border': index !== 0 }">
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ item.title }}</div>
                                <div class="flex align-items-center gap-3">
                                    <Tag :value="item.tag"></Tag>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">${{ item.tag }}</span>
                                <Button icon="pi pi-shopping-cart" rounded></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>
