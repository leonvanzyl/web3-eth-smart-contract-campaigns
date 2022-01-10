import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x77F208bE4D625a89bFD27A372612afe90ce40Bf6"
);

export default instance;
