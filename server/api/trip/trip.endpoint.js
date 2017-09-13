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
}

module.exports = TripEndpoint