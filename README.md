# easy-encrypt
Node.JS module to easily encrypt/decrypt data without the extra fluff.

## Usage
Including easy_encrypt:
```javascript
const easy_crypt = require(`easy_encryption`);
const encryption = new easy_crypt.simple_encryption(password[, algorithm])
```
- `password`: A string to use as a password when encrypting data
- `algorithm`: Which encryption algorithm to use (Optional. defaults to "aes-256-cbc")


Creating an IV (Initialization vector) is essential for security.
You can create a valid IV using the following function:
```javascript
const iv = easy_encryption.create_iv();
```

An IV is not the same as a password. An IV can be shared just as freely as the encrypted data.
The recommended way to save the IV is with the encrypted data.

## Examples
There are additional examples in the folder under `/tests`.

```javascript
const data_to_encrypt = "Eevee is the fluffiest!";// This is our data to save
const my_password = "Pizza2142";// This is the password that will be used to encrypt the data

const encryption = new crypto.encryption(my_password);
const encrypted_text = await encryption.encrypt(my_string); // Contains the encrypted object. Example: "{encrypted: true, iv: 4263883364fdea2b, contents: 51833b31a66a9fc2ce82c2ab29ec3fb82d60fa708df0b6839016825a190d3cd4}"
const decrypted_text = await encryption.decrypt(encrypted_text); // Contains the decrypted data that was previously encrypted. Example: "Eevee is the fluffiest!"
```