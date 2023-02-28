<template>
    <section>
        <v-layout row class="mb-7">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small depressed color="gray" v-bind="attrs" v-on="on" @click="sortBy('title')">
                        <v-icon left small>mdi-folder</v-icon>
                        <span class="caption text-lowercase">By project name</span>
                    </v-btn>
                </template>
                <span>Sort projects by their name</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed small v-bind="attrs" v-on="on" color="gray" @click="sortBy('person')">
                        <v-icon left small>mdi-account</v-icon>
                        <span class="caption text-lowercase">By person</span>
                    </v-btn>

                </template>
                <span>Sort projects by their carrier</span>
            </v-tooltip>
        </v-layout>
        <ProjectsList v-bind:projects="projects" />
    </section>
</template>


<script lang="ts">
//@ts-nocheck
import ProjectsList from '@/components/projects-list/ProjectsList.vue';
import { dummyProjects } from './dummy.data';

export default {
    components: {
        ProjectsList
    },
    data() {
        return {
            projects: dummyProjects
        }
    },
    methods: {
        sortBy(prop: 'person' | 'title') {
            this.projects.sort((a: any, b: any) => (a as any)[prop] < (b as any)[prop] ? -1 : 1)
        }
    }
}
</script>