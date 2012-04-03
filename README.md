# FeedHenry Sencha Tutorial - Part 7

## Overview

'git checkout v6' to get the starting code for this section.

In this tutorial we will adding a new view for a stocks mash up. This will demonstrate the use of other API's in the app.

* Yahoo Finance: Look up company stock symbol using company name.

* Yahoo API: http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={0}&callback=YAHOO.Finance.SymbolSuggest.ssCallback

* WebServiceX: Retrieve company information based on stock symbol.

* WebServiceX API: http://www.webservicex.net/stockquote.asmx

#### Steps taken
* Create stock.js, xmlToJson.js and util.js in cloud folder
* Create a new stock view, update model and controller in client.


![](https://github.com/feedhenry/HP-Sencha-Demo/raw/v7/docs/stocks.png)

## Step 1 - Client Side (View)
Begin by creating the Stocks view file in views, name it Stocks.js and add the following code.

		/**
		 * Stock.js View
	 	**/
		app.views.Stocks = Ext.extend(Ext.Panel, {
		  title: 'Stocks',
		  iconCls: 'home',
		  scroll: 'vertical',
		  height: '100%',
		  layout: 'fit',

		  listeners: {
		    beforeshow: function() {
		    },
		  },

		  dockedItems: [
		  	{
		  		dock: 'top',
		  		xtype: 'toolbar',
		      title: '<img class="logo logoOffset" src="app/images/logo.png" />',
		  		items: [
		  			{
		  				text: 'Back',
		          ui: 'back',
		          hidden: app.hideBack || false,
		  				handler: function() {
		  					app.views.viewport.setActiveItem(app.views.home, {type: 'slide', direction: 'right'});
		            app.stores.stocks.removeAll();
		  				}
		  			}
		  		]
		  	}
		  ],
		  
		  items: [{
		    xtype: 'panel',
		    layout:{
		    type:'vbox',
		    align: 'strech'
		 
		   },
		   defaults:{flex:'1'},
		   items: [{
		      xtype: 'form',
		      items: [
		        {
		          xtype: 'fieldset',
		          title: 'Search Stock Info',
		          instructions: 'Enter company name above to perform a mash-up.',
		          defaults: {
		            labelAlign: 'left',
		            labelWidth: '50%'
		          },
		          items: [
		            {
		              xtype: 'textfield',
		              id: 'companyName',
		              name: 'Company Name'
		            },
		          ]
		        },
		        {
		          xtype: 'button',
		          text: 'Submit',
		          handler: function() {
		            Ext.dispatch({
		              controller: app.controllers.stocks,
		              action: 'getStocks'
		            });
		          }
		        }
		      ]
		    },{
		      id:"stockResults",
		      xtype: 'list',
		      width: '100%',
		      disableSelection: true,
		      scroll: "vertical",
		      store: app.stores.stocks,
		      itemTpl:'<h2>Stock: {Symbol}</h2><ul><li>Change:  {Change}</li><li>Date:  {Date}</li><li>Last:  {Last}</li><li>Name:  {Name}</li><li>Symbol:  {Symbol}</li><li>Time:  {Time}</li></ul>',
		      flex: 1
		    }]
		  }]
		});

Some of the same Sencha componets should look familar from the payment view that was created earlier. Also note that we have a list element to display the results from the cloud call.

## Step 2 - Client Side (Controller)

Now that our views have been created we need to add in the necessary controllers for the functionality of the stocks section. The controller is added to app.controllers and instantiated using Ext.Controller. The controller relies on a cloud call which are done using $fh.act(). The function called from the cloud is getStockInfo() as specified by 'act: getStocks'.

		/**
		 * Stock.js Controller
	 	**/
		app.controllers.stocks = new Ext.Controller({
		 	getStocks: function() {
		    var companyName  = Ext.getCmp("companyName").getValue();

		    if (companyName.length == 0) {
		      Ext.Msg.alert('Error', 'You must enter a company name.', Ext.emptyFn);
		      return;
		    }
		    // Show loading spinner
		     mask.show();

		    // Call to the cloud
		    $fh.act({
		      act: 'getStockInfo',
		      req: {
		        name: companyName,
		      }
		    }, function(res) { 
		      //Adding res to store
		      app.stores.stocks.add({Name: res.stockInfo.Name, Symbol:res.stockInfo.Symbol, Last: res.stockInfo.Last, Change: res.stockInfo.Change, Date: res.stockInfo.Date, Open: res.stockInfo.Open, Time: res.stockInfo.Time});

		      // Hide loading spinner
		      mask.hide();

		      //Empty the company field
		      Ext.getCmp("companyName").setValue();

		    },function(err){
		      mask.hide();
		      Ext.Msg.alert('Error', 'An error has occurred with your request. Please try again.', Ext.emptyFn);
		    });
		  }
		});

Note we have an error alert dialog box to catch any errors that could be returned from the cloud.


## Step 3 -- Cloud
Open stock.js in cloud folder and put the following code inside:

	 /**
	 * Mash multiple business apis returned data.
	 * Stock Symble lookup: Using YAHOO API. JSONP
	 * Stock Info lookup: Using WebServiceX API . SOAP
	 *
	 **/

	var stock = {
		//YAHOO finance api for looking up stock symbol with a company name. It is a JSONP service.
		yahooApi : "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={0}&callback=YAHOO.Finance.SymbolSuggest.ssCallback",
		//WebServiceX API (Open API). It returns stock details with specific stock symbol.
		webServiceXApi : "http://www.webservicex.net/stockquote.asmx",
		/**
		 * The function will look for stock symbol based on "name" param, and return stock info from WebServiceX
		 *
		 * Return stock information.
		 */
		getStockInfo : function(name) {
			//Compose request url using user input.
			var yahooApiUrl = this.yahooApi.replace("{0}", name);
			/*
			 * Perform Webcall
			 * Raw response from YAHOO JSONP api which contains stock symbol as well as other information we do not want.
			 *
			 */
			var symbolRes = $fh.web({
				url : yahooApiUrl,
				method : "GET",
				charset : "UTF-8",
				period : 3600
			});

		//Clear up YAHOO response and only keep the information "stock symbol" we need.
		var stockSymbol = this.processSymbolRes(symbolRes);

		// construct SOAP envelop. We could do this manually or just use a Javascript Library.
		var soapEnvolope = '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body>' + '<GetQuote xmlns="http://www.webserviceX.NET/">' + '<symbol>' + stockSymbol + '</symbol>' + '</GetQuote>' + '</soap:Body>' + '</soap:Envelope>';

		//Retrieve SOAP url
		var stockInfoUrl = this.webServiceXApi;

		//Prepare webcall parameters
		var opt = {
			url : stockInfoUrl,
			method : "POST",
			charset : "UTF-8",
			contentType : "text/xml",
			body : soapEnvolope,
			period : 3600
		}

		//Perform webcall
		var stockInfoSoapRes = $fh.web(opt);

		//getSOAPElement will retrieve specific XML object within SOAP response
    	var body=stockInfoSoapRes.body.replace(/&lt;/g,"<").replace(/&gt;/g,">");
		var xmlData = getSOAPElement("GetQuoteResult", body);
    
    	var xmlObj=xml(xmlData);

   		//Create Object
    	var stockInfo={
	      Symbol:xmlObj.find("Symbol").text(),
	      Last:xmlObj.find("Last").text(),
	      Open:xmlObj.find("Open").text(),
	      "Date":xmlObj.find("Date").text(),
	      Time:xmlObj.find("Time").text(),
	      Change:xmlObj.find("Change").text(),
	      Name:xmlObj.find("Name").text()
    	}
   
		//mash up the data and return to client.
		return {
			stockSymbol : stockSymbol,
			stockInfo :stockInfo
    };

	},
	/**
	 * Process Response from YAHOO stock symbol api.
	 * It will clear up the response and only return stock symbol as string.
	 */
	processSymbolRes : function(res) {
		var resBody = res.body;
		var removedHeadRes = resBody.replace("YAHOO.Finance.SymbolSuggest.ssCallback(", "");
		//remove jsonp callback header
		var removedTailRes = removedHeadRes.substr(0, removedHeadRes.length - 1);
		//remove jsonp callback bracket
		var resObj = $fh.parse(removedTailRes);
		//parse result to JSON object
		return resObj.ResultSet.Result[0].symbol;
		//return the first matched stock symbol
	}
}

Please read the comments to have a step by step guide of the cloud intergration.
We also use a XML to JSON parser and a util.js file.

![](https://github.com/feedhenry/HP-Sencha-Demo/raw/v7/docs/stocksResult.png)
	  	
'git checkout v7' to get the completed code foir this section which is also the starting point for the <a href="https://github.com/feedhenry/HP-Sencha-Demo/tree/v7">next section.</a>