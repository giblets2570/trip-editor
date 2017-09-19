import { objectsEqual } from '../utilities/generic'
import config from '../config'
import User from '../api/user/user.model'
import AuthService from './auth.service'

const Auth = AuthService(config, User)

describe('Auth',() => {

	var user

	beforeEach(async () => {
		user = new User({password: 'test'})
		await user.save()
	})

	describe('.meetsRequirements()',() => {

		it('should return true', () => {		
			expect(Auth.meetsRequirements(user,'user')).to.be.equal(true)
		})

		it('should return false', () => {		
			expect(Auth.meetsRequirements(user,'manager')).to.be.equal(false)
		})

	})

})