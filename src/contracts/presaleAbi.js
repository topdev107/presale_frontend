export default [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sale_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_token_rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_liquidity_rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_raise_min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_raise_max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_softcap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_hardcap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_liquidityPercent",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_whitelist",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_presale_start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_presale_end",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "PresaleCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "UserDepsitedSuccess",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "UserWithdrawSuccess",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "UserWithdrawTokensSuccess",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "buyers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "base",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sale",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "user",
          "type": "address[]"
        }
      ],
      "name": "deleteWhitelistInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProgress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSaleType",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTimestamp",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserStatus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sale_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_token_rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_liquidity_rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_raise_min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_raise_max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_softcap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_hardcap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_liquidityPercent",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_whitelist",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_presale_start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_presale_end",
          "type": "uint256"
        }
      ],
      "name": "init_private",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lock_delay",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "presaleStatus",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "presale_info",
      "outputs": [
        {
          "internalType": "address",
          "name": "sale_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "token_rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity_rate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "raise_min",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "raise_max",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "softcap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "hardcap",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidityPercent",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "presale_start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "presale_end",
          "type": "uint256"
        },
        {
          "internalType": "enum PresaleNew.PresaleType",
          "name": "presale_type",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "public_time",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "canceled",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "profit",
      "outputs": [
        {
          "internalType": "contract IMyContract",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "purchaseICOCoin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "remainingBurn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "router",
      "outputs": [
        {
          "internalType": "contract IPancakeSwapRouter",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setCancel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "delay",
          "type": "uint256"
        }
      ],
      "name": "setLockDelay",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "setProfitAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "setPublic",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setWhitelist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "user",
          "type": "address[]"
        }
      ],
      "name": "setWhitelistInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "status",
      "outputs": [
        {
          "internalType": "bool",
          "name": "force_failed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "raised_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sold_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "token_withdraw",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "base_withdraw",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "num_buyers",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end_time",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokeninfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "totalsupply",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "decimal",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "userDeposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "userWithdrawBaseTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "userWithdrawTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whitelistInfo",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]