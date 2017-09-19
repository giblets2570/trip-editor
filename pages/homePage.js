const signupCommands = {  
  signup(name, email, pass) {
    return this
      .waitForElementVisible('@emailInput',10000)
      .click('@toggleLogin')
      .setValue('@nameInput', name)
      .setValue('@emailInput', email)
      .setValue('@passInput', pass)
      .setValue('@passCheckInput', pass)
      .waitForElementVisible('@submitButton')
      .click('@submitButton')
  }
};

module.exports = {  
  url: 'http://localhost:8000/',
  commands: [signupCommands],
  elements: {
    emailInput: {
      selector: '//*[@id="Email"]',
      locateStrategy: 'xpath'
    },
    toggleLogin: {
      selector: 'a[id=toggleLogin]'
    },
    nameInput: {
      selector: 'input[id=Name]'
    },
    passInput: {
      selector: 'input[id=Password]'
    },
    passCheckInput: {
      selector: 'input[id=PasswordCheck]'
    },
    submitButton: {
      selector: '//*[@id="submitButton"]',
      locateStrategy: 'xpath'
    }
  }
};