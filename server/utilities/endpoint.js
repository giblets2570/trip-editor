'use strict';

class Endpoint {

  constructor(router,service,Auth) {

    // Set object attributes
    this.router = router;
    this.service = service;
    this.Auth = Auth;
    
    // Set endpoints
    this.endpoints();
  }

  endpoints() {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.index.bind(this));
    this.router.get('/:id', this.show.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.destroy.bind(this));
  }

  sendError(response,error){
    response.status(500).send({
      message: error.toString(),
      detail: error.stack
    });
  }

  async index(req, res) {
    let objects;
    let query = req.query;
    try {
      objects = await this.service.index(query);
      console.log(`Object: ${objects}`);
    } catch(error) {
      return this.sendError(res,error);
    }
    return res.send(objects);
  }

  async show(req, res) {
    let object
    let id = req.params.id;
    let query = req.query;
    try {
      object = await this.service.show(id,query);
    } catch(error) {
      return this.sendError(res,error);
    }
    if (!object) {
      return res.status(404).send({
        message: `No object found for id ${id}`
      });
    }
    res.send(object);
  }

  async create(req, res) {
    let object; 
    let data = req.body;
    try {
      object = await this.service.create(data);
    } catch(error) {
      return this.sendError(res,error);
    }

    res.status(201).send(object)
  }

  async update(req, res) {
    let object;
    let id = req.params.id;
    let data = req.body;
    try {
      object = await this.service.update(id,data)
    } catch(error) {
      return this.sendError(res,error);
    }
    if (!object) {
      return res.status(404).send({
        message: `No existing object found for id ${id}`
      });
    }
    res.status(200).send(object);
  }

  async destroy(req, res) {
    let object;
    let id = req.params.id;
    try {
      object = await this.service.destroy(id);
    } catch(error) {
      return this.sendError(res,error);
    }
    if (!object) {
      return res.status(404).send({
        message: `No existing object found for id ${id}`
      });
    }
    res.status(204).send();
  }
}

module.exports = Endpoint