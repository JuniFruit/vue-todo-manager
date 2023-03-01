<template>
    <div class="projects">
        <h1 class="subheader grey--text">Projects</h1>

        <v-container class="my-10">
            <v-layout row class="mb-7">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn depressed small color="gray" class="grey--text caption"
                            @click="isUserProjects = !isUserProjects">
                            <v-icon left small>mdi-folder</v-icon>
                            <span class="caption text-lowercase">{{ isUserProjects ? 'See all' : 'See mine' }}</span>
                        </v-btn>
                    </template>
                    <span>Sort projects by their name</span>
                </v-tooltip>

            </v-layout>

            <Collapsable :projects="personalProjects" @on-delete="handleDelete" />
        </v-container>

    </div>
</template>
  
<script lang="ts">
//@ts-nocheck
import Collapsable from '@/components/projects-list/collapsable/Collapsable.vue';
import db from '@/firebase.init';
import { mutations, store } from '@/store/store';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
export default {
    name: 'Projects',

    components: {
        Collapsable
    },
    data() {
        return {
            isUserProjects: false,
            projects: []
        }
    },
    computed: {
        personalProjects: function () {
            return this.projects.filter(project => this.isUserProjects ? project.person === 'User' : true)
        }
    },
    methods: {
        handleDelete(id) {

            deleteDoc(doc(db, "projects", id))
                .then((res) => { mutations.setToast('Successfully deleted!'), mutations.deleteProjectById(id) })
                .catch((e) => mutations.setToast(e.message, 'error'))
        }
    },
    async created() {
        const cached = store.projects;
        if (cached.length) return this.projects = cached;
        const querySnapshot = await getDocs(collection(db, "projects"));
        if (!querySnapshot) return;
        const docs = []
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        })
        this.projects = docs
        mutations.setProjects(docs)
    }
}
</script>
  