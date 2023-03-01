<template>
    <v-expansion-panels>
        <v-expansion-panel v-for="project in projects" :key="project.title">
            <v-expansion-panel-header>
                {{ project.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-card flat>
                    <v-card-text class="px-4 gray--text">
                        <div class="font-weight-bold">Due to {{ project.due }}</div>
                        <div>{{ project.content }}</div>
                    </v-card-text>
                    <v-flex row justify-end>
                        <v-btn @click="onDelete(project.id)" small depressed caption class="grey--text">Delete</v-btn>
                    </v-flex>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>


<script lang="ts">
//@ts-nocheck
import { IProjectItem } from '@/modules/projects/Projects.interface';
import { PropType } from 'vue';


export default {
    props: {
        projects: {
            type: Array as PropType<IProjectItem[]>
        }
    },
    methods: {
        onDelete(id: string) {
            this.$emit('on-delete', id)
        }
    }

}
</script>