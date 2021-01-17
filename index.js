var testTeam = "hawks"
var teamPlayers = "";
var list = $("#data");
var teamArray = [];
var names = [];
var mins = [];
var stats = [];
var finalObj = [];
var namesArr = [];
let compiledNames;
let compiledStats;


//buttons for testing
$("#button").click(function () {
  var select = document.getElementById("teams");
  selectedTeam = select[select.selectedIndex].value;
  buildTeam(selectedTeam);
});

$("#button2").click(function () {
  renderNames();
})

//compiler
$("#button3").click(function () {
  renderChart();

})

function compiler() {
  getNames(teamArray);

  getStats(teamArray);

  //console.log(finalObj);
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
  var chartData = [];
  teamArray.forEach(i => {
    chartData.push({
      x: finalObj[i].min,
      y: finalObj[i].stat,
      label: finalObj[i].name
    });
  })
  
  console.log(chartData);
  Chart.defaults.global.elements.point.radius = 7;
  var ctx = $('#chartHere');
  var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: chartData
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var label = chartData[tooltipItem.index].label;
              return label;
            }
          }
        }
    }
});
}


  //builds array of player codes as strings
  function buildTeam(team) {
    //console.log(testTeam);
    let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/teams/" + team + "/roster.json";
    $.getJSON(url, function (result) {
      $.each(result.league.standard.players, function (i, field) {
        teamArray.push(field.personId);
        finalObj[field.personId] = {
          name: "",
          min: "",
          stat: ""
        };
      });
      compiler();
      //console.log("compiler has run");
    }).done(function () {
      //console.log("this chunk running");
    })
  }

  //returns array of player names as strings
  function getNames(arr) {
    
    let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players.json"
    $.getJSON(url, function (result) {
      var plrs = result.league.standard;
      for (let i = 0; i < arr.length; i++) {
        var plr = plrs.filter(player => player.personId === arr[i].toString());
        var nameStr = plr[0].firstName + " " + plr[0].lastName;
        finalObj[plr[0].personId].name = nameStr;
      }
    })
  }

  //get stats
  function getStats(arr) {
    let minsArr = [];
    let statsArr = [];
    for (let i = 0; i < arr.length; i++) {
      let url = "https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/2020/players/" + arr[i] + "_profile.json";
      $.getJSON(url, function (result) {
        var yearStats = result.league.standard.stats.latest;

        //var selectStat = document.getElementById("pickstat");
        //selectedStat = selectStat[selectStat.selectedIndex].value;
        finalObj[arr[i]].min = yearStats.min;
        finalObj[arr[i]].stat = yearStats.points;
  
        //console.log(yearStats[selectedStat]);
      });
    }
    console.log(finalObj);
  }