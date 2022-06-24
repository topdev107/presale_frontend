import Web3 from 'web3'
import abi from '../../contracts/abi'
import presaleFactoryAbi from '../../contracts/presaleFactoryAbi'
import profitAbi from '../../contracts/profitAbi'

const getNetwork = async () => {
    const provider = window.ethereum
    if(!provider){ console.log("please install metamask") }
    const chainId = await provider.request({ method: 'eth_chainId' });
    return (
        parseInt(chainId, 16)
    )
}

export const standardTokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xC9E3EB1E42c8CE324A831E87E3193aFd192BE68A'
    } else if(networkId == 25) {
        return '0x90186EDcD64188fa28064895d328e302b09D20e7'
    } else if(networkId == 97) {
        return '0x0717AD82b5D4113789E6015ea1edD5D9911AcddF'
    } else if(networkId == 338) {
        return '0x44d41D02B25EE71c0888e449238a3d57550fAb69'
    } else {
        return ''
    }
}
export const liquidityTokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x6B4F15eC2113D7C572cab1D7922d4e371bcF002F'
    } else if(networkId == 25) {
        return '0xa60cb5CF26B6457D135C3564a4104A9405663a14'
    } else if(networkId == 97) {
        return '0xD462420Df50bE5dC961A415919bE35497Bed3CEc'
    } else if(networkId == 338) {
        return '0x3CE96579043dA1ECC23a98a807Fe007117E045a3'
    } else {
        return ''
    }
}
export const babytokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xeBd98C5A23bfc7039E7E15220cD788889aaec88e'
    } else if(networkId == 25) {
        return '0x329039d8d33412f53212A9Ff5A4c71665cF75778'
    } else if(networkId == 97) {
        return '0xE9bdF8dA1d6204ce567e160c45Ff09AECd621f6E'
    } else if(networkId == 338) {
        return '0x7E1EC97439D92A171A1Be7268f06aD691A32051b'
    } else {
        return ''
    }
}
export const buybackbabyFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xCB410e1d02120d6A6705bea0AEC3Dd184A79937C'
    } else if(networkId == 25) {
        return '0x15B214e5ebb0Bd4a2c5dCa188c963785403fd1bB'
    } else if(networkId == 97) {
        return '0x115Da8139575C48392468C987f6A309e3E528266'
    } else if(networkId == 338) {
        return '0x5182140102FB2d33dBb57287A5Da29EB0a83e261'
    } else {
        return ''
    }
}

export const presaleFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x0201d47E88b89A333Ce5edCf7A9481b897835E50'
    } else if(networkId == 25) {
        return '0x2DdA17bEbBCb8eF59Df40f2761aB310483A4E223'
    } else if(networkId == 97) {
        return '0x4b8Ae3289797A61A6f7D927552F1f2d70A55C43E'
    } else if(networkId == 338) {
        return '0xD81ed6F1E0D2FA57F24D38584d6Abe58c21feDac'
    } else {
        return ''
    }
}
export const presaleTestFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x0201d47E88b89A333Ce5edCf7A9481b897835E50'
    } else if(networkId == 25) {
        return '0xa06720b106a83ef0F4DC375fDE5B61B220B4fffe'
    } else if(networkId == 97) {
        return '0x4b8Ae3289797A61A6f7D927552F1f2d70A55C43E'
    } else if(networkId == 338) {
        return '0xD81ed6F1E0D2FA57F24D38584d6Abe58c21feDac'
    } else {
        return ''
    }
}
// export const presale = async () => {
//     const networkId = await getNetwork()
//     if(networkId == 56) {
//         return ''
//     } else if(networkId == 25) {
//         return ''
//     } else if(networkId == 97) {
//         return '0x495aA5a286890040F9FF1999eB393a8f2f6d0789'
//     } else if(networkId == 338) {
//         return ''
//     } else {
//         return ''
//     }
// }

