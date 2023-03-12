<template>
    <div>
        <v-card flat v-for="project in projects" :key="project.title">
            <v-layout row wrap :class="`pa-3 project ${project.status}`">
                <v-flex xs12 md6>
                    <div class="caption grey--text">Project title</div>
                    <div>{{ project.title }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Person</div>
                    <div>{{ project.person }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Due</div>
                    <div>{{ project.due }}</div>
                </v-flex>
                <v-flex xs2 sm4 md2>
                    <div class="chip right">
                        <v-chip right small :class="`${project.status} white--text caption my-2`">
                            {{ project.status }}

                        </v-chip>
                    </div>
                </v-flex>
            </v-layout>

        </v-card>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue';
import { IProjectItem } from './List.interface'
export default Vue.extend({
    name: 'ProjectsList',
    props: {
        projects: {
            required: true,
            type: Array as PropType<IProjectItem[]>
        }
    },
    data() {
        return {

        }
    }

})

</script>

<style scoped lang="scss">
@import './List.scss';
</style>