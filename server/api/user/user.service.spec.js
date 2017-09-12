import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
let UserService = require('./user.service');
let Service = require('../../utilities/service');

let mock = () => new Promise((resolve,reject) => {
	mockgoose(mongoose).then(() => mongoose.connect('',(error) => {
		if (error) return reject(error);
		resolve();
	}));
});

describe('UserService',() => {

	let service, agent_service, location_service, device_service;
	let agent1, agent2, customer1, customer2;

	before(function* () {
		yield mock();
		agent_service = new Service(Agent);
		location_service = new Service(Location);
		device_service = new Service(Device);
		service = new UserService(agent_service, location_service, device_service);
	});

	after(function() {
		mockgoose.reset();
		mongoose.connection.close();
	});

	beforeEach(function*() {
		agent1 = {_id: "589c77f7747b2b82f786cf86"};
		agent2 = {_id: "589c77f7747b2b82f786cf87"};
		customer1 = {_id: "589c77f7747b2b82f786cf88", type: "customer"};
		customer2 = {_id: "589c77f7747b2b82f786cf89", type: "customer"};
	});

	afterEach(function() {
		mockgoose.reset();
	})
	
	describe('.post()',() => {
		it('should return that the agent was created', function*(){
			let agents = [agent1,agent2];
			let response = yield service.post({agents: agents});
			expect(response).to.have.key("agents");
			expect(response.agents).to.have.length(2);
			// expect(response.agents[0]).to.have.any.keys(["_id"]);
			// expect(response.agents[0]._id.toString()).to.be.equal(agent1._id);
		});

		it('should return that the agent was userd', function*(){
			let response = yield service.post({agents: [agent1,agent2]});
			let second_response = yield service.post({agents: [agent1]});
			expect(second_response).to.have.key("agents");
			expect(second_response.agents).to.have.length(1);
			// expect(second_response.agents[0]).to.have.any.keys(["_id"]);
			// expect(second_response.agents[0]._id.toString()).to.be.equal(agent1._id);
		});

		it('should return that the agent and customer were created was userd', function*(){
			let response = yield service.post({agents: [agent1], locations: [customer1]});
			expect(response).to.contain.key("agents");
			expect(response).to.contain.key("locations");
			expect(response.agents).to.have.length(1);
			expect(response.locations).to.have.length(1);
			// expect(response.agents[0]).to.have.any.keys(["_id"]);
			// expect(response.locations[0]).to.have.any.keys(["_id"]);
			// expect(response.agents[0]._id.toString()).to.be.equal(agent1._id);
			// expect(response.locations[0]._id.toString()).to.be.equal(customer1._id);
		});
	});
});