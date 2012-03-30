# FeedHenry Sencha Tutorial - Part 5

## Overview

'git checkout v4' to get the starting code for this tutorial.

In this tutorial we will adding a new view for credit card validation. This will demonstrate the use of input fields and web requests using $fh.web().

* Integrate an app with a Credit Card validation service 'CCChecker'.
* Learn to use input fields and read from them with Ext.getCmp.
* Use $ fh.web()

![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v5/docs/creditCard.png)

## Step 1

Begin by creating the Payment view file in views, name it Payment.js and add the following code. New components are introduced here. Namely the 'form', 'textfield', 'selectfield' and 'fieldset'. 
	
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
	          // The fieldset is used to hold fields as items. 
	          // The main purpose of the fieldset is to add a title and to group fields.
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

## Task

In Step 1 we defined our view, now we must add it to index.html to make Sencha aware it exists. We must also add the Payment view to our Viewport.js and update our Home.js file with an icon for payment and handler to switch to the Payment view. Add these if you have not done so already. Now try to see if the view works with the references to the controller commented out.

## Step 2 

Now that our views have been created we need to add in the necessary controllers for the functionality of the Payments section. The controller is added to app.controllers and instantiated using Ext.Controller. The controller relies on a cloud call which are done using $fh.act(). The function called from the cloud is payment() as specified by 'act: payment'.

	app.controllers.payment = new Ext.Controller({

	  /*
	   * Check if a credit card number if valid
	   */
	  processPayment: function() {
	    /*
	     * Ext.getCmp will get a component via it's id. 
	     * In this case we get our credit card view fields and their values(getValue())
	     */
	    var cardType   = Ext.getCmp("cardtype").getValue();
	    var cardNumber = Ext.getCmp("cardnumber").getValue();

	    if (cardNumber.length !== 16) {
	      Ext.Msg.alert('Error', 'Card number must be 16 digits.', Ext.emptyFn);
	      return;
	    }
	    
	    // Show loading spinner
	    mask.show();

	    // Call to the cloud (main.js in the cloud directory) to run payment() function.
	    $fh.act({
	      act: 'payment',
	      req: {
	        cardType: cardType,
	        cardNumber: cardNumber
	      }
	    }, function(res) {
	      alert(JSON.stringify(res));
	      console.log(res);

	      var regEx  = new RegExp("<\s*string[^>]*>(.*?)<\s*/\s*string>", "g");
	      var result = regEx.exec(res.body)[1];

	      // Hide loading spinner
	      mask.hide();

	      // Empty the credit card field
	      Ext.getCmp("cardnumber").setValue();

	      Ext.Msg.alert('Response', result, Ext.emptyFn);
	    });
	  }

	});

## Step 3

The payment function() now needs to be added to our cloud functions in main.js in the cloud directory. This function will perform a web request ($fh.web) to the URL specified with the parameters provided by our $fh.act call in app.controllers.payment. 

	/*
	 * Payment
	 */ 
	function payment() {
	  var cardType   = $params.cardType;
	  var cardNumber = $params.cardNumber;
	  var url = "http://www.webservicex.net/CreditCard.asmx/ValidateCardNumber?cardType=" + cardType + "&cardNumber=" + cardNumber;

	  return $fh.web({
	    url: url,
	    method: 'GET'
	  });
	}

## Task

Verify what you have made is working by trying to validate a number sequence such as '0000000000000000'. You should receive the output shown below.


![](https://github.com/feedhenry/FH-Training-App-Sencha/raw/v5/docs/creditCardCall.png)

'git checkout v5' to get the completed code for this section which is also the starting point for the <a href="https://github.com/feedhenry/FH-Training-App-Sencha/tree/v5">next section.</a>
