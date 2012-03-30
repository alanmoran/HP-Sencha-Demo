# FeedHenry Sencha Tutorial - v9

## Overview

In this version of the tutorial we will restructure the app appearance. Instead of using icons to access differernt features of the app we will use a Tab Panel. This is similar to the structure found in most apps. This would usually be a difficult task but with Sencha it is easy. At the end of this tutorial you will know how to;

* Create an App that uses a tab panel view.
* Add items to a tab panel.

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v9/docs/tabPanel.png)


## Step 1 

Begin by modifying the Viewport.js so that we only have Twitter, Map, Payment and Settings views included. As we will be using a Tab Panel we must refelect this by changing the Viewport.js to extend Ext.TabPanel and include a TabBar component.  

	/*
	 * Now we are extending TabPanel
	 */
	app.views.Viewport = Ext.extend(Ext.TabPanel, {

	    /*
	     * New component added to hold our icons.
	     * Dock specifies the location of the tab bar, 
	     * In iOS this will be bottom and usually top for Android as the themes follow this structure
	     */
	    tabBar: {
	      dock: 'bottom',
	      layout: {
	          pack: 'center'
	      }
	    },

	    fullscreen: true,
	    ui: 'light',
	    cardSwitchAnimation: {
	        type: 'slide',
	        cover: true
	    },
	    
	    initComponent: function() {
	        //put instances of cards into app.views namespace
	        Ext.apply(app.views, {
	          twitter:  new app.views.Twitter(), 
	          settings: new app.views.Settings(),
	          map:      new app.views.MapView(),
	          payment:  new app.views.Payment(),
	        });
	        //put instances of cards into viewport
	        Ext.apply(this, {
	          items: [
	            app.views.twitter,
	            app.views.map,      
	            app.views.payment,
	            app.views.settings,
	          ]
	        });
	        app.views.Viewport.superclass.initComponent.apply(this, arguments);
	    },
	});

	// Loading Spinner
	var mask = new Ext.LoadMask(Ext.getBody(), {
	  msg: "Loading Data"
	});

## Step 2

You will notice that our app still contains back buttons. These are not necessary any more as we are using a TabPanel. A simple way to remove these buttons is to add the following code to Viewport.js. This will cause the hidden property for any back buttons using 'hidden: app.hideBack || false' to be true therefore hiding the buttons.

	/*
	 * Hide the back buttons
	 */
	app.hideBack = true;

## Task - Updating the icons

Right now the icons assigned to the different views do not reflect their function. Try to update the icons by changing the 'iconCls' property of the views. Many of the icon type available to use can be seen in the Sencha <a href = "http://dev.sencha.com/deploy/touch/examples/kitchensink/"> Kitchen Sink </a>demo. Below are the classes we have used.

	// Settings view
	iconCls: 'settings',

	// Map view
	iconCls: 'locate',

	// Payment view
	iconCls: 'action',

	// Home/Twitter view
	iconCls: 'home',


The app with updated icons.

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v9/docs/tabPanelIcons.png)

<a href="https://github.com/feedhenry/FH-Training-App-Sencha/zipball/v9">Finished Code Pt9.zip</a>