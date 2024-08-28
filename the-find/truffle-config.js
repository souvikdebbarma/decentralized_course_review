require('dotenv').config();
const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;

module.exports = {
  contracts_build_directory: path.join(__dirname, "frontend/src/contracts"),

  networks: {
    development: {
      provider: () => new HDWalletProvider(
        mnemonic,
        'http://localhost:5173/' // or use a local URL for a local blockchain
      ),
      network_id: "*",
    },
    edu: {
      provider: () => new HDWalletProvider(
        mnemonic,
        `https://open-campus-codex-sepolia.drpc.org` // Replace with your network URL
      ),
      network_id: '*',
    }
  },

  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
