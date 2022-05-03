import Vue from 'vue'
import Vuex from 'vuex'
import GamesApi from '../../api/Games.js'
import RunsApi from '../../api/Runs.js'
import Utils from './utils.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    game_search_results: [],
    game: {},
    runs: [],
    isLoading: false
  },
  mutations: {
    SET_IS_LOADING(state, value){
      state.isLoading = value;
    },
    SET_GAME_SEARCH_RESULTS(state, value) {
      state.game_search_results = value;
    },
    SET_RUNS(state, value) {
      state.runs = value;
    },
    SET_GAME_VARIABLES(state, value) {
      state.game_variables = value;
    },
    SET_GAME(state, value){
      state.game = value;
    }
  },
  actions: {
    SEARCH_GAMES(context, payload){
      GamesApi
      .getByGameName(payload)
      .then(response => {
        context.commit("SET_GAME_SEARCH_RESULTS", response.data);
      })
    },
    GET_RUNS(context, payload){
      var gamePromise = GamesApi
        .getById(payload);

      var runsPromise = RunsApi
        .runPromise(payload);

      Promise.all([gamePromise, runsPromise])
      .then((values) => {
        let gameVariables = values[0].data.variables.data;
        let gameCategories = values[0].data.categories.data;
        let runs = values[1];

        //set game variables
        //set selectedValue to default variable

        //gameVariables
        //.filter(v =>
        //  v.category || v["is-subcategory"] == true //some variables are game global
        //)

        gameVariables
        .filter(v =>
          v["is-subcategory"] == true
        )
        .forEach(v => {
          let defaultVariableString = v.values.default;

          if(defaultVariableString != null){
            v.values.values[defaultVariableString].selected = true;
          }
        })

        //group the runs by category
        const grouped = Utils.groupBy(runs, run => run.category.data.name);
        const groupedRuns = Array.from(grouped);
        console.log(runs);
        console.log(gameCategories);
        console.log(groupedRuns);

        let categories =
          groupedRuns
          .filter(r => gameCategories.find(x => {return x.name == r[0]}) != undefined) //some runs have categories that are not in the game?
          .map(r => {
            return {
              category: r[0],
              categoryId: gameCategories.find(x => {return x.name == r[0]}).id,
              runs: Utils.sortRuns(r[1]),
              variables: []
            }
          });

        categories.forEach(c => {
          gameVariables.forEach(v => {
            if(v["is-subcategory"] == true && (v.category == c.categoryId || v.category == null)) {
              let variableValues = Object.keys(v.values.values);

              let newVariable = {
                category: v.category,
                id: v.id,
                isSubcategory: v["is-subcategory"],
                name: v.name,
                values: variableValues.map(x => {
                  return {
                    value: x,
                    variableId: v.id,
                    label: v.values.values[x].label,
                    rules: v.values.values[x].rules,
                    selected: v.values.values[x].selected
                  }
                })
              };

              c.variables = [...c.variables, newVariable];
            }
          })
        })

        context.commit("SET_RUNS", categories);
        context.commit("SET_IS_LOADING", false);
      })
    },
    UPDATE_GAME_VARIABLES(context, payload) {
      let runs = context.state.runs;

      let category_variables =
        runs
        .find(x => {return x.categoryId == payload.categoryId})
        .variables;

       let variable =
        category_variables
        .find(v => { return v.id == payload.id });

      let values = variable.values;
      values.forEach(v => {
        v.selected = false;
      })
      values.find(v => { return payload.value == v.value }).selected = true;

    }
  },
})
