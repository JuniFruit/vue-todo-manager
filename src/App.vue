<template>
  <Layout />
</template>

<script lang="ts">
import Layout from './modules/layout/Layout.vue';
import Vue from 'vue';
export default Vue.extend({
  name: 'App',

  components: {
    Layout: Layout
  },

  data() {
    return {
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Todo manager';
      }
    },
  }
})
</script>
