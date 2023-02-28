<template>
    <div>
        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar size="100">
                    <img src="https://www.gravatar.com/avatar/4d2393d211ba4cd39cb26d02d1812fbd?s=140&d=retro" alt="">
                </v-avatar>
            </v-flex>
            <span class="white--text">User</span>
        </v-layout>
        <v-list>
            <v-list-item v-for="menuItem in links" :key="menuItem.link" router :to="menuItem.link">
                <v-list-item-action>
                    <v-icon class="white--text">{{ menuItem.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text">
                        {{ menuItem.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>


<script lang="ts">
import { menuLinks } from './menu.data';

export default {
    data() {
        return {
            links: menuLinks
        }
    }
}


</script>