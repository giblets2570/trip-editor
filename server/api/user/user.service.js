import Service from '../../utilities/service'
import rq from 'request-promise'

class UserService extends Service {
  /*
  * Create a object if _id doesn't exist, if not updates old
  * @param {Object} object
  * @return {Object} created/updated
  */
  async create(user) {
    let oldUser = await this.Model.findOne({email: user.email}).exec()
    if(oldUser) throw new Error("User with same email already exists")
    user = await super.create(user)
    return user.profile
  }

  /*
  * Access a list of objects
  * @param {Object} query
  * @return {Array} objects
  */
  async index(query) {
    query = query || {}
    let users = await this.Model.find(query).exec()
    users = users.map((user) => user.profile)
    return users
  }

  async update(id,object) {
    let existing = await this.show(id)
    if (!existing) return
    let updated = Object.assign(existing,object)
    if (updated.isModified('email')) {
      let oldUser = await this.Model.findOne({email: updated.email}).exec()
      if(oldUser) throw new Error("User with same email already exists")
    }
    await updated.save()
    return updated.profile
  }
}

export default UserService