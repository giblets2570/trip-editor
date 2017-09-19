import { objectsEqual } from '../../utilities/generic'

import User from './user.model'
import UserServiceClass from './user.service'

const UserService = new UserServiceClass(User);

describe('UserService',() => {

	var user

	beforeEach(async () => {
		await User.remove({}).exec()
		user = new User({email: 'tom@tom.com',password:'tom'})
		await user.save()
	})

	describe('.create(user)',() => {

		it('should create a new user', async () => {		
			let newUser = {email: 'tom2@tom.com',password:'tom'}
			newUser = await UserService.create(newUser);
			expect(newUser).to.have.any.key('_id')
			let foundUser = await User.findOne({email: 'tom2@tom.com'}).exec()
			expect(objectsEqual(newUser,foundUser)).to.equal(true)
		})

		it('shouldn\'t create user if user with email already exists', async () => {		
			let newUser = {email: 'tom@tom.com',password:'tom'}
			try{
				newUser = await UserService.create(newUser);
			}catch(e){
				expect(e.message).to.equal('User with same email already exists')
			}
			let foundUsers = await User.find({email: 'tom@tom.com'}).exec()
			expect(foundUsers.length).to.equal(1)
		})

	})

	describe('.index(query)',() => {

		it('should return a list of users', async () => {		
			let users = await UserService.index();
			expect(users.length).to.equal(1)
		})

		it('should return an empty list if none match the query', async () => {		
			let users = await UserService.index({name: 'George'});
			expect(users.length).to.equal(0)
		})

	})

	describe('.update(id,object)',() => {

		it('should update an old entry', async () => {
			let name = 'Tom'
			await UserService.update(user._id, {name: name})
			let foundUser = await User.findOne({email: 'tom@tom.com'}).exec();
			expect(foundUser.name).to.equal(name)
		})

		it('shouldn\'t update if there already exists a user with the email', async () => {
			let newUser = {email: 'tom2@tom.com',password:'tom'}
			await UserService.create(newUser);
			let foundUser = await User.findOne({email: 'tom2@tom.com'}).exec();
			try{
				await UserService.update(foundUser._id, {email: 'tom@tom.com'})
			}catch(e){
				expect(e.message).to.equal('User with same email already exists')
			}
			foundUser = await User.findById(foundUser._id).exec();
			expect(foundUser.email).to.equal('tom2@tom.com')
		})

	})
})