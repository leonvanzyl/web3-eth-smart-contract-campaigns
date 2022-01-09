import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

// Etherium stuff
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

function ContributeForm({ address }) {
  // States
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Router
  const router = useRouter();

  // Handler Functions
  const handleContributeButton = async () => {
    const campaign = Campaign(address);

    setIsSending(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();

      // Contribute
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(inputValue, "ether"),
      });

      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setInputValue("");
    setIsSending(false);
  };

  return (
    <Form error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Button loading={isSending} primary onClick={handleContributeButton}>
        Contribute!
      </Button>

      {errorMessage && (
        <Message
          error
          header="There was some errors with your submission"
          content={errorMessage}
        />
      )}
    </Form>
  );
}

export default ContributeForm;
