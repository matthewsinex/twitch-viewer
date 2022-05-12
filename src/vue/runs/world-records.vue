<template>
  <div class="column is-two-thirds-tablet">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">World Record Progression</p>
      </header>
      <div class="card-content">
    <table class='table is-narrow is-striped is-fullwidth'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th
            v-for="gameTime in runtimes" :key="gameTime"
          >
            {{gameTime}}
          </th>
          <th>Status</th>
          <th>Link</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <RunRow
          v-for="run in worldRecordRuns"
          v-bind:key="run.id"
          v-bind:run="run"
        >
      </RunRow>
      </tbody>
    </table>
    <WorldRecordChart
      v-bind:runs="worldRecordRuns"
      v-bind:category-id="categoryId"
      v-bind:category-name="categoryName"
    >
    </WorldRecordChart>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" v-on:click.prevent="generateBatchDownload">Download</a>
    </footer>
  </div>
  </div>
</template>
<script>
import WorldRecordRunRow from './world-record-run-row.vue'
import RunRow from './run-row.vue'
import WorldRecordChart from './world-record-chart.vue'
import Utils from './store/utils.js'

export default {
  props: {
    runs: Array,
    categoryId: String,
    categoryName: String
  },
  computed: {
    worldRecordRuns() {
      let verifiedRuns =
        this.runs.filter(r => r.status.status == "verified" && r.date != null);

      verifiedRuns.sort((a,b) => {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      });

      var worldRecords = [];

      worldRecords.push(verifiedRuns[0]);
      verifiedRuns.forEach(x => {
        var lastEl = worldRecords[worldRecords.length - 1];
        if(x.times.primary_t < lastEl.times.primary_t) {
          worldRecords.push(x);
        }
      })
      return worldRecords;
    },
    runtimes() {
      return this.$store.state.game.ruleset["run-times"];
    },
  },
  components: {
    WorldRecordRunRow,
    RunRow,
    WorldRecordChart
  },
  methods: {
    generateBatchDownload() {
      Utils.generateBatchDownload(this.worldRecordRuns);
    }
  }
}
</script>
