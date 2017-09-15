'use strict';

import Endpoint from '../../utilities/endpoint';

class UserEndpoint extends Endpoint {
  	endpoints() {
		this.router.post('/', this.create.bind(this));
		this.router.get('/', this.Auth.hasRole('manager'), this.index.bind(this));
		this.router.get('/:id', this.Auth.hasRole('user'), this.show.bind(this));
		this.router.put('/:id', this.Auth.hasRole('user'), this.update.bind(this));
		this.router.delete('/:id', this.Auth.hasRole('manager'), this.destroy.bind(this));
  	}
  	async create(req, res) {
		let newUser; 
		let data = req.body;
		try {
			newUser = await this.service.create(data);
		} catch(error) {
			return this.sendError(res,error);
		}
		res.status(201).send(newUser.profile);
	}
	async index(req, res) {
		let users;
		let query = req.query;
		if(req.user.role == 'manager'){
			query.role = 'user';
		}else if(req.user.role != 'admin'){
			return this.sendError(res,{message: 'Not authenticated'});
		}
		try {
			users = await this.service.index(query);
		} catch(error) {
			return this.sendError(res,error);
		}
		users = users.map((user) => user.profile);
		return res.send(users);
	}
}

module.exports = UserEndpoint