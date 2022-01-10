import React from "react";

import { Button, Table } from "semantic-ui-react";
import Link from "next/link";

// Ethereum stuff
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

// Custom Components
import Layout from "../../../components/UI/Layout";
import RequestRow from "../../../components/requests/RequestRow";

function Requests({ address, requestCount, requests, approversCount }) {
  const { Header, Row, HeaderCell, Body } = Table;

  // Helper Functions
  const renderRow = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Requests</h3>

      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
      <div>Number of requests: {requestCount}</div>
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts
Requests.getInitialProps = async (data) => {
  const address = data.query["address"];

  const campaign = Campaign(address);

  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  console.log(approversCount);

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, requestCount, requests, approversCount };
};

export default Requests;
