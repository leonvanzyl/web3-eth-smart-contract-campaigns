import React from "react";

// NEXT JS imports
import { useRouter } from "next/router";
import Head from "next/head";

// Ethereum stuff
import factory from "../../ethereum/factory";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

// Custom Components
import Layout from "../../components/UI/Layout";

function Show(props) {
  // Router
  const router = useRouter();
  const address = router.query["address"];

  return (
    <Layout>
      <Head>
        <title>Details of Campaign {address}</title>
      </Head>
      Campaign: {address}
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
      requests: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};

export default Show;
