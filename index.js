var testTeam = "warriors";
var teamPlayers = "";
var list = $("#data");
var teamArray = [];
var finalObj = {
  name: [],
  min: [],
  stat: []
};

//buttons for testing
$("#button").click(function () {
  buildTeam(testTeam);
});

$("#button2").click(function () {
  getStats(teamArray);
})

//compiler
$("#button3").click(function () {
  compiler();

})

function compiler() {
  compiledNames = getNames(teamArray);
  compiledStats = getStats(teamArray);

  console.log(finalObj);
}


//builds array of player codes as strings
function buildTeam(team) {
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/teams/" + team + "/roster.json";
  $.getJSON(url, function (result) {
    $.each(result.league.standard.players, function (i, field) {
      teamArray.push(field.personId);
    });
  }).done(function () {
    compiler();
  })
}

//returns array of player names as strings
function getNames(arr) {
  let namesArr = [];
  let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players.json"
  $.getJSON(url, function (result) {
    var plrs = result.league.standard;
    for (let i = 0; i < arr.length; i++) {
      var plr = plrs.filter(player => player.personId === arr[i].toString());
      var nameStr = plr[0].firstName + " " + plr[0].lastName;
      namesArr.push(nameStr);
    }
  })
  finalObj.name.push(namesArr);
  return namesArr;
}

//get stats
function getStats(arr) {
  let minsArr = [];
  let statsArr = [];
  for (let i = 0; i < arr.length; i++) {
    let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players/" + arr[i] + "_profile.json";
    $.getJSON(url, function (result) {
      var yearStats = result.league.standard.stats.latest;
      minsArr.push(yearStats.min);
      statsArr.push(yearStats.plusMinus);
    });
  }
  finalObj.min.push(minsArr);
  finalObj.stat.push(statsArr);
  return [minsArr, statsArr];
}