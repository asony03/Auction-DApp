var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
var bidder = web3.eth.accounts[1];
web3.eth.defaultAccount = bidder;
var auction = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "Mycar",
		"outputs": [
			{
				"internalType": "string",
				"name": "Brand",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Rnumber",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "bid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancel_auction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_car_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "transfer_ownership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_contract_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "auction_start",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "highestBidder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destruct_auction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "auction_end",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "STATE",
		"outputs": [
			{
				"internalType": "enum Auction.auction_state",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "highestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_biddingTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_brand",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Rnumber",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			}
		],
		"name": "BidEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawalEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "CancelledEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "new_owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "OwnershipTransferredEvent",
		"type": "event"
	}
]);

var contractAddress = "0x908038DcB1eB67583C49BB0bB1788579FeAF5e89";
var auctionContract = auction.at(contractAddress);


function bid() {
  var mybid = document.getElementById('value').value;

  auctionContract.bid({
    value: web3.toWei(mybid, "ether"),
    gas: 200000
  }, function(error, result) {
    if(error) {
      console.log("error is " + error);
      alert("You are either the owner of the Auction or your bidding amount is low (think to bid higher) or the auction is no longer active");
    } else {
      alert("Successful bid, transaction ID" + result);
    }
  });
}

function init() {

  auctionContract.auction_end(function(error, result) {
    document.getElementById("auction_end").innerHTML = result;
  });

  auctionContract.highestBidder(function(error, result) {
    document.getElementById("HighestBidder").innerHTML = result;
  });

  auctionContract.highestBid(function(error, result) {
    var bidEther = web3.fromWei(result, 'ether');
    document.getElementById("HighestBid").innerHTML = bidEther;
  });

  auctionContract.STATE(function(error, result) {
    document.getElementById("STATE").innerHTML = result;
  });

  auctionContract.Mycar(function(error, result) {
    document.getElementById("car_brand").innerHTML = result[0];
    document.getElementById("registration_number").innerHTML = result[1];
    document.getElementById("car_owner").innerHTML = result[2];
  });

  auctionContract.bids(bidder, function(error, result) {
    var bidEther = web3.fromWei(result, 'ether');
    document.getElementById("MyBid").innerHTML = bidEther;
    console.log(bidder);
  });

  auctionContract.get_car_owner(function(error, result) {
    if(!error) {
      document.getElementById("car_owner").innerHTML = result;
    }
  });

  var auction_owner = null;
  auctionContract.get_contract_owner(function(error, result) {
    if(!error) {
      auction_owner = result;
      if(bidder != auction_owner) {
        $("#auction_owner_operations").hide();
      }
    }
  });
}

function cancel_auction() {
  auctionContract.cancel_auction(function(error, result) {
    if(error) {
      console.log("Couldn't perform this action, failed!");
    } else {
      console.log(result);
    }
  });
}

function transfer_ownership() {
  auctionContract.transfer_ownership(function(error, result) {
    if(error) {
      console.log("Couldn't perform this action, failed!");
    } else {
      console.log(result);
    }
  });
}

function destruct_auction() {
  auctionContract.destruct_auction(function(error, result) {

    if(error) {
      console.log("Couldn't perform this action, failed!");
    } else {
      console.log(result);
    }

  });
}

var BidEvent = auctionContract.BidEvent();
BidEvent.watch(function(error, result) {
  if(!error) {
    $("#eventslog").html(result.args.highestBidder + ' has bidden(' + result.args.highestBid + 'wei)');
  } else {
    console.log(error);
  }
});

var CancelEvent = auctionContract.CancelledEvent();
CancelEvent.watch(function(error, result) {
  if(!error) {
    $("#eventslog").html(result.args.message + ' at ' + result.args.time);
  } 
});

var OwnershipTransferredEvent = auctionContract.OwnershipTransferredEvent();
OwnershipTransferredEvent.watch(function(error, result) {
  if(!error) {
    $("#eventslog").html('Car ownership transferred to ' + result.args.new_owner + ' at ' + result.args.time);
  } 
});

const filter = web3.eth.filter({
  fromBlock: 0,
  toBlock: 'latest',
  address: contractAddress,
  topics: [web3.sha3('BidEvent(address, uint256)')]
});

filter.get((error, result) => {
  if(!error) {
    console.log(result);
  }
});