<template>
    <v-dialog width="600px" v-model="isOpen">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="light-blue accent-3 text-button depressed " dark v-bind="attrs" v-on="on">
                Create a task
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5 white--text  primary ">
                Add a new project
            </v-card-title>

            <v-card-text class="mt-5">
                <v-form class="px-3" @submit.prevent="submit" ref="form">
                    <v-text-field name="Title" label="Title" v-model="title" :rules="inputRules"
                        prepend-icon="mdi-account"></v-text-field>
                    <v-textarea name="Information" label="Info" v-model="info" :rules="inputRules"
                        prepend-icon="mdi-pencil"></v-textarea>
                    <v-menu offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-on="on" v-bind="attrs" :rules="inputRules" name="Due" :value="fomatted"
                                prepend-icon="mdi-calendar" label="Due date"></v-text-field>
                        </template>
                        <v-date-picker v-model="due" color="primary lighten-2"></v-date-picker>
                    </v-menu>
                    <v-flex row justify-center>
                        <v-btn :loading="isLoading" type="submit" depressed color="primary my-5">Add a project</v-btn>

                    </v-flex>

                </v-form>
            </v-card-text>


        </v-card>
    </v-dialog>
</template>

<script lang="ts">
//@ts-nocheck
import Vue from 'vue';
import { IProjectItem } from '@/components/projects-list/List.interface';
import { Firestore } from '@/services/firestore.service';
import { mutations } from '@/store/store';
import { format } from 'date-fns';
export default Vue.extend({
    name: 'Dialog',
    data() {
        return {
            title: '',
            info: '',
            due: '',
            inputRules: [
                (v: any) => v?.length >= 3 || 'Minimum length is 3 characters'
            ],
            isLoading: false,
            isOpen: false,
            error: ''
        }
    },
    computed: {
        fomatted() {
            if (!this.due) return;
            const [y, m, d] = this.due.split('-').filter(item => item !== '-')
            return this.due ? format(new Date(+y, +m - 1, +d), "do MMM yyyy") : ''
        }
    },
    methods: {
        async submit() {
            //@ts-ignore
            if (this.$refs.form!.validate()) {
                this.isLoading = true;
                this.error = '';
                const [y, m, d] = this.due.split('-').filter(item => item !== '-')
                const project: IProjectItem = {
                    title: this.title,
                    person: 'User',
                    due: format(new Date(+y, +m - 1, +d), "do MMM yyyy"),
                    content: this.info,
                    status: 'ongoing',
                    id: '0'
                }
                const { isError, message } = await Firestore.addProject(project)
                if (isError) {
                    mutations.setToast(message, 'error')
                } else {
                    mutations.setToast('Successfully added!');
                    this.isOpen = false
                }
                this.isLoading = false

            }
        }
    }

})

</script>