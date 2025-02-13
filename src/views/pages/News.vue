<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import NewsService from '@/service/NewsService';

let newsService = new NewsService();
onMounted(() => {
    newsService.getAllNews().then((data) => (news.value = data));
});

const news = ref();
const selectedNews = ref([]);
const selectedUrls = ref([]);
const toast = useToast();

watch(selectedNews, (newVal, oldVal) => {
    if (newVal.length > 3) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'You can select up to 3 items only', life: 3000 });
        selectedNews.value = oldVal;
    } else {
        selectedUrls.value = newVal.map((item) => item.url);
    }
});

const onRowUnselect = (event) => {
    selectedUrls.value = selectedUrls.value.filter((url) => url !== event.data.url);
};

const loading = ref(false);

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};

const data = ref({
    label: 'Apple',
    children: [
        {
            label: 'iPhone',
            children: [
                {
                    label: 'iPhone XR'
                },
                {
                    label: 'iPhone PRO'
                }
            ]
        }
    ]
});

const steps = ref([
    {
        label: 'Select the subject'
    },
    {
        label: 'Select the news'
    },
    {
        label: 'Generate insights'
    },
    {
        label: 'Save or share'
    }
]);

const loadingNews = ref(false);

const selectedButton = ref('All');

const fetchNews = async (q) => {
    if (q === '' || q === undefined) {
        selectedButton.value = 'All';
    } else {
        selectedButton.value = q;
    }

    loadingNews.value = true;
    try {
        news.value = await newsService.getAllNews(q);
        loadingNews.value = false;
    } catch (error) {
        console.error(error);
        loadingNews.value = false;
    }
};
</script>
<template>
    <div class="card">
        <Steps :model="steps" />
    </div>
    <div class="grid">
        <div class="col-12">
            <Card>
                <template #title>News</template>
                <template #subtitle>
                    <p>Find the top news from the web and explore the trends!</p>
                </template>
                <template #content>
                    <div class="grid">
                        <div class="col-12">
                            <Toolbar>
                                <template #center>
                                    <Button label="All" severity="info" class="mr-2" @click="fetchNews()"
                                        :outlined="selectedButton !== 'All'" />
                                    <Button label="Marketing" severity="info" class="mr-2" @click="fetchNews('Marketing')"
                                        :outlined="selectedButton !== 'Marketing'" />
                                    <Button label="AI" severity="info" class="mr-2" @click="fetchNews('AI')"
                                        :outlined="selectedButton !== 'AI'" />
                                    <Button label="Finance" severity="info" class="mr-2" @click="fetchNews('Finance')"
                                        :outlined="selectedButton !== 'Finance'" />
                                    <Button label="Sales" severity="info" class="mr-2" @click="fetchNews('Sales')"
                                        :outlined="selectedButton !== 'Sales'" />
                                    <Button label="Human Resources" severity="info" class="mr-2"
                                        @click="fetchNews('Human Resources')"
                                        :outlined="selectedButton !== 'Human Resources'" />
                                    <Button label="Retail" severity="info" class="mr-2" @click="fetchNews('Retail')"
                                        :outlined="selectedButton !== 'Retail'" />
                                    <Button label="Health" severity="info" @click="fetchNews('Health')"
                                        :outlined="selectedButton !== 'Health'" />
                                </template>
                            </Toolbar>
                        </div>
                        <div class="col-12">
                            <DataTable v-model:selection="selectedNews" :value="news" @rowUnselect="onRowUnselect"
                                dataKey="title" :loading="loadingNews">
                                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                                <Column field="title" header="Title"></Column>
                                <Column field="source.name" header="Source"></Column>
                                <Column field="url" header="URL">
                                    <template #body="slotProps">
                                        {{ slotProps.data.url }}
                                        <a :href="slotProps.data.url" target="_blank" rel="noopener noreferrer">
                                            <i class="pi pi-external-link text-primary" style="font-size: 0.8rem"></i>
                                        </a>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                        <div class="col-12 text-center m-3">
                            <Button label="Generate Insight" :loading="loading" @click="load" />
                        </div>
                        <Toast />
                    </div>
                </template>
            </Card>
        </div>
        <div class="col-12">
            <Card>
                <template #title>Insights</template>
                <template #subtitle>Here are your insights based on the content you selected.</template>
                <template #content>
                    <TabView>
                        <TabPanel header="Graph">
                            <OrganizationChart :value="data">
                                <template #default="slotProps">
                                    <span>{{ slotProps.node.label }}</span>
                                </template>
                            </OrganizationChart>
                            <p class="m-0 text-center">
                                Made with <span class="text-blue-900 font-semibold">TRENDINGLY</span>
                                <span class="text-red-600 font-semibold">AI</span>
                            </p>
                        </TabPanel>
                        <TabPanel header="Insights">
                            <ol>
                                <li class="line-height-3 mb-3">
                                    <strong>Embracing Technological Innovation</strong>: Staying ahead in the competitive
                                    business landscape requires adopting and integrating the latest technologies. This
                                    approach can streamline operations,
                                    enhance customer experiences, and open new markets.
                                    <Tag severity="primary" value="Technology Adoption"></Tag>
                                </li>
                                <li class="line-height-3 mb-3">
                                    <strong>Fostering a Culture of Continuous Learning</strong>: Encourage ongoing employee
                                    development to adapt to changing market dynamics. This creates a workforce that is
                                    resilient, innovative, and capable
                                    driving business growth.
                                    <Tag severity="primary" value="Workforce Development"></Tag>
                                </li>
                                <li class="line-height-3 mb-3">
                                    <strong>Leveraging Data-Driven Decision Making</strong>: Utilize analytics and data
                                    insights to inform strategic decisions. This helps in identifying market trends,
                                    customer preferences, and operational
                                    <Tag severity="primary" value="Data Analytics"></Tag>
                                </li>
                            </ol>
                        </TabPanel>
                    </TabView>
                </template>
                <template #footer>
                    <div class="text-center">
                        <Button icon="pi pi-save" label="Save" :loading="loading" @click="load" />
                        <Button icon="pi pi-share-alt" label="Share" severity="success" style="margin-left: 0.5em"
                            :loading="loading" @click="load" />
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
