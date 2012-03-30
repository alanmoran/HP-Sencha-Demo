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