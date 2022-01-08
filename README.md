# Overview

For this project I have used Metamask for the wallet. For authentication, the mnemonic is stored in an enviroment variable file (see environment setup below).

In order to connect to the Rinkeby test network, the Infura API was used. The Infura endpoint is also stored in the environment variable file.

The front end uses Next.js & React.

# Setting up Environment Variable File

Create a file called env.js in die ethereum directory.
Add the following values to ENV.JS:

```javascript
module.exports = {
INFURA_ENDPOINT: [Infura Endpoint URL],
MNEMONIC: [Your MetaMask Mnemonic],
};
```
