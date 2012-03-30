# FeedHenry Sencha Tutorial - Part 8

## Overview

'git checkout v7' to get the starting code for this section.

This part of the tutorial will teach you how to use save and load settings from the device local storage using the $fh.data() API call. More information on this API call can be found <a href="http://docs.feedhenry.com/api-reference/local-storage/">here</a>. After completing this tutorial you will be able to.

* Save and load data from local storage on a device.
* Use the $fh.data() function.
* Use many types of input fields and components.


![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v8/docs/settingsView.png)

## Step 1

First we develop our controller for settings. The purpose of the controller is to save and load our settings from local storage when the settings view is called. $fh.data has 3 possible parameters for 'act:', these are : remove, save and load. A key is also required because $fh.data() works on a key value pair.

The code below should be copied into a settings.js file in controllers.

	  app.controllers.settings = new Ext.Controller({
	  /* 
	   * Load settings from local storage
	   */
	  loadSettings: function() {
	    /*
	     * Call a load using fh.data, we want to load our saved 'settings'.  
	     */
	    $fh.data({
	      act: 'load',
	      key: 'settings'
	    }, function(res) {
	      /*
	       * If no settings have been saved yet quit this function as none can be loaded.
	       * res.val would contain our settings if they existed
	       */
	      if (res.val === null) return;

	      var settings = JSON.parse(res.val);

	      /*
	       * Set the values of the fields by targeting their ID
	       */
	      Ext.getCmp('title' ).setValue(settings.title);
	      Ext.getCmp('name'  ).setValue(settings.fullname);
	      Ext.getCmp('toggle').setValue(settings.toggle);
	      Ext.getCmp('slider').setValue(settings.slider);
	    });
	  },

	  /*
	   * Save settings to local storage
	   */
	  saveSettings: function() {
	    /*
	     * Get the values of the fields by targeting their ID.
	     * Then place these values into an array to be stored locally using the fh.data call
	     */
	    var settings = {
	      title:    Ext.getCmp('title').getValue(),
	      fullname: Ext.getCmp('name').getValue(),
	      toggle:   Ext.getCmp('toggle').getValue(),
	      slider:   Ext.getCmp('slider').getValue()
	    };

	    /*
	     * Call a save using fh.data, the settings array will be saved as JSON on the device. 
	     */
	    $fh.data({
	      act: 'save',
	      key: 'settings',
	      val: JSON.stringify(settings)
	    });
	    Ext.Msg.alert('Success', 'Your settings have been saved.', Ext.emptyFn);
	  }

	});

## Task

Now we need to create our view for settings. This will be a form containing multiple input types, feel free to use any you like for now. We will read the value of these inputs and use these to be saved as the 'settings' key value by the controller. The Home.js and Viewport.js need to be updated to include an icon and the new settings view respectively. Try do this. Remember you need a Settings.js file in views and controllers and must also update the index.html which should now look as follows.

	<head>
	<title>FH Training</title>
	</head>

	<!-- Sencha Touch -->
	<script type="text/javascript" src="lib/touch/sencha-touch.js"></script>

	<!-- FeedHenry Sencha Proxy Lib -->
	<script type="text/javascript" src="lib/feedhenry/fhact.js"></script>

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="lib/touch/resources/css/sencha-touch.css" />
	<link rel="stylesheet" type="text/css" href="app/css/base.css" />
	<link rel="stylesheet" type="text/css" href="app/css/home.css" />

	<!-- Google Maps API -->
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>

	<!-- App -->
	<script type="text/javascript" src="app/app.js"></script>

	<!-- Models -->
	<script type="text/javascript" src="app/models/Twitter.js"></script>

	<!-- Views -->
	<script type="text/javascript" src="app/views/Viewport.js"></script>
	<script type="text/javascript" src="app/views/Home.js"></script>
	<script type="text/javascript" src="app/views/Camera.js"></script>
	<script type="text/javascript" src="app/views/Map.js"></script>
	<script type="text/javascript" src="app/views/Payment.js"></script>
	<script type="text/javascript" src="app/views/Settings.js"></script>
	<script type="text/javascript" src="app/views/Twitter.js"></script>

	<!-- Controllers -->
	<script type="text/javascript" src="app/controllers/Camera.js"></script>
	<script type="text/javascript" src="app/controllers/Map.js"></script>
	<script type="text/javascript" src="app/controllers/Payment.js"></script>
	<script type="text/javascript" src="app/controllers/Settings.js"></script>

## Step 2

