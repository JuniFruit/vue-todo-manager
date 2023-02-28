<template>
    <nav>
        <v-toolbar>
            <v-app-bar-nav-icon class="green--text" @click="isMenuOpen = !isMenuOpen"></v-app-bar-nav-icon>
            <v-toolbar-title class="green--text">
                <span class="font-weight-light">TODO</span>
                <span>App</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn>
                <span>Log in</span>
                <v-icon right>mdi-antenna</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer app class="indigo" v-model="isMenuOpen">
            <NavMenu />
        </v-navigation-drawer>
    </nav>
</template>


<script lang="ts">

import NavMenu from './menu/NavMenu.vue';

export default {
    data() {
        return {
            isMenuOpen: false
        }

    },
    components: {
        NavMenu
    }
}


</script>