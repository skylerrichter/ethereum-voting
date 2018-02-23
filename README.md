# Ethereum Voting

## Local development

### Install Ganache

Ganache is a local Ethereum blockchain implemented in JavaScript. You can download it [here](http://truffleframework.com/ganache) or the command line version [here](https://github.com/trufflesuite/ganache-cli).

### Install MetaMask

To connect to the Ethereum blockchain from your browser you will need to install the MetaMask extension which can be downloaded [here](https://metamask.io)

By default MetaMask will connect to the main Ethereum network. To connect to your local blockchain click on the MetaMask icon and then open the network drop-down in the top left corner and click "Custom RPC" and enter the address to your local Ethereum blockchain found Ganache GUI (by default this is HTTP://127.0.0.1:7545).

NOTE: MetaMask caches response from the blockchain, if you restart the Ganache server you will either need to restart your browser or open the MetaMask settings in the top right corner, scroll down to the bottom and click "Reset Account".

### Install the Truffle CLI

```
$ npm install -g truffle
```

### Clone this repo

### Install dependencies

```
$ npm install
```

### Run migrations

```
 $ truffle migrate
```

### Start Webpack

```
 $ npm run start
```