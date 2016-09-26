var APIKEY = "RGAPI-f44e5aad-3b07-4a6c-82fa-59e742c68d1a";
// var summonerID = ""
// var sumName = "";
// var APIKEY = "";

function summonerLookUp() {   
    sumName = $("#summonerName").val();
    // APIKEY = $("#APIKey").val();

    
    if (sumName !== "") {

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var sumNamenospace = sumName.replace(" ", "");

                sumNamenospace = sumNamenospace.toLowerCase().trim();

                summonerName = json[sumNamenospace].name
                summonerLevel = json[sumNamenospace].summonerLevel;
                summonerID = json[sumNamenospace].id;

                document.getElementById("sName").innerHTML = summonerName;
                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;

                // NEW FUNCTION!
                letsGetLeague(summonerID)
                letsGetChampionMastery(summonerID)

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Please Enter a Valid Summoner Name!");
            }
        });
    } else {}
}


function letsGetLeague(summonerID) {

function tiers(tier, image){
	this.tier = tier
	this.image = image
}

var tierArray = []

var provisional = new tiers('PROVISIONAL', 'img/provisional.png')
var bronze = new tiers('BRONZE', 'img/bronze.png')
var silver = new tiers('SILVER', 'img/silver.png')
var gold = new tiers('GOLD', 'img/gold.png')
var platinum = new tiers('PLATINUM', 'img/platinum.png')
var diamond = new tiers('DIAMOND', 'img/diamond.png')
var master = new tiers('MASTER', 'img/master.png')
var challenger = new tiers('CHALLENGER', 'img/challenger.png')

tierArray.push(provisional)
tierArray.push(bronze)
tierArray.push(silver)
tierArray.push(gold)
tierArray.push(platinum)
tierArray.push(diamond)
tierArray.push(master)
tierArray.push(challenger)




    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + summonerID + "?api_key=" + APIKEY,
        // https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/38937061?api_key=RGAPI-f44e5aad-3b07-4a6c-82fa-59e742c68d1a
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (league) {
            leagueName = league[summonerID][0].name;
            leagueTier = league[summonerID][0].tier;
            
            document.getElementById("leagueName").innerHTML = leagueName;
            document.getElementById("leagueTier").innerHTML = leagueTier;

            for(i = 0; i < tierArray.length; i++) {
			var icon = document.getElementById('icon')
			var imageTag = document.createElement('IMG')
			var iconImage = tierArray[i].image


			if (leagueTier == tierArray[i].tier) {

				icon.innerHTML = "<img src='" + iconImage + "'>"
				imageTag.src = iconImage

			}
		}

        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert("error getting Summoner data 2!");
            document.getElementById("leagueName").innerHTML = "N/A";
            document.getElementById("leagueTier").innerHTML = "UNRANKED";
            icon.innerHTML = ""
        }



    });



}



function letsGetChampionMastery(summonerID){

     $.ajax({
        url: "https://na.api.pvp.net/championmastery/location/NA1/player/" + summonerID +  "/champions?api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (mastery) {
            championMastery = mastery[0].championId;
            
            document.getElementById("champMastery").innerHTML = championmastery;
           


        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 4!");
         
        }



    });



}









