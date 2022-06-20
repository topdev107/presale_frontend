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
        return '0x258524973B09D4FB5Fd79555eF657E8D9fc96Ee6'
    } else if(networkId == 25) {
        return '0xEc774B639DfE50EA25686a121c750B2Fb1EC8B22'
    } else if(networkId == 97) {
        return '0xf58dbf251182Fc9235C932108c300F2E4559e000'
    } else if(networkId == 338) {
        return '0x44d41D02B25EE71c0888e449238a3d57550fAb69'
    } else {
        return ''
    }
}
export const liquidityTokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x80A49151B00a746B68a272A738E654A7EA5fdAed'
    } else if(networkId == 25) {
        return '0x48bca8a4b98c821e9d822ddb674e0f78da606da0'
    } else if(networkId == 97) {
        return '0x53D460C76a5a142591804B755EBCA7176f6d305A'
    } else if(networkId == 338) {
        return '0x3CE96579043dA1ECC23a98a807Fe007117E045a3'
    } else {
        return ''
    }
}
export const babytokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0x6bc870267Fa4F00023d09AFeb6984579CaCDA6cc'
    } else if(networkId == 25) {
        return '0xC1CD46706c88B91E1004a5163A4f88e972ba4e87'
    } else if(networkId == 97) {
        return '0xE56Fb796eC546790d7a90Df9d762bC8EF33F7c1b'
    } else if(networkId == 338) {
        return '0x7E1EC97439D92A171A1Be7268f06aD691A32051b'
    } else {
        return ''
    }
}
export const buybackbabyFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xeeEC2bD24bC663585290B821970b07734cbE674A'
    } else if(networkId == 25) {
        return '0x0A81Ddf4CFEE5D589c0A9Dc38d71f1ba0A9c6d09'
    } else if(networkId == 97) {
        return '0xfc963E44e72687ED8fAC9E4C467115DCdeCa09ef'
    } else if(networkId == 338) {
        return '0x5182140102FB2d33dBb57287A5Da29EB0a83e261'
    } else {
        return ''
    }
}

export const presaleFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xb69F3c157d48A9A736F67848a2313796b576F2eB'
    } else if(networkId == 25) {
        return '0x2DdA17bEbBCb8eF59Df40f2761aB310483A4E223'
    } else if(networkId == 97) {
        return '0x26caa7aa2044e01be42d7764319d731aa3127214'
    } else if(networkId == 338) {
        return '0xD81ed6F1E0D2FA57F24D38584d6Abe58c21feDac'
    } else {
        return ''
    }
}
export const presaleTestFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return '0xb69F3c157d48A9A736F67848a2313796b576F2eB'
    } else if(networkId == 25) {
        return '0x2DdA17bEbBCb8eF59Df40f2761aB310483A4E223'
    } else if(networkId == 97) {
        return '0x26caa7aa2044e01be42d7764319d731aa3127214'
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
        return '0xFeAEB69DbAdB8c753b6d517537CBBe2a731D9907'
    } else if(networkId == 25) {
        return '0x14B728B79519B5E15329615A0987EF79ad25d651'
    } else if(networkId == 97) {
        return '0x838E9c7B85Fc43723AF8e5A0Dd6CBe3894C1Bc98'
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
        return '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    } else if(networkId == 25) {
        return '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
    } else if(networkId == 97) {
        return '0xae13d989dac2f0debff460ac112a837c89baa7cd'
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