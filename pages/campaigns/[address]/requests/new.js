import React, { useState } from "react";

// Custom Components
import Layout from "../../../../components/UI/Layout";

// Ethereum Stuff
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

// Next Router
import { useRouter } from "next/router";
import Link from "next/link";

// Semantic UI
import { Form, Button, Message, Input } from "semantic-ui-react";

function New({ address }) {
  // Router
  const router = useRouter();

  // States
  const [descriptionValue, setDescriptionValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [recipientValue, setRecipientValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Handler Functions
  const handleCreateButton = async () => {
    const campaign = Campaign(address);

    setIsSending(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(
          descriptionValue,
          web3.utils.toWei(amountValue, "ether"),
          recipientValue
        )
        .send({
          from: accounts[0],
        });

      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    // Once done
    setIsSending(false);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={descriptionValue}
            onChange={(e) => {
              setDescriptionValue(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Amount</label>
          <Input
            label="Ether"
            labelPosition="right"
            value={amountValue}
            onChange={(e) => {
              setAmountValue(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipientValue}
            onChange={(e) => {
              setRecipientValue(e.target.value);
            }}
          />
        </Form.Field>

        <Button loading={isSending} primary onClick={handleCreateButton}>
          Create!
        </Button>
      </Form>
      {errorMessage && (
        <Message
          error
          header="There was some errors with your submission"
          content={errorMessage}
        />
      )}
    </Layout>
  );
}

export default New;

//uses server side rendering to call the campaign contracts
New.getInitialProps = async (data) => {
  const address = data.query["address"];

  return { address };
};
