import React from "react";

import { Table, Label, Button } from "semantic-ui-react";

// Ethereum Stuff
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";

// Main Component
function RequestRow({ key, id, request, address, approversCount }) {
  const { Row, Cell } = Table;

  const readyToFinalize = request.approvalCount > approversCount / 2;

  // Handler Functions
  // Approve Request
  const handleApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
    } catch (err) {
      alert(err.message);
    }
  };

  // Finalize Request
  const handleFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount} / {approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={handleApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={handleFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
