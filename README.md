# FeedHenry Sencha Tutorial - v1

## Overview

In this tutorial we will be creating the basic structure of the app. At the end of this tutorial you will know how to:

* Initialize the Sencha touch library   (app/app.js)
* Create a viewport                     (app/views/Viewport.js)
* Create a view with some UI components (app/views/Home.js)

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v1/docs/HomeView.png)

## Step 1

First we need to initialize the Sencha Touch framework. This code registers the 'app' namespace and also creates an instance of the viewport. The viewport will contain any view that will be used in the app. This is done by adding the following code to app.js.

	/* name: 'app' will create the following namespaces:
	 * app.views,
	 * app.models,
	 * app.controllers,
	 * app.stores
	 */
	Ext.regApplication({
	  name: 'app',
	  launch: function() {
	  	console.log("App Launched");
	  	/*
	  	 * Uncomment the below line once you've written viewport.js
	  	 * as tasked in Step 2
	  	 */
	    //this.views.viewport = new this.views.Viewport();
	  }
	});

## Step 2

Now that the Sencha Touch framework is initialized we can create the viewport. Create a file 'Viewport.js' in the views directory. Think of the viewport as a container that will hold any views/pages we will use in the app. The comments below explain the signifigance of each part of code.

	/*
	 * Add our Viewport to the views namespace. 
	 * The Viewport is going to be a Panel, a type of Sencha component.
	 * The viewport will hold our cards (views/pages) that we will switch
	 * between when using the app.
	 */
	app.views.Viewport = Ext.extend(Ext.Panel, {
	  fullscreen: true,
	  ui: 'light',
	  layout: 'card',

	  /*
	   * The animation type, if any, that will be used for swtching between the
	   * cards we have stored in the Viewport.
	   */
	  cardSwitchAnimation: {
	    type: 'slide',
	    cover: true
	  },

	  initComponent: function() {
	    /*
	     * Put instances of cards into app.views namespace
	     * These cards will be other views you have defined
	     */
	    Ext.apply(app.views, {

	    });
	    // Put instances of cards (views) into viewport here
	    Ext.apply(this, {
	      items: [

	      ]
	    });
	    app.views.Viewport.superclass.initComponent.apply(this, arguments);
	  }
	});

	/*
	 * This global variable will hold a loading spinner (Load Mask). 
	 * Where necessary we can call mask.show() for loading pages.
	 */
	var mask = new Ext.LoadMask(Ext.getBody(), {
	  msg: "Loading Data"
	});


We add any views we create to the instance of the viewport. The first view we create is the 'Home' view, this view contains a number of buttons which (In later versions) will go to different views.

## Task - Add a view to the viewport

Inside the ‘initComponent’ function locate the following code;

	//put instances of cards into viewport
	Ext.apply(this, {
	  items: [

	  ]
	});

Inside the items array add the following code;

	{
	  html: 'Test View'
	}

If you open your index.html page you will now see the following;

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v1/docs/TestView.png)

<a href="https://github.com/feedhenry/FH-Training-App-Sencha/zipball/v2">Finished Code Pt1.zip</a>