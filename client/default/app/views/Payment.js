app.views.Payment = Ext.extend(Ext.Panel, {
  title: 'Payment',
  iconCls: 'home',
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
  				}
  			}
  		]
  	}
  ],
  
  /*
   * Create the form within which we create input fields.
   */
  items: [
    {
      xtype: 'form',
      items: [
        {
          /*
           * The fieldset is used to hold fields as items. 
           * The main purpose of the fieldset is to add a title and to group fields.
           */
          xtype: 'fieldset',
          title: 'Payment Info',
          instructions: 'Please enter the payment information above.',
          defaults: {
            labelAlign: 'left',
            labelWidth: '50%'
          },
          /*
           * This selectfield creates a drop menu that holds the options defined.
           * These options can optionally be defined in a store instead of locally. 
           */
          items: [
            {
              xtype: 'selectfield',
              id: 'cardtype',
              name: 'cardtype',
              label: 'Card Type',
              options: [{
                text: 'Visa',
                value: 'visa'
              }, {
                text: 'Mastercard',
                value: 'mastercard'
              }]
            },
            {
              xtype: 'textfield',
              id: 'cardnumber',
              name: 'cardnumber',
              label: 'Card Number'
            },
          ]
        },
        /* 
         * This button calls out to our controller. 
         * The 'action' parameter specifies which function to call in the controller.
         */
        {
          xtype: 'button',
          text: 'Validate Card Number',
          handler: function() {
            Ext.dispatch({
              controller: app.controllers.payment,
              action: 'processPayment'
            });
          }
        }
      ]
    }
  ]
});