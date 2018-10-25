(function() {
    	
	var tableData2 = [];
	
	
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var checkin_cols = [

{ id: "Checkin_Id", alias: "Checkin Id", dataType: tableau.dataTypeEnum.int },
{ id: "Checkin_Date", alias: "Checkin Date", dataType: tableau.dataTypeEnum.datetime },
{ id: "Comments", alias: "Comments", dataType: tableau.dataTypeEnum.string },
{ id: "Rating", alias: "Rating", dataType: tableau.dataTypeEnum.float },
{ id: "Beer_Id", alias: "Beer Id", dataType: tableau.dataTypeEnum.int },
{ id: "Beer_Name", alias: "Beer Name", dataType: tableau.dataTypeEnum.string },
{ id: "Label", alias: "Label", dataType: tableau.dataTypeEnum.string },
{ id: "Style", alias: "Style", dataType: tableau.dataTypeEnum.string },
{ id: "ABV", alias: "ABV", dataType: tableau.dataTypeEnum.float },
{ id: "Brewery_Id", alias: "Brewery Id", dataType: tableau.dataTypeEnum.int },
{ id: "Brewery", alias: "Brewery", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Type", alias: "Brewery Type", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Logo", alias: "Brewery Logo", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Country", alias: "Brewery Country", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Website", alias: "Brewery Website", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_City", alias: "Brewery City", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_State", alias: "Brewery State", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Lat", alias: "Brewery Lat", dataType: tableau.dataTypeEnum.float },
{ id: "Brewery_Lng", alias: "Brewery Lng", dataType: tableau.dataTypeEnum.float },
{ id: "Venue_Id", alias: "Venue Id", dataType: tableau.dataTypeEnum.int },
{ id: "Location", alias: "Location", dataType: tableau.dataTypeEnum.string },
{ id: "Address", alias: "Address", dataType: tableau.dataTypeEnum.string },
{ id: "City", alias: "City", dataType: tableau.dataTypeEnum.string },
{ id: "State", alias: "State", dataType: tableau.dataTypeEnum.string },
{ id: "Country", alias: "Country", dataType: tableau.dataTypeEnum.string },
{ id: "Lat", alias: "Lat", dataType: tableau.dataTypeEnum.float },
{ id: "Lng", alias: "Lng", dataType: tableau.dataTypeEnum.float },
{ id: "Venue_Type_Logo", alias: "Venue Type Logo", dataType: tableau.dataTypeEnum.string }

		];

        var table1Schema = {
            id: "CheckinFeed",
            alias: "Untappd Checkins",
            columns: checkin_cols
        };

		var badge_cols = [{
            id: "checkin_id",
			alias: "Checkin Id",
			description: "untapped checkin id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "badge_id",
			alias: "Badge Id",
			description: "untapped badge id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "badge_name",
            alias: "Badge Name",
			description: "the badge name",
            dataType: tableau.dataTypeEnum.string
        }		
		];

        var table2Schema = {
            id: "CheckinFeedBadge",
            alias: "Untappd Checkin Badges",
            columns: badge_cols
        };
		
		
        schemaCallback([table1Schema, table2Schema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        
		if (table.tableInfo.id == "CheckinFeed") {
		var j=0;
		while (j < 1) {
        var pageno = j+1;
   
	   
		
		//$.getJSON("https://api.punkapi.com/v2/beers?page=" + pageno.toString() + "&per_page=80", function(resp) {
		$.getJSON("https://api.untappd.com/v4/user/checkins?access_token=973E302563514EAE17CCBA48B768AF09E32BF8AC&limit=50&max_id=", function(resp) {	
			
            var d;
			var checkin = resp,
                tableData = [];
				tableData2 =[];
			
				

            // Iterate over the JSON object
            for (var i = 0, len = checkin.response.checkins.count; i < len; i++) {
				d = new Date(resp.response.checkins.items[i].created_at).toISOString();
                tableData.push({
					
"Checkin_Id": resp.response.checkins.items[i].checkin_id,
"Checkin_Date": d,
"Comments": resp.response.checkins.items[i].checkin_comment,
"Rating": resp.response.checkins.items[i].rating_score,
"Beer_Id": resp.response.checkins.items[i].beer.bid,
"Beer_Name": resp.response.checkins.items[i].beer.beer_name,
"Label": resp.response.checkins.items[i].beer.beer_label,
"Style": resp.response.checkins.items[i].beer.beer_style,
"ABV": resp.response.checkins.items[i].beer.beer_abv,
"Brewery_Id": resp.response.checkins.items[i].brewery.brewery_id,
"Brewery": resp.response.checkins.items[i].brewery.brewery_name,
"Brewery_Type": resp.response.checkins.items[i].brewery.brewery_type,
"Brewery_Logo": resp.response.checkins.items[i].brewery.brewery_label,
"Brewery_Country": resp.response.checkins.items[i].brewery.country_name,
"Brewery_Website": resp.response.checkins.items[i].brewery.contact.url,
"Brewery_City": resp.response.checkins.items[i].brewery.location.brewery_city,
"Brewery_State": resp.response.checkins.items[i].brewery.location.brewery_state,
"Brewery_Lat": resp.response.checkins.items[i].brewery.location.lat,
"Brewery_Lng": resp.response.checkins.items[i].brewery.location.lng,
"Venue_Id": resp.response.checkins.items[i].venue.venue_id,
"Location": resp.response.checkins.items[i].venue.venue_name,
"Address": resp.response.checkins.items[i].venue.location.venue_address,
"City": resp.response.checkins.items[i].venue.location.venue_city,
"State": resp.response.checkins.items[i].venue.location.venue_state,
"Country": resp.response.checkins.items[i].venue.location.venue_country,
"Lat": resp.response.checkins.items[i].venue.location.lat,
"Lng": resp.response.checkins.items[i].venue.location.lng,
"Venue_Type_Logo": resp.response.checkins.items[i].venue.venue_icon.sm,


					
                });
				
				for (var k = 0, len2 = checkin.response.checkins.items[i].badges.count; k < len2; k++) {
					tableData2.push({
						"checkin_id": checkin.response.checkins.items[i].checkin_id,
						"badge_id": checkin.response.checkins.items[i].badges.items[k].badge_id,
						"badge_name": checkin.response.checkins.items[i].badges.items[k].badge_name,
					});
				}
            }

            table.appendRows(tableData);
            doneCallback();
        });
		
		 j++;
		}
		
		}
		
		if (table.tableInfo.id == "CheckinFeedBadge") {
			table.appendRows(tableData2);
			doneCallback();
		}
		
    };
	//console.log(tableData);

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Untappd Beers 2"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
