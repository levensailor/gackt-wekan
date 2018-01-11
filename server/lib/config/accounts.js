Meteor.startup(function() {

  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
      loginStyle: 'popup',
        clientId: 'C0813fa75ea4ca43c6f746c5a4280f0f200b74d74d0a3e5b8cb87212f73be6cc3',
        secret: '7ae3a2796b99b8e679de649abceebe82349c18ce4adc1704a6d4e6764dab71d7'
      }
    },
    { upsert: true }
  );

  Accounts.onCreateUser((options, user) => {
    console.log("onCreateUser");
    if (!user.services.google || !user.services.google.email.match(/(@presidio\.com)$/) ) {
      throw new Meteor.Error(403, AccountsTemplates.texts.errors.loginForbidden);
    }
    const { picture, email, name } = user.services.google;
    user.profile = {};
    user.profile.fullname = name;
    user.profile.emailBuffer = [email];
    user.profile.avatarUrl = picture;
    user.username = email;
    user.profile.initials = name.match(/[A-Z]/g).join("");

    // Don't forget to return the new user object at the end!
    return user;
  });
});
