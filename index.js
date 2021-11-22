Ti.App.Properties.getObject('user', null) == null ?
Alloy.createController('askForLogin').getView().open():
Alloy.createController(Ti.App.Properties.getString('page', '')).getView().open();