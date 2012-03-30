# FeedHenry Sencha Tutorial - v4

## Overview

In this tutorial we will adding a new view for a Twitter feed page. You will learn to use stores, models and further use of FeedHenry APIs.

* Integrate an app with Twitter to pull tweets with a specified user name.
* Learn about Sencha stores and models.
* Use the $fh.web() function to make a web request for your app.

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v4/docs/twitterView.png)

## Step 1

Begin by creating the Twitter view file in views, name it Twitter.js and add the following code. This view uses a new layout type, 'vbox' which is used to stack elements vertically. We also will use the Sencha 'List' component to display tweets.
	
	  app.views.Twitter = Ext.extend(Ext.Panel, {
	  title: 'Twitter',
	  iconCls: 'time',
	  width: '100%',
	  /*
	   * Layout vbox is used to arrnage items (tweets) stacked above one another
	   */
	  layout: {
	    type: 'vbox'
	  },

	  listeners: {
	  	show: function() {

	  	}
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
	          }
	        }
	      ]
	    }
	  ],
	  
	  /*
	   * Below we declare a list. It's store is set to our twitter store. 
	   * This store is defined in another file. 
	   * The itemTpl is a template that defines how list items are styled.
	   * Anything in the tpl surrounded by {} means that the store 
	   * contains this variable and to populate this list item using that data.
	   */
	  items: [
	    {
	      xtype: 'list',
	      width: '100%',
	      store: app.stores.twitter,
	      itemTpl: '<img style="float: left; margin: 0px 8px 8px 0px;" src="{profile_image_url}" />' + 
	      '<strong>{from_user}</strong>' +
	      '{text}',
	      flex: 1,
	      plugins: [{
	        ptype: 'pullrefresh'
	      }]
	    }
	  ]
	  });

## Step 2

You will have seen from Step 1 that we added a list component to the Twitter view. This list is using a store, app.stores.twitter. We must define this store. In the models folder create a file called Twitter.js and add the code below. In this code we define a proxy for the model. The proxy is used to control loading and saving data to the store. The proxy here relies on a FeedHenry API call $fh.act(). The data format is JSON and the function name is 'getTweets'. The device will use $fh.act() to call the funtion from the Cloud. The function is defined in main.js file under the cloud directory. 
	

	/*
 	 * Here we create a model using regModel. 
 	 * The model will be used by a store as a template for it's data format.
 	 * See that the fields here correspond to data the itemTpl will need.
 	 */
	app.models.Twitter = Ext.regModel('app.models.Twitter', {
	  fields: ['from_user', 'text', 'profile_image_url', 'from_user_name'],
	  proxy: {
	    type: 'fhact',
	    reader: 'json',
	    id: 'getTweets'
	  }
	});

	/*
	 * Create the Twitter store for tweets using the above model. 
	 * The store is empty, but will be populated using the model proxy.
	 */
	app.stores.twitter = new Ext.data.Store({
	  model: 'app.models.Twitter',
	  autoLoad: true,
	});

## Step 3 

To populate our store with tweets we add the following function to the main.js file in our cloud directory. The app.stores.twitter using the app.models.Twitter will invoke this call to populate the list automatically due to it's proxy. 

	function getTweets() {
	  var username   = 'feedhenry';
	  var num_tweets = 10;
	  var url        = 'http://search.twitter.com/search.json?q=' + username;

	  var response = $fh.web({
	    url: url,
	    method: 'GET',
	    allowSelfSignedCert: true
	  });
	  return {'data': $fh.parse(response.body).results};
	}


## Task

Try to finish out the adding of the Twitter section of the app. This will be similar to adding our Map view from v3. Remember the steps invloved:

* Update index.html
* Add the view to Viewport.js
* A button needs to be added to the homepage and styled with CSS.
* The button requires a handler with setActiveItem(app.views.ViewName).


## Step 4 

These steps are needed if you have not finished adding the Twitter page. Make sure to update index.html to include the new files we have made. Add the following line under our app.js include.

	<!-- Models -->
	<script type="text/javascript" src="app/models/Twitter.js"></script> 

And add the following line under our <!-- Views --> tag.

	<script type="text/javascript" src="app/views/Twitter.js"></script>

Viewport.js now needs to be updated to include our Twitter view. Insert the following code to do this. 
	
	initComponent: function() {
	    // Put instances of cards into app.views namespace
	    Ext.apply(app.views, {
	      home:     new app.views.Home(),
	      map:      new app.views.MapView(),
	      twitter:  new app.views.Twitter()
	    });
	    //put instances of cards into viewport
	    Ext.apply(this, {
	      items: [
	        app.views.home,
	        app.views.map,
	        app.views.twitter
	      ]
	    });
	    app.views.Viewport.superclass.initComponent.apply(this, arguments);
	 }

## Step 5

Home.js also needs to be updated. If you haven't added a Twitter button do so now and add the following handler function to it. 

	handler: function() {
			  	app.views.viewport.setActiveItem(app.views.twitter, {type: 'slide', direction: 'left'});
			  }


![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v4/docs/tweets.png)

<a href="https://github.com/feedhenry/FH-Training-App-Sencha/zipball/v5">Finished Code Pt4.zip</a>