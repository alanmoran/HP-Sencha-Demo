# FeedHenry Sencha Tutorial - Part 7

## Overview

'git checkout v6' to get the starting code for this section.

This short part of the tutorial will show you how to create a webview within your app. Doing this requires use of the $fh.webview() API call. At the end of this tutorial you will know how to.

* Initialize a webview using the FeedHenry API


![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v7/docs/webView.png)

## Step 1

To initialise a webview we will make a call to the necessary FeedHenry API, $fh.webview(). For more information on this API call see <a href="http://docs.feedhenry.com/api-reference/web-view/"> this </a>. As the webview is a seperate component to Sencha we will not need to create a view for it, all we need to do is initialise it with a call when we click the icon.

The code below is used to initialise the webview by clicking on the web icon and should be included in Home.js

		/* Webview & Settings Buttons  */
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
			  		/*
			  		 * Below we create a webview with a title of FeedHenry and request the
			  		 * specified URL
			  		 */
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
			  			
			  		}
			  	},
			  	{
			  		xtype: 'spacer'
			  	}
		    ]
	  	}),
	  	
'git checkout v7' to get the completed code foir this section which is also the starting point for the <a href="https://github.com/feedhenry/FH-Training-App-Sencha/tree/v7">next section.</a>