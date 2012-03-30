/*
 * Add our Viewport to the views namespace. 
 * The Viewport is going to be a Panel, a type of Sencha component.
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
 * This variable will hold a loading spinner (Load Mask). 
 * When necessary we can call mask.show() for loading pages.
 */
var mask = new Ext.LoadMask(Ext.getBody(), {
  msg: "Loading Data"
});
