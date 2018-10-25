(function() {
    	
		
	 $.getJSON("http://127.0.0.1:8080/get/", function(data) {
  console.log(JSON.stringify(data));
  param1=data.id;
})
.done(function() { console.log('getJSON request succeeded!'); })
.fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
.always(function() { console.log('getJSON request ended!'); });
	
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var brewery_cols = [

		{ id: "Checkin_Id", alias: "Checkin Id", dataType: tableau.dataTypeEnum.int },
{ id: "Checkin_Date", alias: "Checkin Date", dataType: tableau.dataTypeEnum.datetime },
{ id: "Comments", alias: "Comments", dataType: tableau.dataTypeEnum.string },
{ id: "Rating", alias: "Rating", dataType: tableau.dataTypeEnum.float },
{ id: "Beer_Id", alias: "Beer Id", dataType: tableau.dataTypeEnum.int },
{ id: "Beer_Name", alias: "Beer Name", dataType: tableau.dataTypeEnum.string },
{ id: "Label", alias: "Label", dataType: tableau.dataTypeEnum.string },
{ id: "Style", alias: "Style", dataType: tableau.dataTypeEnum.string },
{ id: "ABV", alias: "ABV", dataType: tableau.dataTypeEnum.float },
{ id: "Venue_Id", alias: "Venue Id", dataType: tableau.dataTypeEnum.int },
{ id: "Location", alias: "Location", dataType: tableau.dataTypeEnum.string },
{ id: "Address", alias: "Address", dataType: tableau.dataTypeEnum.string },
{ id: "City", alias: "City", dataType: tableau.dataTypeEnum.string },
{ id: "State", alias: "State", dataType: tableau.dataTypeEnum.string },
{ id: "Country", alias: "Country", dataType: tableau.dataTypeEnum.string },
{ id: "Lat", alias: "Lat", dataType: tableau.dataTypeEnum.float },
{ id: "Lng", alias: "Lng", dataType: tableau.dataTypeEnum.float },
{ id: "Venue_Type_Logo", alias: "Venue Type Logo", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Id", alias: "Brewery Id", dataType: tableau.dataTypeEnum.int },
{ id: "Brewery_Name", alias: "Brewery Name", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Slug", alias: "Brewery Slug", dataType: tableau.dataTypeEnum.string },
{ id: "Brewery_Page_Url", alias: "Brewery Page Url", dataType: tableau.dataTypeEnum.string }



		];

        var table1Schema = {
            id: "BreweryFeed",
            alias: "Untappd Brewery Checkins",
            columns: brewery_cols
        };

		
		
		
        schemaCallback([table1Schema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        
		if (table.tableInfo.id == "BreweryFeed") {
		var j=0;
		while (j < 1) {
        var pageno = j+1;
   
	   
		
		
		$.getJSON("https://api.untappd.com/v4/brewery/checkins/" + param1 + "?access_token=973E302563514EAE17CCBA48B768AF09E32BF8AC&limit=50&max_id=", function(resp) {	
			
            var d;
			var checkin = resp,
                tableData = [];
				
			
				

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
"Brewery_Name": resp.response.checkins.items[i].brewery.brewery_name,
"Brewery_Slug": resp.response.checkins.items[i].brewery.brewery_slug,
"Brewery_Page_Url": resp.response.checkins.items[i].brewery.brewery_page_url,
"Venue_Id": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.venue_id),
"Location": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.venue_name),
"Address": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.location.venue_address),
"City": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.location.venue_city),
"State": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.location.venue_state),
"Country": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.location.venue_country),
"Lat": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.location.lat),
"Lng": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.location.lng),
"Venue_Type_Logo": (resp.response.checkins.items[i].venue.length === 0 ? "" : resp.response.checkins.items[i].venue.venue_icon.sm),

					
                });
				
				
            }

            table.appendRows(tableData);
            doneCallback();
        });
		
		 j++;
		}
		
		}
		
		
		
    };
	//console.log(tableData);

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Untappd Brewery"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
