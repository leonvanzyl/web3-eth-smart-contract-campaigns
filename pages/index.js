import React from "react";
import factory from "../ethereum/factory";

import Head from "next/head";

import Link from "next/link";

// Custom Components
import CampaignGroup from "../components/campaigns/CampaignGroup";
import CreateCampaignButton from "../components/campaigns/CreateCampaignButton";
import Layout from "../components/UI/Layout";

// Main Component
const Index = (props) => {
  const items = props.campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });

  return (
    <Layout>
      <Head>
        <title>Campaign Overview</title>
      </Head>
      <h3>Open Campaigns</h3>
      <CreateCampaignButton />
      <CampaignGroup items={items} />
    </Layout>
  );
};

//uses server side rendering to call the campaign contracts
Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default Index;
