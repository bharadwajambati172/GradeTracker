const Web3 = require('web3');
const contract = require('./build/contracts/GradeTracker.json')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const address = contract.networks["5777"].address

console.log(address)
exports.myContract = function() {
    return new web3.eth.Contract(contract.abi, address);
}
