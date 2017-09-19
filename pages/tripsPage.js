const tripsCommands = {  
  createTrip(destination, date) {


    let day = date.getDate();
    let month = date.getMonth() + 1;
    if(month < 10) month = `0${month}`
    let year = date.getFullYear();
    let fullDate = `${day}/${month}/${year}`

    tomorrow = new Date(date.valueOf() + 1000 * 60 * 60 * 24);

    day = tomorrow.getDate();
    month = tomorrow.getMonth() + 1;
    if(month < 10) month = `0${month}`
    year = tomorrow.getFullYear();
    let tomorrowFullDate = `${day}/${month}/${year}`

    return this
      .waitForElementVisible('@toggleButton',10000)
      .click('@toggleButton')
      .waitForElementVisible('@createTripButton',10000)
      .click('@createTripButton')
      .waitForElementVisible('@createModal')
      .waitForElementVisible('@createDestinationInput')
      .setValue('@startDateButton', fullDate)
      .setValue('@endDateButton', tomorrowFullDate)
      .setValue('@createDestinationInput', destination)
      .setValue('@comments', 'This trip will be wonderful')
      .click('@submitButton')
  }
};

module.exports = {  
  url: 'http://localhost:8000/',
  commands: [tripsCommands],
  elements: {
    destinationInput: {
      selector: 'input[id=DestinationFilter]'
    },
    createDestinationInput: {
      selector: '//*[@id="Destination"]',
      locateStrategy: 'xpath'
    },
    navbarWelcome: {
      selector: '//*[@id="react-no-print"]/div/div[1]/div/div[1]/nav/a',
      locateStrategy: 'xpath'
    },
    createTripButton: {
      selector: '//*[@id="react-no-print"]/div/div[1]/div/div[1]/nav/div/ul/li[2]/a',
      locateStrategy: 'xpath' 
    },
    createModal: {
      selector: '/html/body/div[3]/div/div[1]',
      locateStrategy: 'xpath'
    },
    toggleButton: {
      selector: '//*[@id="react-no-print"]/div/div[1]/div/div[1]/nav/button',
      locateStrategy: 'xpath'
    },
    startDateButton: {
      selector: '//*[@id="startDateCreate"]',
      locateStrategy: 'xpath'
    },
    endDateButton: {
      selector: '//*[@id="endDateCreate"]',
      locateStrategy: 'xpath'
    },
    comments: {
      selector: 'textarea[id=Comments]'
    },
    submitButton: {
      selector: '/html/body/div[3]/div/div[1]/div/div/div[2]/form/button',
      locateStrategy: 'xpath'
    },
    createdTripHeader: {
      selector: '//*[@id="react-no-print"]/div/div[1]/div/div[2]/div[2]/div/div/h3',
      locateStrategy: 'xpath'
    }
  }
};