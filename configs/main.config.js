require('dotenv').config();

module.exports = {
    apps: [
        {
            name: 'Web3 Helpers Automation',
            script: './node_modules/.bin/ts-node',
            args: './src/main.ts',
            out_file: './logs/web3-helpers-main.error.log',
            error_file: './logs/web3-helpers-main.error.log',
            exp_backoff_restart_delay: 2000,
            env: {
                PRIVATE_KEY: process.env.PRIVATE_KEY,
                BSC_RPC_URL: process.env.BSC_RPC_URL,
                GOERLI_RPC_URL: process.env.GOERLI_RPC_URL,
            },
        },
    ],
};