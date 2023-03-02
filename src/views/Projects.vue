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

            <Collapsable :projects="projects" @on-delete="handleDelete" :is-delete-loading="isDeleteLoading" />
        </v-container>

    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import Collapsable from '@/components/projects-list/collapsable/Collapsable.vue';
import { Firestore } from '@/services/firestore.service';
import { mutations, store } from '@/store/store';
import { IProjectItem } from '@/components/projects-list/List.interface';


export default Vue.extend({
    name: 'Projects',

    components: {
        Collapsable
    },
    data() {
        return {
            isUserProjects: false,
            isDeleteLoading: false
        }
    },
    computed: {
        projects(): IProjectItem[] {
            return store.projects.filter(project => this.isUserProjects ? project.person === 'User' : true)
        }
    },
    methods: {
        async handleDelete(id: string) {
            this.isDeleteLoading = true
            const { isError, message } = await Firestore.deleteProject(id);
            if (isError) {
                mutations.setToast(message, 'error');
            } else {
                mutations.setToast('Successfully deleted!')
            }
            this.isDeleteLoading = false

        }
    },
    async created() {
        await Firestore.getProjects()
    }
})
</script>
  