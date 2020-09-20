const Migration = artifacts.require("IdentityManagement");

module.exports = function (deployer) {
  deployer.deploy(Migration);
};
