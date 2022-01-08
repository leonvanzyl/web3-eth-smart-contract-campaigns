import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xD60FF8B42ecA32B5d6186d3d725F94c33BFB23Ae"
);

export default instance;
