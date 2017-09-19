'use strict'

class Endpoint {

  constructor(router,service,Auth) {

    // Set object attributes
    this.router = router
    this.service = service
    this.Auth = Auth
    
    // Set endpoints
    this.endpoints()
  }

  endpoints() {
    this.router.post('/', this.create.bind(this))
    this.router.get('/', this.index.bind(this))
    this.router.get('/:id', this.show.bind(this))
    this.router.put('/:id', this.update.bind(this))
    this.router.delete('/:id', this.destroy.bind(this))
  }

  sendError(response,error){
    response.status(500).send({
      message: error.toString(),
      detail: error.stack
    })
  }

  async index(req, res) {
    let objects
    let query = req.query
    try {
      objects = await this.service.index(query)
      console.log(`Object: ${objects}`)
    } catch(error) {
      return this.sendError(res,error)
    }
    return res.send(objects)
  }

  async show(req, res) {
    let object
    let id = req.params.id
    let query = req.query
    try {
      object = await this.service.show(id,query)
      if(!object) throw new Error(`No object found for id ${id}`)
    } catch(error) {
      return this.sendError(res,error)
    }
    res.send(object)
  }

  async create(req, res) {
    let object 
    let data = req.body
    try {
      object = await this.service.create(data)
    } catch(error) {
      return this.sendError(res,error)
    }

    res.status(201).send(object)
  }

  async update(req, res) {
    let object
    let id = req.params.id
    let data = req.body
    try {
      object = await this.service.update(id,data)
      if(!object) throw new Error(`No existing object found for id ${id}`)
    } catch(error) {
      return this.sendError(res,error)
    }
    res.status(200).json(object)
  }

  async destroy(req, res) {
    let object
    let id = req.params.id
    try {
      object = await this.service.destroy(id)
      if(!object) throw new Error(`No existing object found for id ${id}`)
    } catch(error) {
      return this.sendError(res,error)
    }
    res.status(200).send(object)
  }
}
export default Endpoint