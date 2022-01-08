import React from "react";

// NEXT JS imports
import { useRouter } from "next/router";
import Head from "next/head";

// Ethereum stuff
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

// Custom Components
import Layout from "../../components/UI/Layout";

function Show(props) {
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

export default Show;
