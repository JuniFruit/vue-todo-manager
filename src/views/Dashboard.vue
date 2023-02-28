<template>
  <div class="dashboard">
    <h1 class="subheader grey--text">Dashboard</h1>

    <v-container class="my-10">
      <Projects />
    </v-container>

  </div>
</template>

<script lang="ts">
import Projects from '@/modules/projects/Projects.vue';

export default {
  name: 'Dashboard',

  components: {
    Projects
  },
  data() {
    return {
    }
  }
}
</script>
