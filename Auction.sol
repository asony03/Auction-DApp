pragma solidity ^0.5.11;

contract Auction {
    
    address internal auction_owner;
    uint256 public auction_start;
    uint256 public auction_end;
    uint256 public highestBid;
    address public highestBidder;
    
    enum auction_state {
        CANCELLED, STARTED
    }
    
    struct car {
        string Brand;
        string Rnumber;
        address owner;
    }
    
    car public Mycar;
    address[] bidders;
    mapping(address => uint) public bids;
    auction_state public STATE;
    
    modifier an_ongoing_auction() {
        require(now <= auction_end && STATE != auction_state.CANCELLED);
        _;
    }
    
    modifier only_owner() {
        require(msg.sender == auction_owner);
        _;
    }
    
    function bid() public payable returns (bool) {}
    function withdraw() public returns (bool) {}
    function cancel_auction() external returns (bool) {}

    event BidEvent (address indexed highestBidder, uint256 highestBid);
    event WithdrawalEvent (address withdrawer, uint256 amount);
    event CancelledEvent (string message, uint256 time);
    event OwnershipTransferredEvent (address new_owner, uint256 time);

}

contract MyAuction is Auction {
    
    constructor(uint _biddingTime, address _owner, string memory _brand, string memory _Rnumber) public {
        auction_owner = _owner;
        auction_start = now;
        auction_end = auction_start + (_biddingTime*1 hours);
        STATE = auction_state.STARTED;
        Mycar.Brand = _brand;
        Mycar.Rnumber = _Rnumber;
        Mycar.owner = _owner;
    }
    
    function get_contract_owner() public view returns (address) {
        return auction_owner;
    }
    
    function get_car_owner() public view returns (address) {
        return Mycar.owner;
    }
    
    function bid() public payable an_ongoing_auction returns(bool) {
        require(bids[msg.sender] + msg.value > highestBid, "Can't bid send a higher value");
        highestBidder = msg.sender;
        highestBid = bids[msg.sender] + msg.value;
        bids[msg.sender] = bids[msg.sender] + msg.value;
        bidders.push(msg.sender);
        emit BidEvent(highestBidder, highestBid);
        return true;
    }
    
    function cancel_auction() public only_owner an_ongoing_auction returns(bool) {
        STATE = auction_state.CANCELLED;
        auction_end = now;
        emit CancelledEvent("Auction Cancelled", now);
        return true;
    }
    
    function withdraw() public returns(bool) {
        require(now > auction_end, "Auction is still active");
        uint amount = bids[msg.sender];
        bids[msg.sender]=0;
        msg.sender.transfer(amount);
        emit WithdrawalEvent(msg.sender, amount);
        return true;
    }
    
    function destruct_auction() public only_owner returns(bool) {
        require(now > auction_end, "You cannot destruct the auction, auction is still open");
        for(uint i=0; i < bidders.length; i++) {
            assert(bids[bidders[i]] == 0);
        }
        
        require(msg.sender == auction_owner);
        selfdestruct(msg.sender);
        return true;
    }
    
    function transfer_ownership() public only_owner returns (bool) {
        require(now > auction_end, "Auction is still active");
        require(STATE != auction_state.CANCELLED, "The auction has been cancelled");
        require(bidders.length != 0, "There has been no bids yet");
        
        Mycar.owner = highestBidder;
        emit OwnershipTransferredEvent(Mycar.owner, now);
        return true;
    }
}