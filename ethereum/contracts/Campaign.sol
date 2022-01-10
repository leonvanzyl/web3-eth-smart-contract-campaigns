// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


// The user interfaces will interface with our factory to create campaigns..
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
       address newCampaign = address(new Campaign(minimum, msg.sender));
       deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {
    // custom structure
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minContr;
    mapping(address => bool) public approvers;
    uint public approversCount;


    // Modifiers
    modifier ownerOnly(){
        require(msg.sender == manager, "Only the campaign owner can execute this function!");
        _;
    }

    
    // Constructor
    constructor(uint minimum, address sender){
        manager = sender;
        minContr = minimum;
    }


    // Contribute to Campaign
    function contribute () public payable {
        require(msg.value > minContr, "Transaction value is less than minimum contribution amount!");

        // Keep track of the number of contributors
        if(!approvers[msg.sender]){
            approversCount++;
        }

        // Add contributor to mapping
        approvers[msg.sender] = true;
    }


    // Create transfer request
    function createRequest(string memory description, uint value, address recipient) public ownerOnly{

        Request storage newRequest = requests.push();

        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;

    }

    // Approve request
    function approveRequest(uint requestIndex) public {

        Request storage r = requests[requestIndex];

        require(approvers[msg.sender]);
        require(!r.approvals[msg.sender]);

        r.approvals[msg.sender] = true;
        r.approvalCount++;
    }

    // Finalize Request
    function finalizeRequest(uint index) public ownerOnly{
        Request storage r = requests[index];
        require(!r.complete, "Request has already been finalized!");
        require(r.approvalCount > (approversCount / 2), "At least 50% of approvals required!");

        payable(r.recipient).transfer(r.value);
        
        r.complete = true;
    }

    // Get Campaign Summary
    function getSummary() public view returns (uint, uint, uint, uint, address){
        return (
            minContr,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint){
        return requests.length;
    }

}