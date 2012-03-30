/*
 * Hide the back buttons
 */
app.hideBack = true;

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
    /*
     * I can't see the signifigance of this, commenting it out seems to make no difference to the 
     * app when built. Ask Sean maybe -- Evan -- 
     */
    /*layoutOrientation : function(orientation, w, h) {
        app.views.Viewport.superclass.layoutOrientation.call(this, orientation, w, h);        
    }*/
});

// Loading Spinner
var mask = new Ext.LoadMask(Ext.getBody(), {
  msg: "Loading Data"
});