var config = require('../nightwatch.conf.js');

function makeid(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = {
	before: function (browser, done) {
		server = require('../server')
		done();
	},
	signup : function (browser) {

		const email = `${makeid(4)}@tom.com`;
		const name = `${makeid(4)}`;
		const password = 'test';

		const loginPage = browser.page.homePage();

		loginPage
			.navigate()
			.signup(name, email, password);

		// instancesPage.expect.element('@instancesListDescription').text.to.contain('Your first instance.');

		browser.end();
  	}
};