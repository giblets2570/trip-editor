'use strict'

import Endpoint from '../../utilities/endpoint'
import { isValidDate } from '../../utilities/generic'
class TripEndpoint extends Endpoint {
  	endpoints() {
		this.router.post('/', this.Auth.hasRole('user'), this.create.bind(this))
		this.router.get('/', this.Auth.hasRole('user'), this.index.bind(this))
		this.router.get('/:id', this.Auth.hasRole('user'), this.show.bind(this))
		this.router.put('/:id', this.Auth.hasRole('user'), this.update.bind(this))
		this.router.delete('/:id', this.Auth.hasRole('user'), this.destroy.bind(this))
  	}

  	async create(req, res) {
  		if(!req.body.user) req.body.user = req.user._id;
  		if(!req.body.destination) return this.sendError(res,'Trip requires a destination');
  		if(isValidDate(req.body.startDate)) return this.sendError(res,'Trip requires a start date');
  		if(isValidDate(req.body.endDate)) return this.sendError(res,'Trip requires a end date');
		return super.create(req, res)
	}

	async index(req, res) {
		let trips
		let query = req.query
		if(req.user.role == 'user' || req.user.role == 'manager'){
			query.user = req.user._id
		}
		try {
			trips = await this.service.index(query)
		} catch(error) {
			return this.sendError(res,error)
		}
		return res.send(trips)
	}
}

export default TripEndpoint