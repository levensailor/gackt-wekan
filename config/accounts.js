// Only allow festivaljapon logins
Accounts.config({ restrictCreationByEmailDomain: 'festivaljapon.com'});

AccountsTemplates.configure({
  defaultLayout: 'userFormsLayout',
  defaultContentRegion: 'content',
  confirmPassword: false,
  enablePasswordChange: false,
  sendVerificationEmail: false,
  showForgotPasswordLink: false,
  forbidClientAccountCreation: true,
  onLogoutHook() {
    const homePage = 'home';
    if (FlowRouter.getRouteName() === homePage) {
      FlowRouter.reload();
    } else {
      FlowRouter.go(homePage);
    }
  }
});

['signIn'].forEach(
  (routeName) => AccountsTemplates.configureRoute(routeName));

AccountsTemplates.configure({
  texts: {
    errors: {
      mustBeLoggedIn: "Please login with your Matsuri account.",
      loginForbidden: "Only Matsuri accounts are allowed."
    }
  }
});
