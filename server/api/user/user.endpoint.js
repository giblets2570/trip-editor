'use strict';

import Endpoint from '../../utilities/endpoint';

class UserEndpoint extends Endpoint {
  	endpoints() {
		this.router.post('/', this.create.bind(this));
		this.router.get('/', this.index.bind(this));
		this.router.get('/:id', this.show.bind(this));
		this.router.put('/:id', this.update.bind(this));
		this.router.delete('/:id', this.destroy.bind(this));
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
}

module.exports = UserEndpoint