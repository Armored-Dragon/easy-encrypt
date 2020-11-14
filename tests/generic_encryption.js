const crypto = require(`../easy_encrypt`);

run_test();
async function run_test() {
	const my_string = "Acos(^-^)/";
	const my_password = "this is my original password DO NOT STEAL!";
	const iv = crypto.create_iv();	// Optional: Create IV. This will be auto generated if not supplied.
	const encryption = new crypto.simple_encryption(my_password);

	const encrypted_text = await encryption.encrypt(my_string, iv);
	const decrypted_text = await encryption.decrypt(encrypted_text);

	console.log(`Data: ${my_string}\nEncrypted: ${JSON.stringify(encrypted_text)}\nDecrypted: ${decrypted_text}`);
	console.log(`\nIV: ${iv}\nPassword: ${my_password}`);
}