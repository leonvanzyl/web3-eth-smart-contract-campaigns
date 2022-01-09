import React from "react";

import { Button } from "semantic-ui-react";
import Link from "next/link";

// Custom Components
import Layout from "../../../components/UI/Layout";

function Requests({ address }) {
  return (
    <Layout>
      <h3>Requests</h3>

      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
    </Layout>
  );
}

//uses server side rendering to call the campaign contracts
Requests.getInitialProps = async (data) => {
  const address = data.query["address"];

  return { address };
};

export default Requests;
