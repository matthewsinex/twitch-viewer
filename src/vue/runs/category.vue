<template>
  <section class="section">
    <div class="container">
      <h4 class="title is-4">{{category.category}}</h4>
      <div class="columns">
      <div class="column is-two-thirds-tablet">
      <div class="card">
      <div class="card-content">

      <VariableChooser
        v-for="variable in category.variables"
        v-bind:variable="variable"
        v-bind:key="variable.id"
        v-bind:category-id="category.categoryId"
      >
      </VariableChooser>

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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <RunRow
                v-for="run in runs"
                v-bind:key="run.id"
                v-bind:run="run"
              >
              </RunRow>
            </tbody>
          </table>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" v-on:click.prevent="generateBatchDownload">Download</a>
        </footer>
      </div>
      </div>
      <MostActiveRunners
        v-bind:runs="runs"
        v-bind:category-id="category.categoryId"
      >
      </MostActiveRunners>
      </div>
      <div class="columns">
        <WorldRecords
          v-bind:runs="runs"
          v-bind:category-id="category.categoryId"
          v-bind:category-name="category.category"
        >
        </WorldRecords>
      </div>
    </div>
  </section>
</template>
<script>

import RunRow from './run-row.vue'
import VariableChooser from './variable-chooser.vue'
import WorldRecords from './world-records.vue'
import MostActiveRunners from './most-active-runners.vue'
import Utils from './store/utils.js'

export default{
  props: {
    category: Object
  },
  components: {
    RunRow,
    VariableChooser,
    WorldRecords,
    MostActiveRunners
  },
  computed: {
    runs() {
      let unfilteredRuns = this.category.runs;
      if(unfilteredRuns.length < 1) {
        return [];
      }

      //filter the runs by variables
      let categoryVariables = this.category.variables;

      //don't filter if there are no category variables
      if(categoryVariables.length < 1){
        return unfilteredRuns;
      }
      else {
        let filteredRuns = [];

        unfilteredRuns.forEach(r => {
            let runValues = r.values;
            let runKeys = Object.keys(runValues);

            runKeys.forEach(k => {
              var match =
                this.selectedVariables
                .filter(x => x.value == runValues[k]);

              if(match.length > 0) {
                filteredRuns.push(r);
              }

            })
          });

        return filteredRuns;
      }
    },
    runtimes() {
      return this.$store.state.game.ruleset["run-times"];
    },
    selectedVariables() {
      let categoryVariables = this.category.variables;
      console.log(categoryVariables);
      let selectedVariables = [];
      categoryVariables.forEach(v => {
          let selected = v.values.find(x => {return x.selected});
          if(selected != null){
            selectedVariables.push({
              label: selected.label,
              rules: selected.rules,
              selected: selected.selected,
              value: selected.value
            });
          }
        });
      return selectedVariables;
    }
  },
  methods: {
    generateBatchDownload() {
      Utils.generateBatchDownload(this.runs);
    }
  }
}
</script>
