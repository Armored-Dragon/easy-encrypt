const crypto = require(`../easy_encrypt`);
const fs = require(`fs`);

const global_password = "shared password";
const share_password = false;

run_encrypt();

async function run_encrypt() {
	const my_string = "Hello! This is my encrypted text!";
	let my_password = share_password ? global_password : "This is my original password DO NOT STEAL!";

	const encryption = new crypto.simple_encryption(my_password);
	const encrypted_text = await encryption.encrypt(my_string);
	console.log(` === Encryption ===\nData: ${my_string}\nEncrypted: ${JSON.stringify(encrypted_text)}\nIV: ${encrypted_text.iv}\nPassword: ${my_password}\n\n`);

	fs.writeFileSync(__dirname + `/test_output.json`, JSON.stringify(encrypted_text));
	run_decrypt();
}
async function run_decrypt() {
	let data = fs.readFileSync(__dirname + `/test_output.json`, { encoding: `utf-8` });
	data = JSON.parse(data);

	let my_password = share_password ? global_password : "Not the same as the encryption password";

	const encryption = new crypto.simple_encryption(my_password);
	const new_data = await encryption.decrypt(data);
	console.log(` === Decryption ===\n${new_data}\n\n`);
}

