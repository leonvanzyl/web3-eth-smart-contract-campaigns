import React, { useState } from "react";

import { Table, Label, Button } from "semantic-ui-react";

// Routing
import { useRouter } from "next/router";

// Ethereum Stuff
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";

// Main Component
function RequestRow({ key, id, request, address, approversCount }) {
  // State
  const [isApproving, setIsApproving] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // Routing
  const router = useRouter();

  const { Row, Cell } = Table;

  const readyToFinalize = request.approvalCount > approversCount / 2;

  // Handler Functions
  // Approve Request
  const handleApprove = async () => {
    setIsApproving(true);
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      alert(err.message);
    }
    setIsApproving(false);
  };

  // Finalize Request
  const handleFinalize = async () => {
    setIsFinalizing(true);
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      router.replace(`/campaigns/${address}/requests`);
    } catch (err) {
      alert(err.message);
    }
    setIsFinalizing(false);
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
          <Button
            loading={isApproving}
            color="green"
            basic
            onClick={handleApprove}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button
            loading={isFinalizing}
            color="teal"
            basic
            onClick={handleFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
