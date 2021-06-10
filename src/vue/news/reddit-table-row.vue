<template>
  <tr>
    <td>{{post.score}}</td>
    <td>
      <a v-bind:href="permalink()">
        {{post.title}}
      </a>
    </td>
    <td>{{post.author}}</td>
  </tr>
</template>
<script>
  export default {
    props: {
      post: Object
    },
    methods: {
      convertUnixToDate(unixTimeStamp){
        let milliseconds = unixTimeStamp * 1000;
        let dateObject = new Date(milliseconds);
        let humanDateFormat = dateObject.toLocaleString([], {month: "2-digit", day: "2-digit"});
        return humanDateFormat;
      },
      permalink() {
        return 'https://reddit.com' + this.post.permalink;
      }
    }
  }
</script>
