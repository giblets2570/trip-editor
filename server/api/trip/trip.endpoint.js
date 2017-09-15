'use strict';

import Endpoint from '../../utilities/endpoint';

class TripEndpoint extends Endpoint {
  	endpoints() {
		this.router.post('/', this.Auth.hasRole('user'), this.create.bind(this));
		this.router.get('/', this.Auth.hasRole('user'), this.index.bind(this));
		this.router.get('/:id', this.Auth.hasRole('user'), this.show.bind(this));
		this.router.put('/:id', this.Auth.hasRole('user'), this.update.bind(this));
		this.router.delete('/:id', this.Auth.hasRole('user'), this.destroy.bind(this));
  	}

  	async create(req, res) {
  		req.body.user = req.user._id;
		return super.create(req, res);
	}

	async index(req, res) {
		let trips;
		let query = req.query;
		if(req.user.role == 'user' || req.user.role == 'manager'){
			query.user = req.user._id;
		}
		try {
			trips = await this.service.index(query);
		} catch(error) {
			return this.sendError(res,error);
		}
		return res.send(trips);
	}
}

module.exports = TripEndpoint