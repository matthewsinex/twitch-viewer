import Vue from 'vue'
import Vuex from 'vuex'
import RedditApi from '../../api/Reddit.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    top_reddit_speedrun_posts: []
  },
  mutations: {
    SET_TOP_REDDIT_SPEEDRUN_POSTS(state, value) {
      state.top_reddit_speedrun_posts = value;
    },
  },
  actions: {
    GET_REDDIT_POSTS(context, payload){
      RedditApi
      .getTopSpeedrunPosts()
      .then(response => {
        var posts = response.data.children.map(x => x.data);
        context.commit("SET_TOP_REDDIT_SPEEDRUN_POSTS", posts);
      })
    },
  },

})
