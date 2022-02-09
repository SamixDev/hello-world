const { gql, GraphQLClient } = require('graphql-request')
//const { HttpRequest } = require("../Service/dataFetch");
const { Moralis } = require('../Service/moralis_init');

async function getSocial(address, type = 'followers', pageSize = 10, pageNumber = 0) {
    return new Promise((resolve, reject) => {

        const client = new GraphQLClient("https://api.cybertino.io/connect/", { headers: {} })

        let after = (pageSize * pageNumber) - 1
        let query;
        switch (type) {
            case 'followers':
                query = gql`query {
                        identity(address: "${address}") {
                            address
                            follower_count: followerCount
                            followers(first: ${pageSize} after:"${after}") {
                            list {
                                address
                                domain
                                avatar
                            }
                            }
                        }
                        }`
                client.request(query).then((data) => {
                    if (data.identity.followers.list.length != 0) {
                        let followerCount = data.identity.follower_count;
                        let followers = data.identity.followers.list;
                        getPortfolioBal(followers, 3).then(data => {
                            resolve({
                                follower_count: followerCount,
                                followers: data,
                            })
                        })
                    } else {
                        resolve({ follower_count: 0, followers: [] })
                    }

                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
                break;
            case 'followings':
                query = gql`query {
                        identity(address: "${address}") {
                            address
                            following_count: followingCount
                            followings(first: ${pageSize} after:"${after}") {
                            list {
                                address
                                domain
                                avatar
                            }
                            }
                        }
                        }`
                client.request(query).then((data) => {
                    if (data.identity.followings.list.length != 0) {
                        let followingCount = data.identity.following_count;
                        let followings = data.identity.followings.list;
                        getPortfolioBal(followings, 3).then(data => {
                            resolve({
                                following_count: followingCount,
                                followings: data,
                            })
                        })
                    } else {
                        resolve({ following_count: 0, followings: [] })
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
                break;
            case 'recommendations':
                query = gql`query {
                                recommendations(address: "${address}" first: 5) {
                                    data {
                                    list {
                                        domain
                                        address
                                        recommendation_reason: recommendationReason
                                        follower_count: followerCount
                                        avatar
                                    }
                                    }
                                }
                                }`
                client.request(query).then((data) => {
                    if (data.recommendations.data != null) {
                        let recommendations = data.recommendations.data.list;
                        let recommendationCount = recommendations.length
                        recommendations.forEach(el => {
                            el.is_following = false
                        });
                        getPortfolioBal(recommendations, 3).then(data => {
                            resolve({
                                recommendation_count: recommendationCount,
                                recommendations: data,
                            })
                        })
                    } else {
                        resolve({ recommendation_count: 0, recommendations: [] })
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
                break;
            case 'featured':
                query = gql`query {
                            featured(fromAddr:"${address}"){
                            address
                            domain
                            recommendation_reason: recommendationReason
                            follower_count: followerCount
                            avatar
                            is_following: isFollowing
                            }
                        }`
                client.request(query).then((data) => {
                    if (data.featured.length != 0) {
                        let featured = data.featured.filter(el => el.is_following == false);
                        featured = featured.slice(0, 10)
                        getPortfolioBal(featured, 2).then(data => {
                            resolve({
                                featured: data,
                            })
                        })
                    } else {
                        resolve({ featured: [] })
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
            default:
                null
        }

    })
}

async function getPortfolioBal(addressList, decimals) {
    return new Promise((resolve, reject) => {
        let list = [];
        addressList.forEach(el => {
            const options = {
                chain: '0x1',
                address: el.address,
            }

            Moralis.Web3API.account.getNativeBalance(options)
                .then(res => {
                    list.push({ ...el, balance: Number((res.balance / 10 ** 18).toFixed(decimals)) })
                    list.length == addressList.length ? resolve(list) : null

                }).catch(err => {
                    console.log(err)
                    reject(err)
                })

        });

    })

}

async function search(address) {
    return new Promise((resolve, reject) => {
        const client = new GraphQLClient("https://api.cybertino.io/connect/", { headers: {} })
        const query = gql`query {
                        identity(address: "${address}") {
                            address
                            domain
                        }
                        }`
        client.request(query).then((data) => {
            if (data && data.identity && data.identity.address) {
                resolve(data.identity)
            } else {
                reject("Error: no address found")
            }
        }).catch((err) => {
            reject(err)
        })
    })

}

module.exports = {
    getSocial,
    search
}