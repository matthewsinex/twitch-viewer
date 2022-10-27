<template>
  <div>
    <div class="container">
      <h2 class="title">{{game.names.international}}</h2>
      <h3 class="subtitle">
        <a v-bind:href="'/runs.html?gameid=' + game.id">Direct Link</a>
      </h3>
    </div>
    <div class="container" v-if="$store.state.isLoading">
      <p style="margin-top: 0.5rem;">
        Loading...
      </p>
    </div>
    <Category
      v-for="category in runs"
      v-bind:category="category"
      v-bind:key="category[0]"
    >
    </Category>
  </div>
</template>
<script>
import Category from './category.vue'
export default {
  computed: {
    runs() {
      return this.$store.state.runs;
    },
    game() {
      return this.$store.state.game;
    }
  },
  components: {
    Category
  }
}
</script>
