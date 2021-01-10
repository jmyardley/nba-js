var testTeam = "hawks";
var teamPlayers = "";
var list = $("#data");
var teamStatsArray = [];

//buttons for testing
$("#button").click(function () {
  buildTeam(testTeam);
});

$("#button2").click(function () {
  getPlayerNames(teamArray);
})

//console logs array of player codes as strings
function buildTeam(team) {
  var teamArray = [];
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/teams/" + team + "/roster.json";
  $.getJSON(url, function (result) {
    $.each(result.league.standard.players, function (i, field) {
      teamArray.push(field.personId);
    });
  });
  console.log(teamArray);
  let url2 = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players.json";
  $.getJSON(url2, function (result) {
    var plrs = result.league.standard;
    for (let i = 0; i < teamArray.length; i++) {
      var plr = plrs.filter(player => player.personId === teamArray[i].toString());
      var nameStr = plr[0].firstName + " " + plr[0].lastName;
      console.log(nameStr);
    }
  })

}


function getPlayerInfo(playerId) {
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players/" + playerId + "_profile.json";
  $.getJSON(url, function (result) {
    var yearStats = result.league.standard.stats.latest;
    console.log(yearStats.min);
    console.log(yearStats.plusMinus);
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