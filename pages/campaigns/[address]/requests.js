import React from "react";

import { Button } from "semantic-ui-react";
import Link from "next/link";

// Ethereum stuff
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

// Custom Components
import Layout from "../../../components/UI/Layout";

function Requests({ address, requestCount, requests }) {
  return (
    <Layout>
      <h3>Requests</h3>

      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
      <div>Number of requests: {requestCount}</div>
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts
Requests.getInitialProps = async (data) => {
  const address = data.query["address"];

  const campaign = Campaign(address);

  const requestCount = await campaign.methods.getRequestCount().call();

  const requests = await Promise.all(
    Array(requestCount)
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, requestCount, requests };
};

export default Requests;
