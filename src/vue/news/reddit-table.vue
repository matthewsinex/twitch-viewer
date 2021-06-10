<template>
  <table class="table">
    <thead>
      <tr>
        <th>Score</th>
        <th>Title</th>
        <th>Author</th>
      </tr>
    </thead>
    <tbody>
      <RedditTableRow
        v-for="post in posts"
        v-bind:id="post.id"
        v-bind:post="post"
      >
      </RedditTableRow>
  </tbody>
  </table>
</template>
<script>
  import RedditTableRow from './reddit-table-row.vue'

  export default {
    props: {
      posts: Array
    },
    components: {
      RedditTableRow
    }
  }
</script>
