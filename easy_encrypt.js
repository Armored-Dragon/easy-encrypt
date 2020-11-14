const crypto = require(`crypto`);

class simple_encryption {
	/**
	 * Create an encryption class to encrypt/decrypt data.
	 * @param {string} password The key to use for the encryption. 
	 * @param {string} [algorithm] The algorithm to use for the encryption.
 */
	constructor(password, algorithm = 'aes-256-cbc') {
		this.key = crypto.createHash("sha256").update(password).digest();
		this.algorithm = algorithm;
	}
	/**
	 * Encrypt data.
	 * @param {any} unencrypted_data - Input data to encrypt. This data will automatically be converted into a string.
	 * @param {string} [iv] - The IV string.
	 * @returns {Object} - Encrypted data
	 */
	async encrypt(unencrypted_data, iv) {
		const initialization_vector = iv || create_iv();

		unencrypted_data = JSON.stringify(unencrypted_data);	// Turn the data into a string

		let cipher = crypto.createCipheriv(this.algorithm, this.key, initialization_vector);
		let encrypted_data = cipher.update(unencrypted_data, 'utf-8', 'hex');
		encrypted_data += cipher.final('hex');
		return { encrypted: true, iv: initialization_vector, contents: encrypted_data };
	}
	/**
	 * Decrypt data.
	 * @param {string} encrypted_data - Input encrypted data to decrypt.
	 * @returns {string} - Unencrypted data
	 */
	async decrypt(encrypted_data) {
		let cipher = crypto.createDecipheriv(this.algorithm, this.key, encrypted_data.iv);
		let decrypted_data = cipher.update(encrypted_data.contents, 'hex', 'utf-8');
		decrypted_data += cipher.final('utf-8');
		return decrypted_data;
	}
}

function create_iv() {
	return crypto.randomBytes(8).toString('hex');
};
module.exports = { create_iv, simple_encryption };