<template>
  <a
    class="panel-block game-link"
    v-on:click="handleClick"
  >
    {{game.names.international}}
  </a>
</template>
<script>
export default {
  props: {
    game: Object
  },
  methods: {
    handleClick() {
      this.$store.commit("SET_GAME", this.game);
      this.$store.commit("SET_IS_LOADING", true);
      this.$store.dispatch("GET_RUNS", this.game.id);
    }
  }
}
</script>
