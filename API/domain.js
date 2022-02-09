const namehash = require('eth-ens-namehash')
const axios = require('axios');
const { Moralis } = require('../Service/moralis_init');

async function getDomainPicture(domain) {
    return new Promise((resolve, reject) => {

        const hash = namehash.hash(domain)
        let url = `https://unstoppabledomains.com/api/v1/${hash}`;
        axios.get(url, { timeout: 60000 }).then(response => {
            let data = response.data;
            if (data) {
                let picture = '';
                if (data.social && data.social.picture) {
                    const urlarr = data.social.picture.split('/');
                    const contract = urlarr[1].split(':')[1];
                    const nftID = urlarr[2];
                    const options = { address: contract, token_id: nftID, chain: "0x1" }
                    Moralis.Web3API.token.getTokenIdMetadata(options)
                        .then(res => {
                            if (res.metadata) {
                                resolve(JSON.parse(res.metadata).image != null ? ipfsFormat(JSON.parse(res.metadata).image) : '')

                            } else {
                                resolve(picture);
                            }

                        }).catch(err => {
                            console.log(err)
                            reject(err)
                        })

                } else {
                    resolve(picture);
                }
            } else {
                reject(response.data.message);
            }
        }).catch(error => {
            reject(error);
            console.log(error);
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

module.exports = {
    getDomainPicture
}