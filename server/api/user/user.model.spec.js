import { objectsEqual } from '../../utilities/generic'

import User from './user.model'

describe('User',() => {

	var user

	before(async () => {
		await User.remove({}).exec()
	})

	beforeEach(async () => {
		user = new User({password: 'test'})
		await user.save()
	})

	describe('.encryptPassword(password, callback)',() => {


		it('should encrypt the password correctly', () => {		
			let password = 'test'
			let hashedPassword = user.encryptPassword(password)
			expect(user.password).to.equal(hashedPassword)
		})

		it('should encrypt the password correctly with callback', (done) => {		
			let password = 'test'
			user.encryptPassword(password, (err, hashedPassword) => {
				expect(user.password).to.equal(hashedPassword)
				done()
			})
		})

	})

	describe('.authenticate(password, callback)',() => {
		it('should return true if password is correct', () => {		
			let password = 'test'
			expect(user.authenticate(password)).to.equal(true)
		})

		it('should return false if password is incorrect', () => {		
			let password = 'wrong'
			expect(user.authenticate(password)).to.equal(false)
		})

		it('should return true if password is correct with callback', (done) => {		
			let password = 'test'
			user.authenticate(password, (err, correct) => {
				expect(correct).to.equal(true)
				done()
			})
		})

		it('should return false if password is incorrect with callback', (done) => {		
			let password = 'wrong'
			user.authenticate(password, (err, correct) => {
				expect(correct).to.equal(false)
				done()
			})
		})
	})

})