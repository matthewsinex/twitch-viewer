export default {
  getBySeriesId(series_id){
    const url = `https://www.speedrun.com/api/v1/series/${series_id}/games?embed=categories`;
    return fetch(url)
    .then(res => res.json());
  },
  mapGamesToView(games){
    return games.map(g => {
      return {
        id: g.id,
        name: g.names.international,
        releaseDate: g["release-date"],
        categories: g.categories.data.map(c => {
          return {
            id: c.id,
            name: c.name
          }
        })
      }
    });
  }
}
