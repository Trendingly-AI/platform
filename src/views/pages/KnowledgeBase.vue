<script setup>
import { ref } from 'vue';
import KnowledgeGraph from '../../components/KnowledgeGraph.vue';

const value = ref('Circle');
const options = ref(['Circle', 'Concentric', 'CoSE']);
</script>
<template>
    <Card>
        <template #title>Knowledge Base</template>
        <template #subtitle> Navigate through the graph by dragging the nodes around. Click on a node to get more
            information. </template>
        <template #content>
            <TabView>
                <TabPanel>
                    <template #header>
                        <i class="pi pi-sitemap mr-2"></i>
                        <span>Graph</span>
                    </template>
                    <Toolbar>
                        <template #start>
                            <SelectButton v-model="value" :options="options" />
                        </template>
                        <template #center>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText placeholder="Filter" />
                            </span>
                        </template>
                        <template #end>
                            <Button icon="pi pi-eraser" size="small" rounded class="mr-1" />
                            <Button icon="pi pi-download" size="small" rounded class="mr-1" />
                            <Button icon="pi pi-share-alt" size="small" rounded />
                        </template>
                    </Toolbar>
                    <KnowledgeGraph :layout="value" />
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <i class="pi pi-key mr-2"></i>
                        Insights
                    </template>
                </TabPanel>
            </TabView>
        </template>
    </Card>
</template>
