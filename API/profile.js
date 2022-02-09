const { gql, GraphQLClient } = require('graphql-request')

async function profileDetails(yourAddr, theirAddr) {
    return new Promise((resolve, reject) => {
        const client = new GraphQLClient("https://api.cybertino.io/connect/", { headers: {} })
        let query;
        if (theirAddr == undefined) {
            query = gql`query {
                            identity(address:"${yourAddr}"){
                                address
                                domain
                                followerCount
                                followingCount
                                avatar
                                joinTime
                                social{
                                    twitter
                                    }
                            }
                            }`
        } else {
            query = gql`query {
                            followStatus(fromAddr:"${yourAddr}" toAddr:"${theirAddr}"){
                                isFollowing
                                isFollowed
                            }
                            identity(address:"${theirAddr}"){
                                address
                                domain
                                followerCount
                                followingCount
                                avatar
                                joinTime
                                social{
                                    twitter
                                    }
                            }
                            }`
        }

        client.request(query).then((data) => {
            if (data.followStatus != null || data.identity != null) {
                let details;
                if (theirAddr == undefined) {
                    details = {
                        address: data.identity.address,
                        domain: data.identity.domain,
                        followers_count: data.identity.followerCount,
                        following_count: data.identity.followingCount,
                        image_url: data.identity.avatar,
                        join_date: data.identity.joinTime.substring(0, 10),
                        social: data.identity.social.twitter,
                    }
                } else {
                    details = {
                        address: data.identity.address,
                        domain: data.identity.domain,
                        is_following: data.followStatus.isFollowing,
                        is_followed: data.followStatus.isFollowed,
                        followers_count: data.identity.followerCount,
                        following_count: data.identity.followingCount,
                        image_url: data.identity.avatar,
                        join_date: data.identity.joinTime.substring(0, 10),
                        social: data.identity.social.twitter,
                    }

                }
                resolve(details)
            } else {
                reject("No Data")
            }
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })

}

async function common(yourAddr, theirAddr) {
    const { getPoaps } = require('./poaps');
    const { getCollections } = require('./nfts');

    // POAPS
    const promiseYourPoap = new Promise((resolve, reject) => {
        getPoaps(yourAddr).then(data => {
            let poaps = [];
            if (data.length != 0) {
                data.forEach(el => {
                    poaps.push({
                        id: el.event_id,
                        image_url: el.image_url,
                        name: el.name,
                    })
                });
                resolve(poaps)
            } else {
                resolve([])
            }

        }).catch(error => {
            console.log(error)
            resolve([])
        });
    });
    const promiseTheirPoap = new Promise((resolve, reject) => {
        getPoaps(theirAddr).then(data => {
            let poaps = [];
            if (data.length != 0) {
                data.forEach(el => {
                    poaps.push({
                        id: el.event_id,
                        image_url: el.image_url,
                        name: el.name,
                    })
                });
                resolve(poaps)
            } else {
                resolve([])
            }

        }).catch(error => {
            console.log(error)
            resolve([])
        });
    });

    // NFTS
    const promiseYourNFT = new Promise((resolve, reject) => {
        getCollections(yourAddr).then(data => {
            let nfts = [];
            if (data.length != 0) {
                data.forEach(el => {
                    nfts.push({
                        address: el.token_address,
                        name: el.collection_name,
                    })
                });
                resolve(nfts)
            } else {
                resolve([])
            }

        }).catch(error => {
            console.log(error)
            resolve([])
        });
    });
    const promiseTheirNFT = new Promise((resolve, reject) => {
        getCollections(theirAddr).then(data => {
            let nfts = [];
            if (data.length != 0) {
                data.forEach(el => {
                    nfts.push({
                        address: el.token_address,
                        name: el.collection_name,
                    })
                });
                resolve(nfts)
            } else {
                resolve([])
            }

        }).catch(error => {
            console.log(error)
            resolve([])
        });
    });

    let vals = await Promise.all([promiseYourPoap,
        promiseTheirPoap,
        promiseYourNFT,
        promiseTheirNFT])
        .then((values) => {
            let commonPoaps = [];
            let commonNftCollections = [];
            let commonTransactions = [];

            // filter POAPs
            if (values[0].length != 0 && values[1].length != 0) {
                commonPoaps = values[0].filter(o1 => values[1].some(o2 => o1.id === o2.id));
            }
            // filter collections
            if (values[2].length != 0 && values[3].length != 0) {
                let filterCollections = values[2].filter(o1 => values[3].some(o2 => o1.address === o2.address));
                commonNftCollections = [...new Map(filterCollections.map(v => [v.address, v])).values()]
            }

            return {
                poaps: commonPoaps,
                nft_collections: commonNftCollections,
                transactions: commonTransactions
            };
        }).catch(error => {
            console.log(error)
        });
    return vals;
}

module.exports = {
    profileDetails,
    common
}
