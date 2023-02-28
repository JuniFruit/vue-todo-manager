<template>
    <PersonCards v-bind:team="team" />
</template>


<script lang="ts">
import PersonCards from '@/components/person-cards/PersonCards.vue';
import { dummyTeam } from './dummyTeam.data'
export default {
    components: {
        PersonCards
    },
    data() {
        return {
            team: dummyTeam
        }
    },
    methods: {

    }
}
</script>