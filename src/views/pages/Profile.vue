<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { user } = useAuth0();
</script>
<template>
    <Card>
        <template #title>Profile</template>
        <template #content>
            <div class="grid">
                <div class="col-12 text-center">
                    <Avatar :image="user.picture" size="xlarge" shape="circle" />
                </div>
                <div class="col-12">
                    <div class="flex flex-column gap-2">
                        <label for="username">Username</label>
                        <InputText id="username" v-model="user.nickname" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="flex flex-column gap-2">
                        <label for="username">Name</label>
                        <InputText id="username" v-model="user.name" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="flex flex-column gap-2">
                        <label for="username">Email</label>
                        <InputText id="username" v-model="user.email" />
                    </div>
                </div>
                <div class="col-12 text-center">
                    <Button label="Update" />
                </div>
            </div>
        </template>
    </Card>
</template>
