const getNetwork = async () => {
    const provider = window.ethereum
    const chainId = await provider.request({ method: 'eth_chainId' });
    return (
        parseInt(chainId, 16)
    )
}

export const standardTokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0xf58dbf251182Fc9235C932108c300F2E4559e000'
    } else if(networkId == 338) {
        return '0x0A81Ddf4CFEE5D589c0A9Dc38d71f1ba0A9c6d09'
    } else {
        return ''
    }
}
export const liquidityTokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0x53D460C76a5a142591804B755EBCA7176f6d305A'
    } else if(networkId == 338) {
        return '0x3147b08C73c135d1aE9E183020C926aEA605Ff2F'
    } else {
        return ''
    }
}
export const babytokenFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0x523E270341e8CA8C6876c823889611c6ffCC4e46'
    } else if(networkId == 338) {
        return '0xbD49A38995413803CFF889292B6BCe5697633360'
    } else {
        return ''
    }
}
export const buybackbabyFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0xfc963E44e72687ED8fAC9E4C467115DCdeCa09ef'
    } else if(networkId == 338) {
        return '0xd321c5E89b77596Eb57668c40934440A119aB6c1'
    } else {
        return ''
    }
}

export const presaleFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0x26caa7aa2044e01be42d7764319d731aa3127214'
    } else if(networkId == 338) {
        return '0xC1CD46706c88B91E1004a5163A4f88e972ba4e87'
    } else {
        return ''
    }
}
export const presaleTestFactory = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0x26caa7aa2044e01be42d7764319d731aa3127214'
    } else if(networkId == 338) {
        return '0xC1CD46706c88B91E1004a5163A4f88e972ba4e87'
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
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0x838E9c7B85Fc43723AF8e5A0Dd6CBe3894C1Bc98'
    } else if(networkId == 338) {
        return '0x48Bca8A4B98c821E9D822Ddb674e0f78da606DA0'
    } else {
        return ''
    }
}

export const testRouter = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
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
        return ''
    } else if(networkId == 25) {
        return ''
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
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0x6eeb420e175f24820d5097bcf2a68363da544bcc'
    } else if(networkId == 338) {
        return '0xe1D5a302AC7dce2c8F3F1947D437f0E7d7E95549'
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

export const swapPairs = async () => {
    const networkId = await getNetwork()
    if(networkId == 56) {
        return ''
    } else if(networkId == 25) {
        return ''
    } else if(networkId == 97) {
        return '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    } else if(networkId == 338) {
        return '0x7Ac4564724c99e129F79dC000CA594B4631acA81'
    } else {
        return ''
    }
}