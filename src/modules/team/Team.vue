<template>
    <PersonCards v-bind:team="team" />
</template>


<script lang="ts">
import Vue from 'vue'
import PersonCards from '@/components/person-cards/PersonCards.vue';
import { Firestore } from '@/services/firestore.service';
import { store } from '@/store/store';
export default Vue.extend({
    components: {
        PersonCards
    },
    computed: {
        team() {
            return store.users
        }
    },
    async created() {
        await Firestore.getUsers()
    }
})
</script>