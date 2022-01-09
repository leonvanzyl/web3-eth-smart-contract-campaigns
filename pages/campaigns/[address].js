import React from "react";

// NEXT JS imports
import { useRouter } from "next/router";
import Head from "next/head";

import { Card } from "semantic-ui-react";

// Ethereum stuff
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

// Custom Components
import Layout from "../../components/UI/Layout";

function Show(props) {
  // Router
  const router = useRouter();
  const address = router.query["address"];

  // Summary Items

  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount,
  } = props.summary;

  const items = [
    {
      header: manager,
      description:
        "The manager created this campaign and can request to withdraw funds.",
      meta: "Address of manager",
      style: {
        overflowWrap: "break-word",
      },
    },
    {
      header: minimumContribution,
      description:
        "You must contribute at least this much Wei to become an approver.",
      meta: "Minimum Contribution (Wei)",
      style: {
        overflowWrap: "break-word",
      },
    },
    {
      header: requestsCount,
      description:
        "A request tried to withdraw money from the contract.  Requests must be approved by approvers.",
      meta: "Number of requests",
      style: {
        overflowWrap: "break-word",
      },
    },
    {
      header: approversCount,
      description:
        "Number of people who have already contributed to the campaign.",
      meta: "Number of approvers",
      style: {
        overflowWrap: "break-word",
      },
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      description:
        "The balance is how much funds this campaign has available to spend.",
      meta: "Balance (in Ether)",
      style: {
        overflowWrap: "break-word",
      },
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Details of Campaign {address}</title>
      </Head>
      <Card.Group items={items} />
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts
Show.getInitialProps = async (data) => {
  const address = data.query["address"];
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    summary: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};

export default Show;
