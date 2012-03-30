# FeedHenry Sencha Tutorial - v2

## Overview

In this tutorial we will be creating the home view

* Create a view with a number of UI components.
* Learn about xtype
* Use CSS to style our Sencha components. 

![](https://github.com/feedhenry/FH-Training-App-Sencha/blob/v2/docs/HomeView.png?raw=true)

## Step 1

In the css directory add a file called 'home.css'. This file will override the Sencha Touch styles that are applied and style our icon as necessary. 

	.mapIcon {
	  width: 100px !important;
	  width: 100px !important;
	  background-color: transparent !important;
	  border: none !important;
	  background-size: 100% 100%;
	  background-image: url("../images/icons/maps_icon.png") !important;
	}
	.mapIcon:active, .mapIcon:hover {
		opacity: 0.5;
	}

## Step 2

In the views directory create a view called 'Home.js' with the following code. This will create our Home panel that holds icons. The code comments below explain what each line is doing.

	app.views.Home = Ext.extend(Ext.Panel, {
	  title: 'Home',

	  /*
	   * IconCls is used to set a CSS class that applies an image to be used as an icon.
	   * This will only be used if we setup a tabBar
	   */
	  iconCls: 'home',

	  /*
	   * dockedItems are items that are docked to the top or bottom of a panel/view
	   * The 'xtype' tells Sencha what type of component we're going to use.
	   * Examples of xtype include 'panel', 'toolbar', 'selectfield' and 'list'.
	   */
	  dockedItems: [
	  	{
	  		dock: 'top',
	  		xtype: 'toolbar',
	  		title: '<img class="logo" src="app/images/logo.png" />',
	  	}
	  ],

	  /*
	   * items to be added to the panel, 
	   * these can also take an xtype
	   */
	  items: [
	    // This a blank panel to act as padding
	    {
	  		xtype: 'panel',
	  		height: 20
	  	},

	  	/* 
	  	 * Google Maps & Twitter Buttons
	  	 * We use new Ext.Panel here to create a panel.
	  	 * Alternatively we could have { xtype: 'panel', height: 100, etc... }
	  	 */
	  	new Ext.Panel({
	  		height: 100,

	  		/*
	  		 * Layout specifies how items should be arranged.
	  		 * hbox arranges items horizontally across their container
	  		 * spacers are used below to layout the icons neatly with padding
	  		 */
	  		layout: {
		      type: 'hbox',
		      pack: 'center',  
		    },
		    items: [
		    	{
			  		xtype: 'spacer'
			  	},
			  	{
			  		xtype: 'button',
			  		cls: 'mapIcon',
			  		width:  100,
			  		height: 100,
			  		handler: function() {
			  			
			  		}
			  	},
			  	{
			  		xtype: 'spacer'
			  	},
			  	{
			  		xtype: 'button',
			  		cls: 'twitterIcon',
			  		width:  100,
			  		height: 100,
			  		handler: function() {
			  			
			  		}
			  	},
			  	{
			  		xtype: 'spacer'
			  	}
		    ]
	  	}),

	  ]
	});

## Step 3

Update the index.html page to add references to the css and javascript files we created.

	<link rel="stylesheet" type="text/css" href="app/css/home.css" />

and

	<script type="text/javascript" src="app/views/Home.js"></script>

![](https://github.com/feedhenry/FH-Training-App-Sencha/blob/v2/docs/HomeView.png?raw=true)

## Extra Task

Try and add some extra icons to the home screen, some sample images are provided in the images/icons directory. Add the necessary Twitter icon as shown in the image at the beggining of this tutorial. This will require extra CSS rules.

<a href="https://github.com/feedhenry/FH-Training-App-Sencha/zipball/v3">Finished Code Pt2.zip</a>