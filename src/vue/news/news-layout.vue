<template>
  <div>
    <section>
      <div class="container">
        <h1 class="title">Speedrun News</h1>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="title">r/speedrun</h2>
          <RedditTable v-bind:posts="this.$store.state.top_reddit_speedrun_posts"></RedditTable>
      </div>
    </section>
  </div>
</template>
<script>
  import RedditTable from './reddit-table.vue'

  export default {
    mounted(){
      this.$store.dispatch("GET_REDDIT_POSTS");
    },
    components: {
      RedditTable
    }
  }
</script>
