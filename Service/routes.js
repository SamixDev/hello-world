const express = require('express');
const apiResponse = require("./apiResponse");
const router = express.Router();
const { getPortfolio } = require('../API/portfolio');
const { getNfts } = require('../API/nfts');
const { getTnx } = require('../API/transactions');
const { getTransfers } = require('../API/transfers');
const { getSocial, search } = require('../API/social');
const { getPoaps } = require('../API/poaps');
const { getDomainPicture } = require('../API/domain');
const { profileDetails, common } = require('../API/profile');
const { checkFollow } = require('../API/check_follow');

// health check
router.get('/healthcheck', async (req, res) => {
    const data = {
        uptime: process.uptime(),
        timestamp: Date.now()
    }

    try {
        apiResponse.successResponseWithData(res, 'OK', data);
    } catch (e) {
        apiResponse.errorResponse(res, e);
    }

});

// get portfolio
router.get('/portfolio', (req, res) => {
    let address = req.query.address;
    let chain_id = req.query.chain_id;
    let currency = req.query.currency;
    let decimal = req.query.decimal;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        chain_id === undefined ? chain_id = 1 : null;
        getPortfolio(address, chain_id, currency, decimal).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get nfts
router.get('/nfts', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getNfts(address).then(data => {
            if (data.length === 0) {
                apiResponse.successResponseWithData(res, "No Data Found", [])
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get transactions
router.get('/transactions', (req, res) => {
    let address = req.query.address;
    let chain_id = req.query.chain_id;
    let page_number = req.query.page_number;
    let page_size = req.query.page_size;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        chain_id === undefined ? chain_id = 1 : null;
        getTnx(address, chain_id, page_number, page_size).then(data => {
            if (data.length === 0) {
                apiResponse.successResponseWithData(res, "No Transactions Found", [])
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get transfers
router.get('/transfers', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getTransfers(address).then(data => {
            if (data.length === 0) {
                apiResponse.successResponseWithData(res, "No Transfers Found", [])
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get social 
router.get('/social', (req, res) => {
    let address = req.query.address;
    let type = req.query.type;
    let page_number = req.query.page_number;
    let page_size = req.query.page_size;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getSocial(address, type, page_size, page_number).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get follow status 
router.get('/check_follow', (req, res) => {
    let yourAddr = req.query.yourAddr;
    let theirAddr = req.query.theirAddr;

    if (yourAddr === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        checkFollow(yourAddr, theirAddr).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// search for an address
router.get('/search', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        search(address).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get poaps 
router.get('/poaps', (req, res) => {
    let address = req.query.address;

    if (address === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getPoaps(address).then(data => {
            if (data.length === 0) {
                apiResponse.successResponseWithData(res, "No POAPs Found", [])
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get domain metadata 
router.get('/domain_picture', (req, res) => {
    let domain = req.query.domain;

    if (domain === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        getDomainPicture(domain).then(data => {
            console.log(data)
            if (data === "") {
                apiResponse.successResponseWithData(res, "No Profile Image", "")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get domain metadata 
router.get('/profile_details', (req, res) => {
    let yourAddr = req.query.yourAddr;
    let theirAddr = req.query.theirAddr;

    if (yourAddr === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        profileDetails(yourAddr, theirAddr).then(data => {
            if (data === "") {
                apiResponse.errorResponse(res, "No Data")
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

// get domain metadata 
router.get('/common', (req, res) => {
    let yourAddr = req.query.yourAddr;
    let theirAddr = req.query.theirAddr;

    if (yourAddr === undefined) {
        apiResponse.errorResponse(res, "No Address Defined")
    } else {
        common(yourAddr, theirAddr).then(data => {
            if (data.poaps.length === 0
                && data.nft_collections.length === 0
                && data.transactions.length === 0) {
                apiResponse.successResponseWithData(res, "Nothing in Common", [])
            } else {
                apiResponse.successResponseWithData(res, "Found Data", data)
            }
        }).catch(error => {
            apiResponse.errorResponse(res, error.message)
        });
    }
});

module.exports = router;