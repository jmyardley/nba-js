var testTeam = "hornets";
var teamPlayers = "";
var list = $("#data");
var teamArray = [];
var names = [];
var mins = [];
var stats = [];
var finalObj = {
  name: [],
  min: [],
  stat: []
};
let compiledNames;
let compiledStats;


//buttons for testing
$("#button").click(function () {
  buildTeam(testTeam);
});

$("#button2").click(function () {
  renderNames();
})

//compiler
$("#button3").click(function () {
  renderChart();

})

function compiler() {
  compiledNames = getNames(teamArray);
  compiledStats = getStats(teamArray);

  console.log(finalObj);
}

function renderNames () {
  var table = $("<table>");
  table.attr("class", "table");
  for (let i=0; i<teamArray.length; i++){
    table.append( "<tr><td>" + names[i].toString() + "</td><td>" + mins[i] + "</td><td>" + stats[i] + "</td></tr>" );
  }
  $("#tableHere").append(table);
}

function renderChart (){
  var ctx = $('#chartHere');
  var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});
}


  //builds array of player codes as strings
  function buildTeam(team) {
    let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/teams/" + team + "/roster.json";
    $.getJSON(url, function (result) {
      $.each(result.league.standard.players, function (i, field) {
        teamArray.push(field.personId);
      });
      compiler();
      console.log("compiler has run");
    }).done(function () {
      console.log("this chunk running");
      console.log(names);
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
    names = namesArr;
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
    mins = minsArr;
    stats = statsArr;
    return [minsArr, statsArr];
  }