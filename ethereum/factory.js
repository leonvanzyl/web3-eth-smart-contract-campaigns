import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x26ea5Be33728430A2fD8e0fBaE1b301a331F95Ab"
);

export default instance;