If you have successfully created the app.views.Settings and can run it congratulations! If not then follow the next few steps. First create our app.views.Settings in Settings.js in views.

	app.views.Settings = Ext.extend(Ext.Panel, {
	  title: 'Settings',
	  iconCls: 'settings',
	  scroll: 'vertical',

	  listeners: {
	  	show: function() {
	      // Load settings from local storage if they exist
	      Ext.dispatch({
	        controller: app.controllers.settings,
	        action: 'loadSettings'
	      });
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
	  
	  items: [
	    {
	      xtype: 'form',
	      items: [
	        {
	          xtype: 'fieldset',
	          title: 'Personal Info',
	          instructions: 'Please enter the information above.',
	          defaults: {
	            labelAlign: 'left',
	            labelWidth: '30%'
	          },
	          items: [
	            {
	              xtype: 'selectfield',
	              id: 'title',
	              name: 'title',
	              label: 'Title',
	              options: [{
	                text: 'Mr',
	                value: 'mr'
	              }, {
	                text: 'Ms',
	                value: 'ms'
	              }, {
	                text: '...',
	                value: '...'
	              }]
	            },
	            {
	              xtype: 'textfield',
	              id: 'name',
	              name:  'name',
	              label: 'Name'
	            }
	          ]
	        },
	        {
	          xtype: 'fieldset',
	          title: 'App Config',
	          defaults: {
	            labelAlign: 'left',
	            labelWidth: '30%'
	          },
	          /*
	           * Another new field type. This creates a slider that can be dragged to values
	           */
	          items: [
	            {
	              xtype: 'sliderfield',
	              id: 'slider',
	              name: 'value',
	              label: 'Slider'
	            },
	            /*
	             * A new type of field, this field is toggled based on a tap by the user.
	             */
	            {
	              xtype: 'togglefield',
	              id: 'toggle',
	              name: 'enable',
	              label: 'Toggle Switch'
	            }
	          ]
	        },
	        {
	          layout: {
	            type: 'hbox',
	            pack: 'center',  
	          },
	          items: [
	            {
	              xtype: 'button',
	              text: 'Save Settings',
	              width: '80%',
	              height: '100%',
	              /*
	               * On clicking this button save our settings using a call to the controller.
	               */
	              handler: function() {
	                Ext.dispatch({
	                  controller: app.controllers.settings,
	                  action: 'saveSettings'
	                });
	              }
	            }
	          ]          
	        }
	      ]
	    },
	  ]
	});

## Step 3

Now we need to update the app.views.Home in Home.js to allow us access the settings view. The following code will allow us do that.

	new Ext.Panel({
  		height: 100,

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
		  		cls: 'webviewIcon',
		  		width:  100,
		  		height: 100,
		  		handler: function() {
		  			$fh.webview({
		  				title: 'FeedHenry',
		  				url: 'http://www.feedhenry.com/'
		  			});
		  		}
		  	},
		  	{
		  		xtype: 'spacer'
		  	},		  	
		  	{
		  		xtype: 'button',
		  		cls: 'settingsIcon',
		  		width:  100,
		  		height: 100,
		  		handler: function() {
		  			app.views.viewport.setActiveItem(app.views.settings, {type: 'slide', direction: 'left'});
		  		}
		  	},
		  	{
		  		xtype: 'spacer'
		  	}
	    ]
  	}),

## Step 4

All that is left to do now is update our Viewport.js file. We need to include the new settings view and apply it to our viewport in the usual manner.

	app.views.Viewport = Ext.extend(Ext.Panel, {
	  fullscreen: true,
	  ui: 'light',
	  layout: 'card',

	  cardSwitchAnimation: {
	    type: 'slide',
	    cover: true
	  },

	  initComponent: function() {
	    // Put instances of cards into app.views namespace
	    Ext.apply(app.views, {
	      home:     new app.views.Home(),
	      map:      new app.views.MapView(),
	      twitter:  new app.views.Twitter(),        
	      payment:  new app.views.Payment(),
	      settings: new app.views.Settings(),
	      camera:   new app.views.Camera()
	    });
	    //put instances of cards into viewport
	    Ext.apply(this, {
	      items: [
	        app.views.home,
	        app.views.payment,
	        app.views.twitter,
	        app.views.map,
	        app.views.settings,
	        app.views.camera
	      ]
	    });
	    app.views.Viewport.superclass.initComponent.apply(this, arguments);
	  }
	});

	// Loading Spinner
	var mask = new Ext.LoadMask(Ext.getBody(), {
	  msg: "Loading Data"
	});

'git checkout v8' to get the finished code for this section which is also the starting point for the <a href="https://github.com/feedhenry/FH-Training-App-Sencha/tree/v8">next section</a>