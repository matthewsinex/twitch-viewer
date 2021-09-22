export default {
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  },
  fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  },
  sortRuns(runs) {
    return runs.sort((a,b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);

      return dateA - dateB;
    });
  },
  generateBatchDownload(runs) {
    var self = this;
    var batchFileCommands = runs
      .map(function(x){
        //run time
        var runTimeFormatted = self.fancyTimeFormat(x.times.realtime_t);
        runTimeFormatted = runTimeFormatted.replaceAll(':', '_');

        //runner name
        var playerName = "";
        if(x.players.data[0].names){
          playerName = x.players.data[0].names.international;
        }
        else {
          playerName = x.players.data[0].name;
        }

        //
        var date = x.date.replaceAll('-', '.');
        var videoLink = x.videos.links[0].uri;
        var fileName = `${date} ${playerName} ${runTimeFormatted}.mp4`;

        var command = `youtube-dl -o "${fileName}" ${videoLink}`;

        return command;
      });

      this.copyToClipboard(
        batchFileCommands
        .join('\r\n')
      );

      alert('youtube-dl commands copied to clipboard. Paste into a batch file and run to download videos.');
  },
  copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
