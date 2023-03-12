<template>
    <v-app>
        <v-main>
            <app-header />
            <div class="px-3 py-5">
                <router-view />
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Header from '@/components/header/Header.vue';

export default {
    name: 'Layout',
    components: {
        'app-header': Header
    }
}

</script>