<template>
  <tr>
    <td>{{playerName}}</td>
    <td>{{run.date}}</td>
    <td style="text-align: right;">{{runTimeFormatted}}</td>
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
      runTimeFormatted() {
        return Utils.fancyTimeFormat(this.run.times.realtime_t);
      },
      playerName() {
        if(this.run.players.data[0].names){
          return this.run.players.data[0].names.international;
        }
        else {
          return this.run.players.data[0].name;
        }
      }
    }
  }
</script>
