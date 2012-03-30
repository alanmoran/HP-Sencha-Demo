app.controllers.stocks = new Ext.Controller({

  getStocks: function() {
    var companyName  = Ext.getCmp("companyName").getValue();

    if (companyName.length == 0) {
      Ext.Msg.alert('Error', 'You must enter a company name.', Ext.emptyFn);
      return;
    }
    // Show loading spinner
     mask.show();

    // Call to the cloud
    $fh.act({
      act: 'getStockInfo',
      req: {
        name: companyName,
      }
    }, function(res) { 
      //Adding res to store
      app.stores.stocks.add({Name: res.stockInfo.Name, Symbol:res.stockInfo.Symbol, Last: res.stockInfo.Last, Change: res.stockInfo.Change, Date: res.stockInfo.Date, Open: res.stockInfo.Open, Time: res.stockInfo.Time});

      // Hide loading spinner
      mask.hide();

      //Empty the company field
      Ext.getCmp("companyName").setValue();

    },function(err){
      mask.hide();
      Ext.Msg.alert('Error', 'An error has occurred with your request. Please try again.', Ext.emptyFn);
    });
  }

});