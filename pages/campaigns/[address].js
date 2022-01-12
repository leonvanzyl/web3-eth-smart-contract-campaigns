import React from "react";

// NEXT JS imports
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { Card, Grid, Button } from "semantic-ui-react";

// Ethereum stuff
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

// Custom Components
import Layout from "../../components/UI/Layout";
import ContributeForm from "../../components/campaigns/ContributeForm";

function Show(props) {
  // Deconstruct Summary
  const {
    address,
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
      meta: "Campaign Balance (in Ether)",
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
      <h3>Campaign Detail</h3>

      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts
export async function getServerSideProps(context) {
  const address = context.params.address;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      summary: {
        address: address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      },
    },
  };
}

export default Show;
