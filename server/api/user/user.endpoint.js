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
    async index(req, res) {
        let users;
        let query = req.query;
        if(req.user.role == 'manager'){
            query.role = 'user';
        }else if(req.user.role != 'admin'){
            return this.sendError(res, {message: 'Not authenticated'});
        }
        try {
            users = await this.service.index(query);
        } catch(error) {
            return this.sendError(res,error);
        }
        return res.send(users);
    }
    async update(req, res) {
        let user;
        let id = req.params.id;
        let data = req.body;
        try {
            user = await this.service.update(id,data)
            if(!user) throw new Error(`No existing user found for id ${id}`)
        } catch(error) {
            return this.sendError(res,error);
        }
        res.status(200).json(user);
    }
}

export default UserEndpoint