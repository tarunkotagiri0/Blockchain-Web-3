const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider("http://0.0.0.0:7545");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please Wait...");
  const contract = await contractFactory.deploy(); // Stop! Wait for the contract to deploy
  console.log(await contract.getAddress());

  const currentFavNum = await contract.favouriteNumber();
  console.log(`Current Favourite Number is : ${currentFavNum.toString()}`);

  const transactionResponse = await contract.store("21");
  const transactionReciept = await transactionResponse.wait(1);
  const updatedFavouriteNumber = await contract.favouriteNumber();
  console.log(
    `Current Favourite Number is : ${updatedFavouriteNumber.toString()}`
  );

  //   console.log(contract);
  //   const deploymentReciept = await contract.waitForDeployment(1);
  //   console.log(deploymentReciept);

  // Raw Transaction

  //   const nonce = await wallet.getNonce();
  //   const tx = {
  //     nonce: nonce,
  //     gasPrice: 20000000000,
  //     gasLimit: 1000000,
  //     to: null,
  //     value: 0,
  //     data: "0x608060405234801561001057600080fd5b5061076e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806343ede4ae1461005c5780636056ea531461007a5780636057361d146100aa5780636f760f41146100c65780639e7a13ad146100e2575b600080fd5b610064610113565b6040516100719190610527565b60405180910390f35b610094600480360381019061008f91906103c5565b610119565b6040516100a19190610527565b60405180910390f35b6100c460048036038101906100bf919061046a565b610147565b005b6100e060048036038101906100db919061040e565b610151565b005b6100fc60048036038101906100f7919061046a565b6101e1565b60405161010a929190610542565b60405180910390f35b60005481565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8060008190555050565b600260405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101b792919061029d565b505050806001836040516101cb9190610510565b9081526020016040518091039020819055505050565b600281815481106101f157600080fd5b906000526020600020906002020160009150905080600001549080600101805461021a9061063b565b80601f01602080910402602001604051908101604052809291908181526020018280546102469061063b565b80156102935780601f1061026857610100808354040283529160200191610293565b820191906000526020600020905b81548152906001019060200180831161027657829003601f168201915b5050505050905082565b8280546102a99061063b565b90600052602060002090601f0160209004810192826102cb5760008555610312565b82601f106102e457805160ff1916838001178555610312565b82800160010185558215610312579182015b828111156103115782518255916020019190600101906102f6565b5b50905061031f9190610323565b5090565b5b8082111561033c576000816000905550600101610324565b5090565b600061035361034e84610597565b610572565b90508281526020810184848401111561036f5761036e610701565b5b61037a8482856105f9565b509392505050565b600082601f830112610397576103966106fc565b5b81356103a7848260208601610340565b91505092915050565b6000813590506103bf81610721565b92915050565b6000602082840312156103db576103da61070b565b5b600082013567ffffffffffffffff8111156103f9576103f8610706565b5b61040584828501610382565b91505092915050565b600080604083850312156104255761042461070b565b5b600083013567ffffffffffffffff81111561044357610442610706565b5b61044f85828601610382565b9250506020610460858286016103b0565b9150509250929050565b6000602082840312156104805761047f61070b565b5b600061048e848285016103b0565b91505092915050565b60006104a2826105c8565b6104ac81856105d3565b93506104bc818560208601610608565b6104c581610710565b840191505092915050565b60006104db826105c8565b6104e581856105e4565b93506104f5818560208601610608565b80840191505092915050565b61050a816105ef565b82525050565b600061051c82846104d0565b915081905092915050565b600060208201905061053c6000830184610501565b92915050565b60006040820190506105576000830185610501565b81810360208301526105698184610497565b90509392505050565b600061057c61058d565b9050610588828261066d565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b2576105b16106cd565b5b6105bb82610710565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062657808201518184015260208101905061060b565b83811115610635576000848401525b50505050565b6000600282049050600182168061065357607f821691505b602082108114156106675761066661069e565b5b50919050565b61067682610710565b810181811067ffffffffffffffff82111715610695576106946106cd565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072a816105ef565b811461073557600080fd5b5056fea2646970667358221220bd632f2c8119ee98556c25c173e5633d66ce1690da3f0188643c9f289298315a64736f6c63430008070033",
  //     chainId: 1337,
  //   };
  //   const sentTxResponse = await wallet.sendTransaction(tx);
  //   console.log(sentTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });