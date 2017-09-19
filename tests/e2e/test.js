var config = require('../../nightwatch.conf.js');

function makeid(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = {
	before: function (browser, done) {
		server = require('../../server')
		done();
	},
	after: function(){
		// process.exit(0);
	},
	signup : function (browser) {

		const email = `${makeid(4)}@tom.com`;
		const name = `${makeid(4)}`;
		const password = 'test';

		const loginPage = browser.page.homePage();
		const tripsPage = browser.page.tripsPage();
		loginPage
			.navigate()
			.signup(name, email, password);


		tripsPage.waitForElementVisible('@navbarWelcome')
		tripsPage.expect.element('@navbarWelcome').text.to.contain(`Hi ${name}`);
		tripsPage.waitForElementVisible('@destinationInput')
  	},
  	'create-trip': function(browser) {
  		const tripsPage = browser.page.tripsPage();
  		tripsPage
			.navigate()
			.createTrip('Paris', new Date())
			.waitForElementVisible('@createdTripHeader')
			.expect.element('@createdTripHeader').text.to.contain('Paris');

  	}
};