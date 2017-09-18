import { getObjectIdString, dateDaySearch } from './generic';
import { generateId } from './mongo';

/**
  * @name server.Service
  * Service Class
  * Service class is used to handle requests from an endpoint
  */

class Service {

  /*
  * Construct handler object
  * @param {Object} query
  * @return {Array} objects
  */
  constructor(Model){
    this.Model = Model;
  }

  /*
  * Access a list of objects
  * @param {Object} query
  * @return {Array} objects
  */
  async index(query) {
    query = query || {};
    if(query.date) query.date = dateDaySearch(query.date);
    let objects = await this.Model.find(query).exec();
    return objects;
  }

  /*
  * Show a particular object using the id
  * @param {ObjectId} id
  * @return {Object} object
  */
  async show(id) {
    let object = await this.Model.findById(id).exec();
    return object;
  }

  /*
  * Create a object
  * @param {Object} object
  * @return {Object} created
  */
  async create(object) {
    object = new this.Model(object);
    await object.save();
    return object;
  }

  /*
  * Update the given object
  * @param {ObjectId} id
  * @param {Object} object
  * @return {Promise} object
  */
  async update(id,object) {
    let existing = await this.show(id);
    if (!existing) return;
    let updated = Object.assign(existing,object);
    await updated.save();
    return updated;
  }

  /*
  * Update the given object
  * @param {ObjectId} id
  * @return {Null} 
  */
  async destroy(id) {
    let existing = await this.Model.findById(id).exec();
    if (!existing) return;
    await existing.remove();
    return { _id: id };
  }

  /**
    * query a model
    */
  async query(Model,query={}){
    let objects = await Model.find(query).exec();
    objects.forEach((object) => objects[getObjectIdString(object)] = object);
    objects.get = (object) => objects[getObjectIdString(object)];
    return objects;
  }

}

export default Service