import simulate from './simulate';

describe('Simulate',function() {

	let result;

	it('should complate where dase case', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([[]],[[]]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [[]],
			routes: [[]],
			record: []
		});
	})

	it('should complate where device at a location with no routes valid', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([[]],[['abc']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['abc']],
			routes: [[]],
			record: []
		});
	})

	it('should complate where device at a location with plenty of route valid', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def']],[['abc']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['abc']],
			routes: [['abc','def']],
			record: []
		});
	})

	it('should complate where device with a single step to reach should complete', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def']],[['abc','def']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['def']],
			routes: [['def']],
			record: [{
				route: 0,
				devices: [0],
				start: 'abc',
				end: 'def'
			}]
		});
	})

	it('should complate where device with a single step to reach where the route is a step away should complete', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def','ghi']],[['def','ghi']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['ghi']],
			routes: [['ghi']],
			record: [{
				route: 0,
				devices: [],
				start: 'abc',
				end: 'def'
			},{
				route: 0,
				devices: [0],
				start: 'def',
				end: 'ghi'
			}]
		});
	})

	it('should work for multiple devices on route', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def','ghi']],[['abc','def'],['def','ghi']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['def'],['ghi']],
			routes: [['ghi']],
			record: [{
				route: 0,
				devices: [0],
				start: 'abc',
				end: 'def'
			},{
				route: 0,
				devices: [1],
				start: 'def',
				end: 'ghi'
			}]
		});
	})

	it('should work for multiple devices on route with crossover', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def','ghi']],[['abc','def','ghi'],['def','ghi']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['ghi'],['ghi']],
			routes: [['ghi']],
			record: [{
				route: 0,
				devices: [0],
				start: 'abc',
				end: 'def'
			},{
				route: 0,
				devices: [0,1],
				start: 'def',
				end: 'ghi'
			}]
		});
	})

	it('should work for multiple routes and devices on route with crossover', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def'],['def','ghi']],[['abc','def','ghi'],['def','ghi']]);
		expect(result).to.deep.equal({
			complete: true,
			schedules: [['ghi'],['ghi']],
			routes: [['def'],['ghi']],
			record: [{
				route: 0,
				devices: [0],
				start: 'abc',
				end: 'def'
			},{
				route: 1,
				devices: [0,1],
				start: 'def',
				end: 'ghi'
			}]
		});
	})

	it('should not work but get very close when final device step missing', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','def'],['def','ghi']],[['abc','def','ghi'],['def','ghi','jkl']]);
		expect(result).to.deep.equal({
			complete: false,
			schedules: [['ghi'],['ghi','jkl']],
			routes: [['def'],['ghi']],
			record: [{
				route: 0,
				devices: [0],
				start: 'abc',
				end: 'def'
			},{
				route: 1,
				devices: [0,1],
				start: 'def',
				end: 'ghi'
			}]
		});
	})

	it('should not work with fairly complex example with middle stops', function(){
		// Call simulate where parameters are (routes,schedules)
		result = simulate([['abc','m1'],['m1','def'],['def','ghi'],['ghi','m2'],['m2','jkl']],[['abc','ghi'],['def','jkl']]);
		expect(result).to.deep.equal({
			complete: false,
			schedules: [['abc','ghi'],['def','jkl']],
			routes: [['abc','m1'],['m1','def'],['def','ghi'],['ghi','m2'],['m2','jkl']],
			record: []
		});
	})

	it('should work with a very complex example with lots of routes and devices', function(){

		let createRoute = (firstCustomerNumber,lastCustomerNumber,engineerNumber) => {
			let route = [];
			for (let i=firstCustomerNumber; i<=lastCustomerNumber; i++){
				route.push(`c${i}`);
			}
			route.push(`e${engineerNumber}`);
			for (let i=lastCustomerNumber; i>=firstCustomerNumber; i--){
				route.push(`c${i}`);
			}
			return route;
		}

		let routes = [
			createRoute(0,2,0),
			createRoute(3,4,1),
			createRoute(5,10,2),
			createRoute(10,16,3),
			createRoute(17,22,4),
			createRoute(23,30,5),
			createRoute(31,40,1),
			createRoute(41,50,2)
		]

		let engineers = {};
		let customers = [];
		for (let route of routes){
			let engineer = route.find(
				(location) => (location.startsWith('e'))
			);
			for (let location of route){
				if (location.startsWith('c')){
					let customer = location;
					engineers[customer] = engineer;
					if (!customers.contains(customer)){
						customers.push(customer);
					}
				}
			}
		}

		let devices = customers.map((_,i) => i);
		let schedules = devices.map((device) => {
			let customer = `c${device}`;
			let engineer = engineers[customer];
			return [customer,engineer,customer];
		});

		result = simulate(routes,schedules);
		expect(result).to.have.any.keys([
			'complete',
			'schedules',
			'routes',
			'record'
		])
		expect(result.complete).to.equal(true);
		expect(result.routes).to.deep.equal(routes.map((route) => route.slice(route.length-1)));
		expect(result.schedules).to.deep.equal(schedules.map((schedule) => schedule.slice(schedule.length-1)));
	})

})
