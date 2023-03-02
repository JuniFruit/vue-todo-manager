<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" class="primary--text mx-4" depressed v-bind="attrs" v-on="on">
                <v-icon left>mdi-chevron-down</v-icon>
                <span>Menu</span>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="item in menuLinks" :key="item.link" :ripple="false"
                active-class="primary lighten-4 dark--text" router :to="item.link">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { menuLinks } from './menu.data';

export default Vue.extend({
    data() {
        return {
            menuLinks
        }
    }
})
</script>