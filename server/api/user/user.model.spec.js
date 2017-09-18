import { objectsEqual } from '../../utilities/generic'

import User from '../user/user.model'

describe('User',() => {

	var user

	beforeEach(function(){
		user = new User()
	})

	describe('.pickup()',() => {

		it('should allow a device to be picked up',function*(){		
			let location = new Location()
			let device = new Device({
				schedule: [{
					action: 'pickup',
					location: location
				}]
			})
			device.location = location
			user.pickup(device,location)
			expect(device.location).to.be.undefined
			expect(device.user).to.deep.equal(user)
		})

		it('should not allow a device to be picked up',function*(){		
			let location = new Location()
			let device = new Device({
				schedule: [{
					action: 'pickup',
					location: location
				}]
			})
			let pickup = () => user.pickup(device,location)
			expect(pickup).to.throw(Error)
		})

	})

})