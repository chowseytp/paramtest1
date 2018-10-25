(function() {
    // Create the connector object
	
	  //Only first parameter is required
	  
	  /* var objectArray = "{a:1}";
    var jsonHtmlTable = ConvertJsonToTable(objectArray, 'jsonTable', null, 'Download');
	var param1 = 0;
	
 $.getJSON("http://127.0.0.1:8080/get/", function(data) {
  console.log(JSON.stringify(data));
  param1=data.id;
})
.done(function() { console.log('getJSON request succeeded!'); })
.fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
.always(function() { console.log('getJSON request ended!'); });
		*/
		
	var tableData2 = [];
	
	
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var checkin_cols = [{
            id: "checkin_id",
			alias: "Checkin Id",
			description: "untapped checkin id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "bid",
			alias: "Beer Id",
			description: "untapped beed id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "beer_name",
            alias: "Beer Name",
			description: "test 1",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "brewery_id",
            alias: "Brewery Id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "brewery_name",
            alias: "Brewery Name",
            dataType: tableau.dataTypeEnum.string
        }
		
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
		$.getJSON("https://api.untappd.com/v4/user/checkins/twikilikeit?client_id=030FD604B5BBA5C8418105102071781D83BBA2C8&client_secret=1F109FAADCE450446C0E9ECFE36D09293685C2E4&limit=" + "50" + "&offset=0", function(resp) {	
			
            var checkin = resp,
                tableData = [];
				tableData2 =[];
				

            // Iterate over the JSON object
            for (var i = 0, len = checkin.response.checkins.count; i < len; i++) {
                tableData.push({
					"checkin_id": checkin.response.checkins.items[i].checkin_id,
                    "bid": checkin.response.checkins.items[i].beer.bid,
					"beer_name": checkin.response.checkins.items[i].beer.beer_name,
					"brewery_id": checkin.response.checkins.items[i].brewery.brewery_id,
					"brewery_name": checkin.response.checkins.items[i].brewery.brewery_name,
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
