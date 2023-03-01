<template>
  <div class="teamPage">
    <h1 class="subheader grey--text">Team</h1>

    <v-container class="my-10">
      <Team />
    </v-container>

  </div>
</template>

<script lang="ts">
import Team from '@/modules/team/Team.vue';
export default {
  name: 'TeamPage',

  components: {
    Team
  },
  data() {
    return {
    }
  }
}
</script>
