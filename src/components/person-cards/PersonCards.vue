<template>
    <v-layout row>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
            <v-card class="text-xs text-center ma-3 pa-4">
                <v-responsive>
                    <v-avatar size="avatarSize" color="gray lighten-2">
                        <img :src="person.avatar" alt="profile avatar">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="subheading">{{ person.name }}</div>
                    <div class="grey--text">{{ person.role }}</div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="gray" @click="onMessage(person.name)" class="grey--text" :ripple="false" depressed>
                        <v-icon small left>mdi-message</v-icon>
                        <span>Message</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { mutations } from '@/store/store';
import { PropType } from 'vue';
import { IPersonInfo } from './Cards.interface';
export default {
    props: {
        team: {
            required: true,
            type: Array as PropType<IPersonInfo[]>
        }
    },
    data() {
        return {

        }
    },
    methods: {
        onMessage: (person: string) => {
            mutations.setToast(`Sorry, ${person} is busy right now. Try again later`, 'error')
        }
    }
}

</script>
