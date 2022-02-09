const { HttpRequest } = require("../Service/dataFetch");

async function getPortfolio(address, chain_id = 1, currency = 'usd', decimal = 5) {
    return new Promise((resolve, reject) => {
        const matchPrimer = ''
        const type = `address`
        const method = `balances_v2`
        const params = `nft=false&quote-currency=${currency}`
        const request = new HttpRequest(chain_id, type, method, address, 0, 0, matchPrimer, params);
        request.fetch().then(data => {
            try {
                let tokens = []

                data.items.forEach(el => {
                    if (el.balance > 0) {
                        let eachCoin = {
                            name: el.contract_name,
                            symbol: el.contract_ticker_symbol,
                            contract_address: el.contract_address,
                            logo: el.logo_url,
                            balance: Number((el.balance / (10 ** el.contract_decimals)).toFixed(decimal)),
                            quote_rate: el.quote_rate == null ? 0 : Number(el.quote_rate.toFixed(decimal)),
                            quote: el.quote,
                            currency: currency
                        }
                        tokens.push(eachCoin)
                    }

                });

                resolve({
                    tokens: tokens,
                })
            } catch (error) {
                console.log(error)
                reject(error);
            }


        }).catch(err => {
            console.log(err)
            reject(err)
        })

    });
}

module.exports = {
    getPortfolio
}