app.views.Stocks = Ext.extend(Ext.Panel, {
  title: 'Stocks',
  iconCls: 'home',
  scroll: 'vertical',
  height: '100%',
  layout: 'fit',

  listeners: {
    beforeshow: function() {
    },
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
            app.stores.stocks.removeAll();
  				}
  			}
  		]
  	}
  ],
  
  items: [{
    xtype: 'panel',
    layout:{
    type:'vbox',
    align: 'strech'
 
   },
   defaults:{flex:'1'},
   items: [{
      xtype: 'form',
      items: [
        {
          xtype: 'fieldset',
          title: 'Search Stock Info',
          instructions: 'Enter company name above to perform a mash-up.',
          defaults: {
            labelAlign: 'left',
            labelWidth: '50%'
          },
          items: [
            {
              xtype: 'textfield',
              id: 'companyName',
              name: 'Company Name'
            },
          ]
        },
        {
          xtype: 'button',
          text: 'Submit',
          handler: function() {
            Ext.dispatch({
              controller: app.controllers.stocks,
              action: 'getStocks'
            });
          }
        }
      ]
    },{
      id:"stockResults",
      xtype: 'list',
      width: '100%',
      disableSelection: true,
      scroll: "vertical",
      store: app.stores.stocks,
      itemTpl:'<h2>Stock: {Symbol}</h2><ul><li>Change:  {Change}</li><li>Date:  {Date}</li><li>Last:  {Last}</li><li>Name:  {Name}</li><li>Symbol:  {Symbol}</li><li>Time:  {Time}</li></ul>',
      flex: 1
    }]
  }]
});