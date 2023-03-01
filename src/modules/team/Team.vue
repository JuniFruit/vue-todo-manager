<template>
    <PersonCards v-bind:team="team" />
</template>


<script lang="ts">
//@ts-nocheck

import { IPersonInfo } from '@/components/person-cards/Cards.interface';
import PersonCards from '@/components/person-cards/PersonCards.vue';
import db from '@/firebase.init';
import { mutations, store } from '@/store/store';
import { collection, getDocs } from '@firebase/firestore';
export default {
    components: {
        PersonCards
    },
    data() {
        return {
            team: []
        }
    },
    methods: {

    },
    async created() {
        const cached = store.users;
        if (cached.length) return this.team = cached;
        const querySnapshot = await getDocs<IPersonInfo>(collection(db, "users"));
        if (!querySnapshot) return;
        const docs: IPersonInfo[] = []
        querySnapshot.forEach((doc) => {
            docs.push(doc.data())
        })
        this.team = docs
        mutations.setUsers(docs)
    }
}
</script>