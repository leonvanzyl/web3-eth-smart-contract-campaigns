# Overview

For this project I have used Metamask for the wallet. For authentication, the mnemonic is stored in an enviroment variable file (see environment setup below).

In order to connect to the Rinkeby test network, the Infura API was used. The Infura endpoint is also stored in the environment variable file.

The front end uses Next.js & React.

# Setting up Environment Variable File

Create a file called .env.local in the root directory.
Add the following values to .env.local:

```javascript
INFURA_ENDPOINT=[Infura Endpoint URL],
MNEMONIC=[Your MetaMask Mnemonic],

```
