<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import InsightsService from '@/service/InsightsService';

let insightsService = new InsightsService();
onMounted(() => {
    insightsService.getInsightsSmall().then((data) => (insights.value = data));
});

const toast = useToast();
const dt = ref();
const insights = ref();
const insightDialog = ref(false);
const deleteInsightDialog = ref(false);
const deleteInsightsDialog = ref(false);
const insight = ref({});
const selectedInsights = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);

const openNew = () => {
    insight.value = {};
    submitted.value = false;
    insightDialog.value = true;
};
const hideDialog = () => {
    insightDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (insight.value.title.trim()) {
        if (insight.value._id) {
            insightsService.updateInsight(insight.value).then((updatedInsight) => {
                insights.value[findIndexById(updatedInsight._id)] = updatedInsight;
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Insight Updated', life: 3000 });
            });
        } else {
            insightsService.saveInsight(insight.value).then((newInsight) => {
                insights.value.push(newInsight);
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Insight Created', life: 3000 });
            });
        }

        insightDialog.value = false;
        insight.value = {};
    }
};
const editInsight = (ins) => {
    insight.value = { ...ins };
    insightDialog.value = true;
};
const confirmDeleteInsight = (ins) => {
    insight.value = ins;
    deleteInsightDialog.value = true;
};
const deleteInsight = () => {
    insightsService.deleteInsight(insight.value._id).then(() => {
        insights.value = insights.value.filter((val) => val._id !== insight.value._id);
        deleteInsightDialog.value = false;
        insight.value = {};
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Insight Deleted', life: 3000 });
    });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < insights.value.length; i++) {
        if (insights.value[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
};

const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteInsightsDialog.value = true;
};
const deleteSelectedInsights = () => {
    const selectedIds = selectedInsights.value.map((insight) => insight._id);
    insightsService.deleteInsights(selectedIds).then(() => {
        insights.value = insights.value.filter((val) => !selectedIds.includes(val._id));
        deleteInsightsDialog.value = false;
        selectedInsights.value = null;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Insights Deleted', life: 3000 });
    });
};
</script>
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedInsights || !selectedInsights.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-download" severity="help" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="insights" v-model:selection="selectedInsights" dataKey="title" :paginator="true"
                :rows="5" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} insights">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">My Insights</h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="title" header="Title" sortable style="min-width: 12rem"></Column>
                <Column field="content" header="Content" sortable style="min-width: 16rem"></Column>
                <Column field="tag" header="Tag" sortable style="min-width: 8rem"></Column>
                <Column :exportable="false" style="min-width: 10rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editInsight(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteInsight(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <!-- ADD/UPDATE INSIGHTS DIALOG -->
        <Dialog v-model:visible="insightDialog" :style="{ width: '450px' }" header="Inisght Details" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="title">Title</label>
                <InputText id="title" v-model.trim="insight.title" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !insight.title }" />
                <small class="p-error" v-if="submitted && !insight.title">Title is required.</small>
            </div>
            <div class="field">
                <label for="content">Content</label>
                <Textarea id="content" v-model="insight.content" required="true" rows="5" cols="20"
                    :class="{ 'p-invalid': submitted && !insight.content }" />
                <small class="p-error" v-if="submitted && !insight.content">Content is required.</small>
            </div>
            <div class="field">
                <label for="tag">Tag</label>
                <InputText id="tag" v-model.trim="insight.tag" required="true"
                    :class="{ 'p-invalid': submitted && !insight.tag }" />
                <small class="p-error" v-if="submitted && !insight.tag">Tag is required.</small>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" severity="danger" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template>
        </Dialog>
        <!-- /ADD/UPDATE INSIGHTS DIALOG -->

        <!-- DELETE INSIGHT DIALOG -->
        <Dialog v-model:visible="deleteInsightDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="insight">
                    Are you sure you want to delete <b>{{ insight.title }}</b>?
                </span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteInsightDialog = false" />
                <Button label="Yes" icon="pi pi-check" severity="danger" text @click="deleteInsight" />
            </template>
        </Dialog>
        <!-- /DELETE INSIGHT DIALOG -->

        <!-- DELETE INSIGHTS DIALOG -->
        <Dialog v-model:visible="deleteInsightsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="insight">Are you sure you want to delete the selected insights?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteInsightsDialog = false" />
                <Button label="Yes" icon="pi pi-check" severity="danger" text @click="deleteSelectedInsights" />
            </template>
        </Dialog>
        <!-- /DELETE INSIGHTS DIALOG -->
    </div>
    <Toast />
</template>
