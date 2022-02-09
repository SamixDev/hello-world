const { gql, GraphQLClient } = require('graphql-request')

async function checkFollow(yourAddr, theirAddr) {
    return new Promise((resolve, reject) => {
        const client = new GraphQLClient("https://api.cybertino.io/connect/", { headers: {} })
        let query;

        query = gql`query {
                            followStatus(fromAddr:"${yourAddr}" toAddr:"${theirAddr}"){
                                is_following: isFollowing
                                is_followed: isFollowed
                            }
                            }`


        client.request(query).then((data) => {
            if (data.followStatus != null || data.identity != null) {
                let details;

                details = {
                    is_following: data.followStatus.is_following,
                    is_followed: data.followStatus.is_followed,
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

module.exports = {
    checkFollow
}