import Web3 from 'web3'
import abi from './abi'
import * as Web3Utils from 'web3-utils';
import getContractsAddress from './contractsAddress';

const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
}

let contractInstance

if (provider()) {
    const web3 = new Web3(provider())
    contractInstance = web3.eth.net.getId().then(id => {
        const address = getContractsAddress(id)
        const contractInstance = new web3.eth.Contract(abi, address)
        return {
            // -----------------------------------------
            // GETTERS
            // -----------------------------------------
            async getBalance(address) {
                const balance = await contractInstance.methods.balanceOf(address).call()
                return balance / 10 ** 9;
            },
            async calculateBNBReward(address) {
                const balance = await contractInstance.methods.calculateBNBReward(address).call()
                return balance / 10 ** 18;
            },
            async autoLiquidityAddress() {
                const address = await contractInstance.methods.autoLiquidityWallet().call()
                return address;
            },

            async setClaimRewardAsTokenAndPercentage(address, percentage, sender) {
                try {
                    return contractInstance.methods.setClaimRewardAsTokenAndPercentage(address, percentage).send({
                        'from': sender
                    })
                } catch (e) {
                    console.log(e);
                }
            },
            async bnbRewardClaimed(address) {
                const balance = await contractInstance.methods.bnbRewardClaimed(address).call()
                return balance / 10 ** 18;
            },
            async totalBNBClaimed() {
                const balance = await contractInstance.methods.totalBNBClaimed().call()
                return balance / 10 ** 18;
            },
            async calculateClaimRewards(address) {
                const balance = await contractInstance.methods.calculateClaimRewards(address).call()
                return balance[1] / 10 ** 18;
            },
            async calculateClaimBNBRewards(address) {
                const balance = await contractInstance.methods.calculateClaimRewards(address).call()
                return balance[0] / 10 ** 18;
            }
        }
    })
    
}

export default contractInstance
