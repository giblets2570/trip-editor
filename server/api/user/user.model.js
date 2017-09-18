import { getObjectId, objectsEqual, validatePresenceOf } from '../../utilities/generic';

import crypto from 'crypto';

import Model from '../../utilities/model';
import Mongo from '../../utilities/mongo';

class UserModel extends Model {
	/**
	* Authenticate - check if the passwords are the same
	*
	* @param {String} password
	* @param {Function} callback
	* @return {Boolean}
	*/
	authenticate(password, callback) {
		console.log(password);
		if (!callback) {
			return this.password === this.encryptPassword(password);
		}
		this.encryptPassword(password, (err, pwdGen) => {
			if (err) {
				return callback(err);
			}

			if (this.password === pwdGen) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		});
	}

	/**
	* Make salt
	*
	* @param {Number} byteSize Optional salt byte size, default to 16
	* @param {Function} callback
	* @return {String}
	*/
	makeSalt(byteSize, callback) {
		var defaultByteSize = 16;

		if (typeof arguments[0] === 'function') {
			callback = arguments[0];
			byteSize = defaultByteSize;
		} else if (typeof arguments[1] === 'function') {
			callback = arguments[1];
		}

		if (!byteSize) {
			byteSize = defaultByteSize;
		}

		if (!callback) {
			return crypto.randomBytes(byteSize).toString('base64');
		}

		return crypto.randomBytes(byteSize, (err, salt) => {
			if (err) {
				callback(err);
			} else {
				callback(null, salt.toString('base64'));
			}
		});
	}

	/**
	* Encrypt password
	*
	* @param {String} password
	* @param {Function} callback
	* @return {String}
	*/
	encryptPassword(password, callback) {
		if (!password || !this.salt) {
			return null;
		}

		const defaultIterations = 10000;
		const defaultKeyLength = 64;
		const salt = new Buffer(this.salt, 'base64');
		const digest = 'sha1';

		if (!callback) {
			return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest)
			.toString('base64');
		}

		return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, digest, (err, key) => {
			if (err) {
				callback(err);
			} else {
				callback(null, key.toString('base64'));
			}
		});
	}

	/**
	* Get user profile
	*
	* @param {}
	* @return {Object}
	*/
	get profile() {
		return { 
			email: this.email, 
			role: this.role, 
			name: this.name, 
			_id: this._id 
		}
	}
}

UserModel.schema = {
	email: String,
	password: String,
	salt: String,
	role: {
		type: String, 
		enum: [
			'user',
			'manager',
			'admin'
		],
		default: 'user'
	}
}

UserModel.hooks = {
	pre: {
		/**
		* Function that fires just before
		* saving a user
		*
		* @param {next}
		* @return {}
		*/
		save: function(next) {
			// Handle new/update passwords
			if (!this.isModified('password')) {
				return next();
			}
			if (!validatePresenceOf(this.password)) {
				return next(new Error('Invalid password'));
			}

			// Make salt with a callback
			this.makeSalt((saltErr, salt) => {
				if (saltErr) {
					return next(saltErr);
				}
				this.salt = salt;
				this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
					if (encryptErr) {
						return next(encryptErr);
					}
					this.password = hashedPassword;
					next();
				});
			});
		}
	}
}


export default Mongo('User',UserModel);