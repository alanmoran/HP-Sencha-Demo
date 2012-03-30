/*
 * Here we create a model using regModel. 
 * The model will be used by a store as a template for it's data format.
 */
app.models.Twitter = Ext.regModel('app.models.Twitter', {
  fields: ['from_user', 'text', 'profile_image_url', 'from_user_name'],
  proxy: {
    type: 'fhact',
    reader: 'json',
    id: 'getTweets'
  }
});

/*
 * Create the Twitter store for tweets using the above model. 
 * The store is empty, but will be populated using a function.
 */
app.stores.twitter = new Ext.data.Store({
  model: 'app.models.Twitter',
  autoLoad: true,
});