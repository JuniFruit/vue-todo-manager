<template>
    <nav>
        <Toast />
        <v-toolbar flat>
            <v-app-bar-nav-icon class="primary--text" @click="isMenuOpen = !isMenuOpen"></v-app-bar-nav-icon>
            <v-toolbar-title class="primary--text pl-1">
                <span class="font-weight-bold">TODO</span>
                <span>APP</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <Dropdown />

        </v-toolbar>
        <v-navigation-drawer app class="primary" v-model="isMenuOpen">
            <NavMenu />
        </v-navigation-drawer>
    </nav>
</template>


<script lang="ts">
import NavMenu from './menu/NavMenu.vue';
import Dropdown from './menu/Dropdown.vue';
import Toast from './menu/Toast.vue';
export default {
    name: 'Header',
    data() {
        return {
            isMenuOpen: false,

        }

    },
    components: {
        NavMenu,
        Dropdown,
        Toast
    }

}


</script>