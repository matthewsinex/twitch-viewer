<template>
  <tr>
    <td>{{playerName}}</td>
    <td>{{run.date}}</td>
    <td
      v-for="gameTime in runtimes" :key="gameTime"
      style="text-align: right;"
    >
      {{runTimeFormatted(run.times[gameTime], run.times[gameTime + "_t"])}}
    </td>
    <td>{{run.status.status}}</td>
    <td><a v-bind:href="run.weblink">Link</a></td>
    <td><a href="#" v-on:click.prevent="generateBatchDownload">Download</a></td>
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
      }
    },
    methods: {
      generateBatchDownload() {
        var link = Utils.generateDownloadLink(this.run);
        Utils.copyToClipboard(link);

        alert('yt-dlp command copied to clipboard. Paste into a batch file or command prompt and run to download video.');
      },
      runTimeFormatted(timeDisplay, timeInSeconds) {
        if(timeDisplay == null) {
          return "---";
        }
        return Utils.fancyTimeFormat(timeInSeconds);
      },
    }
  }
</script>
