# FeedHenry Sencha Tutorial - v3

## Overview

In this tutorial we will adding a new view for the Google Maps page. You will learn the following:

* Integrate an app with the Google Maps API
* Use Sencha controllers
* Learn to use FeedHenry APIs

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v3/docs/MapView.png)

## Step 1

In the index.html file before the '<!-- App -->' line add the following code. This will give us access to the Google Maps API. Using the API is simple with Sencha as they provide a map component that integrates with Google Maps.

	<!-- Google Maps API -->
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>

## Step 2

In the views directory create a view called 'Map.js' with the following code. This file will create a Sencha map component that will be used in our map view also defined in this file as 'app.views.MapView'.
	
	/*
	 * This creates a Sencha map component that will be used to view the map.
	 */
	app.views.map = new Ext.Map({
	  //fullscreen: true,
	  layout: {
	     type: 'fit'
	  },
	  id: 'map',
	  title: 'Map',
	  mapOptions: {
	    zoom: 11,
	  }
	});

	/*
	 * This is our map view. Notice that it's items contain our 'app.views.map' that we 
	 * defined above.
	 */
	app.views.MapView = Ext.extend(Ext.Panel, {
	  title: 'Map',
	  iconCls: 'home',
	  layout: {
	   type: 'fit'
	  },

	  /*
	   * Listeners are applied to components to perform functions when a specific 
	   * event occurs. Here for example when the MapView is shown (show), we call
	   * the Map.js controller's 'getLocation' function.
	   */
	  listeners: {
	    activate: function() {
	      google.maps.event.trigger(Ext.getCmp("map").map, 'resize');
	    },
	  	show: function() {
	      // Get the users location
	      Ext.dispatch({
	        controller: app.controllers.map,
	        action: 'getLocation'
	      });
	  	}
	  },

	  /*
       * Here we add a toolbar with a back button.
   	   * ui: 'back' tells sencha to style the button as a back button
  	   */
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
	  				}
	  			}
	  		]
	  	}
	  ],
	  
	  items: [
	  	app.views.map
	  ]
	});

## Step 3 

In the controllers directory create a new file called 'Map.js' with the following code. This file contains code that controls the map functionality. This uses some of the FeedHenry APIs such as 'fh.data' for loading stored map points from local storage. Examine this file closely and read the API information <a href="http://docs.feedhenry.com/api-reference/">here</a>.

	app.controllers.map = new Ext.Controller({

	  markers: [], // Keep track of any map markers

	  // Remove all markers from the map
	  clearMarkers: function() {
	    if (this.markers) {
	      for (i = 0; i < this.markers.length; i++) {
	        this.markers[i].setMap(null);
	      }
	    }
	  },

	  /*
	   * Load cached points from local storage using the fh.data() API call
	   */
	  loadPoints: function() {
	    $fh.data({
	      key: 'points'
	    }, function(res) {
	      console.log(res);

	      if (res.val === null) { // No client data found
	        app.controllers.map.getPoints();
	      } else {
	        // Parse the cached data
	        var cache = JSON.parse(res.val);
	        var hash  = cache.hash;

	        app.controllers.map.getPoints(cache, hash);
	      }
	    });
	  },

	  /*
	   * Get points from the cloud using fh.act() which will call a function from
	   * the cloud in our main.js file.
	   */
	  getPoints: function(cache, hash) {
	    var map = Ext.getCmp("map").map;
	    $fh.act({
	      act: 'getPoints',
	      req: {
	        hash: hash,
	        timestamp: new Date().getTime()
	      }
	    }, function(res) {
	      if (hash && hash === res.hash) {
	        console.log("Client data is at the latest version");
	      } else {
	        $fh.data({
	          act: 'save',
	          key: 'points',
	          val: JSON.stringify(res)
	        });
	      }
	      var map = Ext.getCmp("map").map;

	      for (var i = 0; i < res.data.locations.length; i++) {
	        var point = res.data.locations[i];
	        var pos   = new google.maps.LatLng(point.lat, point.lon);

	        app.controllers.map.markers.push(new google.maps.Marker({
	          position: pos,        
	          map: map,
	          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (i+1) + '|FF0000|000000'
	        })); 
	      }
	    });
	  },

	  /*
	   * Get the users location and draw a marker at their location
	   */
	  getLocation: function(options){
	    // Instance of the google map
	    var map = Ext.getCmp("map").map;
	    var pos = {};

	    $fh.geo({
	      interval: 0
	    }, function(res){
	      pos = new google.maps.LatLng(res.lat, res.lon);
	      map.setCenter(pos);

	      // Remove any previously created markers
	      app.controllers.map.clearMarkers();

	      // Create a marker at the current location
	      app.controllers.map.markers.push(new google.maps.Marker({
	        position: pos,        
	        map: map,
	        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=0|00FF00|000000'
	      }));  

	      // Get markers from the cloud
	      app.controllers.map.loadPoints();
	      
	    }, function() {
	      // We failed to get the users geolocation, fallback to geo ip
	      alert("$fh.geo failed");
	      alert(JSON.stringify(res.geoip));
	    });
	  }

	});

