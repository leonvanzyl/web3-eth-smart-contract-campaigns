import React from "react";
import { Button } from "semantic-ui-react";

import { useRouter } from "next/router";

const CreateCampaignButton = (props) => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => {
          router.push("/campaigns/new");
        }}
        floated="right"
        content="Create Campaign"
        icon="add"
        primary
      />
    </div>
  );
};

export default CreateCampaignButton;
