var testTeam = "hawks";
var teamPlayers = "";
var teamArray = [];
var list = $("#data");
var playerId = 203992;
var teamStatsArray = [];

$("#button").click(function () {
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/teams/" + testTeam + "/roster.json";

  $.getJSON(url, function (result) {
    $.each(result.league.standard.players, function (i, field) {
      $("#data").append(field.personId.toString() + " ");
      teamArray.push(field.personId);
    });
    for (let i = 0; i < teamArray.length; i++) {
      getPlayerInfo(teamArray[i]);
    }
    console.log(teamArray);
  });
});

$("#button2").click(function () {
  getPlayerNames(teamArray);
})

function getPlayerInfo(playerId) {
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players/" + playerId + "_profile.json";
  $.getJSON(url, function (result) {
    var yearStats = result.league.standard.stats.latest;
    //console.log(result)
    //console.log(yearStats.min);
    //console.log(yearStats.plusMinus);
  });
}

function getPlayerNames(arr) {
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players.json"
  $.getJSON(url, function (result) {
    var plrs = result.league.standard;
    for (let i = 0; i < arr.length; i++) {
      var plr = plrs.filter(player => player.personId === arr[i].toString());
      console.log(plr[0].firstName + " " + plr[0].lastName);
    }
  })
}