## Step 4

Now we are going to implement the Cloud features of the FeedHenry platform. You might have noticed in the Map controller we call the FeedHenry $fh.act() call. This allows us to call a function from the server (cloud), read more about this <a href="http://docs.feedhenry.com/api-reference/actions/">here</a>. In the cloud directory add the following code to the main.js file. Functions in the Cloud directory can be called from device via an $fh.act() call.

	/*
	 * Maps
	 */
	// Cache points for 10 seconds
	var CACHE_TIME = 30;
	var MARKERS = {
	  locations: [
	    {
	      lat: '52.245671',
	      lon: '-7.080002'
	    },
	    {
	      lat: '52.257861',
	      lon: '-7.136993'
	    }
	  ]
	};

	/*
	 * If we have points cached in the cloud load them.
	 */
	function getCachedPoints() {
	  var ret = $fh.cache({
	    "act": "load",
	    "key": "points"
	  });
	  return ret.val;
	}

	/*
	 * Similar to the above function but instead we are saving the points
	 */
	function cachePoints(hash, data) {
	  var obj = {
	    "hash": hash,
	    "data": data,
	    "cached": true
	  };
	  $fh.cache({
	    "act": "save",
	    "key": "points",
	    "val": obj,
	    "expire": CACHE_TIME
	  });
	}

	 /* 
	  * This function would be called from the device using an act call.
	  */
	function getPoints() {
	  var response = {};
	  var cache    = getCachedPoints();

	  if (cache.length === 0) {
	    var data = MARKERS;
	    var hash = $fh.hash({
	      algorithm: 'MD5',
	      text: $fh.stringify(data)
	    });

	    // Cache the data
	    cachePoints(hash, data);

	    // Build the response
	    response = {'data': data, 'hash':hash, 'cached':false};
	  } else {
	    // Parse the cached data
	    cache = $fh.parse(cache);

	    if( $params.hash && $params.hash === cache.hash ) {
	      // Client data is up to date
	      response = {'hash':$params.hash, 'cached':true};
	    } else {
	      // Hash value from client missing or incorrect, return cached cloud data
	      response = cache;
	    }
	  }
	  return response;
	}

## Step 5

Update the references to these new files in the index.html page so Sencha is aware of them.

To the views section add.

	<script type="text/javascript" src="app/views/Map.js"></script>

To the controllers section add.

	<script type="text/javascript" src="app/controllers/Map.js"></script>

## Task 

Try updating your Viewport.js and Home.js files to allow navigation to the Map View. This is the same concept as including the home view. You will need to include a handler function in Home.js on the map icon that uses 'app.views.viewport.setActiveItem(view, animation)' function.

When you have tried this move on to the next steps for a solution.

## Step 6

These steps are only necessary if you have not managed to successfully update your app to allow viewing of the Map View. Create an instance of the map view in 'Viewport.js'

	initComponent: function() {
	  // Put instances of cards into app.views namespace
	  Ext.apply(app.views, {
	    home:     new app.views.Home(),
	    map:      new app.views.MapView()
	  });
	  //put instances of cards into viewport
	  Ext.apply(this, {
	    items: [
	      app.views.home,
	      app.views.map
	    ]
	  });
	  app.views.Viewport.superclass.initComponent.apply(this, arguments);
	}

## Step 7

In 'Home.js' update the handler to navigate to the map view

  	{
  		xtype: 'button',
  		cls: 'mapIcon',
  		width:  100,
  		height: 100,
  		handler: function() {
  			app.views.viewport.setActiveItem(app.views.map, {type: 'slide', direction: 'left'});
  		}
  	},

## Extra Task

In the 'main.js' file found in the cloud directory, find the following code snippet.

	var MARKERS = {
	  locations: [
	    {
	      lat: '52.245671',
	      lon: '-7.080002'
	    },
	    {
	      lat: '52.257861',
	      lon: '-7.136993'
	    }
	  ]
	};

Changes the longitude and latitude values and then view the map page. The markers on the page should now be located in a new position.

<a href="https://github.com/feedhenry/FH-Training-App-Sencha/zipball/v4">Finished Code Pt3.zip</a>