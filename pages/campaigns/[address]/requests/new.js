import React, { useState } from "react";

// Custom Components
import Layout from "../../../../components/UI/Layout";

// Ethereum Stuff
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

// Semantic UI
import { Form, Button, Message, Input } from "semantic-ui-react";

function New({ address }) {
  // States
  const [descriptionValue, setDescriptionValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [recipientValue, setRecipientValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Handler Functions
  const handleCreateButton = () => {};

  return (
    <Layout>
      <h3>New Request</h3>
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

        <Button primary onClick={handleCreateButton}>
          Create Request
        </Button>
      </Form>
    </Layout>
  );
}

export default New;

//uses server side rendering to call the campaign contracts
New.getInitialProps = async (data) => {
  const address = data.query["address"];

  return { address };
};
