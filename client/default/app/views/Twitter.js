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
   * We create a Sencha list component here. A list requires a store as it's data to display.
   * Lists also require an itemTpl that styles each list item. 
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