app.controllers.settings = new Ext.Controller({

  /* 
   * Load settings from local storage
   */
  loadSettings: function() {
    /*
     * Call a load using fh.data.  
     */
    $fh.data({
      act: 'load',
      key: 'settings'
    }, function(res) {
      /*
       * If no settings have been saved yet quit this function as none can be loaded
       */
      if (res.val === null) return;

      var settings = JSON.parse(res.val);

      /*
       * Set the values of the fields by targeting their ID
       */
      Ext.getCmp('title' ).setValue(settings.title);
      Ext.getCmp('name'  ).setValue(settings.fullname);
      Ext.getCmp('toggle').setValue(settings.toggle);
      Ext.getCmp('slider').setValue(settings.slider);
    });
  },

  /*
   * Save settings to local storage
   */
  saveSettings: function() {
    /*
     * Get the values of the fields by targeting their ID.
     * Then place these values into an array to be stored locally using the fh.data call
     */
    var settings = {
      title:    Ext.getCmp('title').getValue(),
      fullname: Ext.getCmp('name').getValue(),
      toggle:   Ext.getCmp('toggle').getValue(),
      slider:   Ext.getCmp('slider').getValue()
    };

    /*
     * Call a save using fh.data, the settings array will be saved as JSON on the device. 
     */
    $fh.data({
      act: 'save',
      key: 'settings',
      val: JSON.stringify(settings)
    });
    Ext.Msg.alert('Success', 'Your settings have been saved.', Ext.emptyFn);
  }

});