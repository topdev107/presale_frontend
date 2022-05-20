const getContractsAddress = (networkId) => {
    switch (networkId) {
        case 56:
            return '0x8bB595C140c60D833CcB6c814F8A19B5A2541615';
        case 97:
            return '0xDdc7Cd538573104D5D571d012B040Bc94Ca8cB3b';
        default:
            return '0xDdc7Cd538573104D5D571d012B040Bc94Ca8cB3b';
    }
}

export default getContractsAddress
