<template>
    <v-snackbar v-model="toastOpen" :color="toastType" top rounded="pill" elevation-14>
        {{ msg }}

        <template v-slot:action="{ attrs }">
            <v-btn :timeout="4000" :color="toastType" dark depressed v-bind="attrs" @click="clear">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>


<script lang="ts">
import Vue from 'vue';
import { mutations, store } from '@/store/store';
export default Vue.extend({
    name: 'Toast',
    data() {
        return {
        }
    },
    computed: {
        toastOpen: {
            get: () => !!store.toastMsg,
            set: () => mutations.clearToast()
        },
        toastType: () => store.toastType,
        msg: () => store.toastMsg
    },
    methods: {
        clear: () => {
            mutations.clearToast()
        }
    }
})
</script>