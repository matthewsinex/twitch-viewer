export default {
  getTopSpeedrunPosts(){
    const url = `https://www.reddit.com/r/speedrun/top.json`;
    return fetch(url)
    .then(res => res.json());
  },
}
