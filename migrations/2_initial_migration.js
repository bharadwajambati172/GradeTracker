var Migrations = artifacts.require("./GradeTracker.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
