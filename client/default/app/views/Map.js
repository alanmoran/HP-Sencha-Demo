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
 * defined ealier.
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