<template>
  <tr>
    <td>{{playerName}}</td>
    <td>{{run.date}}</td>
    <td
      v-for="gameTime in runtimes" :key="gameTime"
      style="text-align: right;"
    >
      {{runTimeFormatted(run.times[gameTime + "_t"])}}
    </td>
    <td><a v-bind:href="run.weblink">Link</a></td>
  </tr>
</template>
<script>
  import Utils from './store/utils.js'
  export default {
    props: {
      run: Object
    },
    computed: {
      playerName() {
        if(this.run.players.data[0].names){
          return this.run.players.data[0].names.international;
        }
        else {
          return this.run.players.data[0].name;
        }
      },
      runtimes() {
        return this.$store.state.game.ruleset["run-times"];
      },
    },
    methods: {
      runTimeFormatted(time) {
        return Utils.fancyTimeFormat(time);
      },
    }
  }
</script>
