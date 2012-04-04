app.models.Stocks = Ext.regModel('app.models.Stocks', {
    fields: ['Name', 'Symbol', 'Last', 'Change', 'Date', 'Time', 'Open'],
});

app.stores.stocks = new Ext.data.Store({
  model: 'app.models.Stocks',
    data : []
});