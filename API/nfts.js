const { Moralis } = require('../Service/moralis_init');

async function getNfts(address) {
    return new Promise((resolve, reject) => {
        const options = {
            chain: '0x1',
            address: address,
        }
        Moralis.Web3API.account.getNFTs(options)
            .then(res => {
                let nfts = [];
                if (res.result.length > 0) {
                    res.result.forEach(el => {
                        if (el.metadata) {
                            let eachNft = {
                                token_id: el.token_id,
                                title: JSON.parse(el.metadata).name != null ? JSON.parse(el.metadata).name : '',
                                description: JSON.parse(el.metadata).description != null ? JSON.parse(el.metadata).description : '',
                                image: JSON.parse(el.metadata).image != null ? ipfsFormat(JSON.parse(el.metadata).image) : '',
                                token_address: el.token_address,
                                date: '',
                            }
                            nfts.push(eachNft)
                        }

                    });
                    const options = { chain: "0x1", address: address, limit: 500 };
                    let erc721 = []
                    Moralis.Web3API.account.getNFTTransfers(options).then(res => {
                        if (res.result.length > 0) {
                            res.result.forEach(el => {
                                if (el.to_address.toLowerCase() == address.toLowerCase()) {
                                    erc721.push({
                                        tx_hash: el.transaction_hash,
                                        contract: el.token_address,
                                        sender: el.from_address,
                                        receiver: el.to_address,
                                        token_id: el.token_id,
                                        time: el.block_timestamp,
                                        tx_type: el.from_address.toLowerCase() == address.toLowerCase() ? "out" : "in",
                                        type: "erc721",
                                    })
                                }

                            });

                            for (let i = 0; i < nfts.length; i++) {
                                for (let j = 0; j < erc721.length; j++) {
                                    if (nfts[i].token_id == erc721[j].token_id) {
                                        nfts[i].date = erc721[j].time
                                    }
                                }
                            }
                            nfts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

                            resolve(nfts)
                        } else {
                            resolve(nfts)
                        }

                    }).catch(err => {
                        console.log(err)
                        reject(err)
                    })
                } else {
                    resolve([])
                }

            }).catch(err => {
                console.log(err);
                reject(err);
            });

    })
}

function ipfsFormat(link) {
    if (link.substring(0, 4) == "ipfs") {
        newLink = link.replace("ipfs:/", "https://ipfs.io")
        return newLink
    } else {
        return link
    }
}

async function getCollections(address) {
    return new Promise((resolve, reject) => {
        const options = {
            chain: '0x1',
            address: address,
        }
        Moralis.Web3API.account.getNFTs(options)
            .then(res => {
                let nfts = [];
                if (res.result.length > 0) {
                    res.result.forEach(el => {
                        if (el.name != "") {
                            let eachNft = {
                                collection_name: el.name,
                                token_address: el.token_address,
                            }
                            nfts.push(eachNft)
                        }

                    });
                    resolve(nfts)
                } else {
                    resolve([])
                }

            }).catch(err => {
                console.log(err);
                reject(err);
            });

    })
}

module.exports = {
    getNfts, getCollections
}