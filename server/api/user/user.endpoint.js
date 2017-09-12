'use strict';

import Endpoint from '../../utilities/endpoint';

class UserEndpoint extends Endpoint {
  	endpoints() {
		this.router.post('/', this.Auth.hasRole('admin'), this.create.bind(this));
		this.router.get('/', this.index.bind(this));
		this.router.get('/:id', this.show.bind(this));
		this.router.put('/:id', this.update.bind(this));
		this.router.delete('/:id', this.destroy.bind(this));
  	}
}

module.exports = UserEndpoint