export const fairlaunchFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xc56682f9f2CA5d87FFf3a9291E2667e44d379914'
    } else if(networkId == 25) {
        return '0x941eCa123BDe757c56B17D46772E57EbfD919422'
    } else if(networkId == 97) {
        return '0x48bE0dDb98a433896e5D90385ecf516CFAb41F50'
    } else if(networkId == 338) {
        return '0x8eB1406b2D486DD3B54a8e6Aa5091d5d0138545A'
    } else {
        return ''
    }
}

export const testRouter = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    } else if(networkId == 25) {
        return '0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918'
    } else if(networkId == 97) {
        return '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3' // TestPancakeswap Router
    } else if(networkId == 338) {
        return '0x989dBb40f0B8a431e9D79dfd28fdC3df3717D9c0' //0x085d8C985C73Fbb425398209d864Addd062fF3c1
    } else {
        return ''
    }
}
export const testFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xca143ce32fe78f1f7019d7d551a6402fc5350c73'
    } else if(networkId == 25) {
        return '0x73A48f8f521EB31c55c0e1274dB0898dE599Cb11'
    } else if(networkId == 97) {
        return '0xb7926c0430afb07aa7defde6da862ae0bde767bc' // TestPancakeswap Factory
    } else if(networkId == 338) {
        return '0x004615D9cCab58bDE10877BE03F053c94599F3ce'
    } else {
        return ''
    }
}

export const dividends = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x91921B69FBB9348b55463Bf4e1A6f33407d83913'
    } else if(networkId == 25) {
        return '0x6c06028575455aebd576f2d983f1ab122f8a0883'
    } else if(networkId == 97) {
        return '0x6eeb420e175f24820d5097bcf2a68363da544bcc'
    } else if(networkId == 338) {
        return '0x4Ac8BBae9Cf0A6Dc25A19dc98d6D1923320FC993'
    } else {
        return ''
    }
}

// export const standardToken = async () => {
//     const networkId = await getNetwork()
//     if(networkId == 56) {
//         return ''
//     } else if(networkId == 25) {
//         return ''
//     } else if(networkId == 97) {
//         return '0x5c752e0588fAC559557Ac9fc32663BD923E52024'
//     } else if(networkId == 338) {
//         return ''
//     } else {
//         return ''
//     }
// }

// export const pancakeswapRouter = async () => {
//     const networkId = await getNetwork()
//     if(networkId == 56) {
//         return ''
//     } else if(networkId == 25) {
//         return ''
//     } else if(networkId == 97) {
//         return '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
//     } else if(networkId == 338) {
//         return ''
//     } else {
//         return ''
//     }
// }

export const swapPairs = async () => {                  //WBNB contract address
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    } else if(networkId == 25) {
        return '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
    } else if(networkId == 97) {
        return '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    } else if(networkId == 338) {
        return '0x7Ac4564724c99e129F79dC000CA594B4631acA81'
    } else {
        return ''
    }
}

const profit = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x97aA3d65a783EE61B8619086539eb0F9138Fe65c'
    } else if(networkId == 25) {
        return '0x18b65245892A1b50a7b3F5d8B2D6E5CC9Df7bE1F'
    } else if(networkId == 97) {
        return '0x5B78D62AB8340160C5e245F1d5e2635ca2b78001'
    } else if(networkId == 338) {
        return '0x60964e6A71e507247CA247779572be82cA671AD0'
    } else {
        return ''
    }
}

export const getTokenFees = async (address) => {
    if(!address) return 0
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(abi, address)
    const fee = await contract.methods.getFlatFee().call()
    const a = web3.utils.fromWei(fee, 'ether')
    return a
}

export const getFinalizeFees = async () => {
    const web3 = new Web3(window.ethereum)
    const address = await profit()
    const contract = new web3.eth.Contract(profitAbi, address)
    const fee = await contract.methods.getPercent().call()
    return fee
}

export const getPresaleFees = async (address) => {
    if(!address) return 0
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(presaleFactoryAbi, address)
    const fee = await contract.methods.getFlatFee().call()
    const a = web3.utils.fromWei(fee, 'ether')
    return a
}