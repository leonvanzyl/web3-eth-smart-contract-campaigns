import React, { useState } from "react";
import Head from "next/head";
import { Button, Form, Input, Message } from "semantic-ui-react";

import { useRouter } from "next/router";

// Ethereum stuff
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

// Custom Components
import Layout from "../../components/UI/Layout";

function New() {
  // Router
  const router = useRouter();

  // States
  const [minContribution, setMinContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Handler functions
  const handleCreateButton = async () => {
    setIsSending(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrorMessage(err.message);
    }

    setIsSending(false);

    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>Create New Campaign</title>
      </Head>

      <h3>Create a Campaign</h3>
      <Form error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="Wei"
            labelPosition="right"
            value={minContribution}
            onChange={(e) => {
              setErrorMessage("");
              setMinContribution(e.target.value);
            }}
          />
        </Form.Field>
        <Button loading={isSending} onClick={handleCreateButton} primary>
          Create!
        </Button>

        {errorMessage && (
          <Message
            error
            header="There was some errors with your submission"
            content={errorMessage}
          />
        )}
      </Form>
    </Layout>
  );
}

export default New;
