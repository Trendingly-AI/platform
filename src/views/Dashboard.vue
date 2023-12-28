<script setup>
import { onMounted, ref } from 'vue';
import ProductService from '@/service/ProductService';
// import InsightList from '@/components/InsightList.vue';

const products = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});
</script>

<template>
    <div class="grid">
        <!-- STATISTICS -->
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">All Inisghts</span>
                        <div class="text-900 font-medium text-xl">152</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">24 new </span>
                <span class="text-500">since last visit</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">My Insights</span>
                        <div class="text-900 font-medium text-xl">17</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-user text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">+5 </span>
                <span class="text-500">since last week</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Knowledge Base</span>
                        <div class="text-900 font-medium text-xl">28,441</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">newly registered nodes</span>
            </div>
        </div>
        <!-- /STATISTICS -->
        <!-- TRENDING INSIGHTS -->
        <div class="col-12">

            <Card>
                <template #title>Trending Insights</template>
                <template #content>
                    <div class="grid">
                        <div class="md:col-4 sm:col-12">
                            <Card>
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
                                        <Button icon="pi pi-thumbs-up" class="mr-1" aria-label="Add" severity="success"
                                            size="large" rounded text />
                                        <Button icon="pi pi-thumbs-down" aria-label="Dislike" severity="danger" size="large"
                                            rounded text />
                                    </div>
                                </template>
                            </Card>
                        </div>
                        <div class="md:col-4 sm:col-12">
                            <Card>
                                <template #header>
                                    <img alt="user header" class="border-round" src="https://picsum.photos/285/200"
                                        style="width: 100%; height: auto;" />
                                </template>
                                <template #title>Fostering a Culture of Continuous Learning</template>
                                <template #subtitle>
                                    <Tag severity="success" value="Workforce Development"></Tag>
                                </template>
                                <template #content>
                                    <p class="m-0">
                                        Encourage ongoing employee development to adapt to changing market dynamics. This
                                        creates a
                                        workforce that is resilient, innovative, and capable driving business growth.
                                    </p>
                                </template>
                                <template #footer>
                                    <div class="text-center">
                                        <Button icon="pi pi-thumbs-up" class="mr-1" aria-label="Add" severity="success"
                                            size="large" rounded text />
                                        <Button icon="pi pi-thumbs-down" aria-label="Dislike" severity="danger" size="large"
                                            rounded text />
                                    </div>
                                </template>
                            </Card>
                        </div>
                        <div class="md:col-4 sm:col-12">
                            <Card>
                                <template #header>
                                    <img alt="user header" class="border-round" src="https://picsum.photos/295/200"
                                        style="width: 100%; height: auto;" />
                                </template>
                                <template #title>Leveraging Data-Driven Decision Making</template>
                                <template #subtitle>
                                    <Tag severity="warning" value="Data Analytics"></Tag>
                                </template>
                                <template #content>
                                    <p class="m-0">
                                        Utilize analytics and data insights to inform strategic decisions. This helps in
                                        identifying
                                        market trends, customer preferences, and operational
                                    </p>
                                </template>
                                <template #footer>
                                    <div class="text-center">
                                        <Button icon="pi pi-thumbs-up" class="mr-1" aria-label="Add" severity="success"
                                            size="large" rounded text />
                                        <Button icon="pi pi-thumbs-down" aria-label="Dislike" severity="danger" size="large"
                                            rounded text />
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <Toast />
        <!-- /TRENDING INSIGHTS -->
    </div>
</template>
