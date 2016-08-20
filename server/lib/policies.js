Meteor.startup(function() {
  BrowserPolicy.content.allowImageOrigin("*");
  BrowserPolicy.content.allowMediaOrigin("*")
});
