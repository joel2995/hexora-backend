// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingPool {
    IERC20 public immutable stakingToken;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public lastUpdate;

    uint256 public rewardRate = 1; // simple fixed rate

    constructor(address token_) {
        stakingToken = IERC20(token_);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");

        _updateRewards(msg.sender);

        stakingToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );

        balances[msg.sender] += amount;
    }

    function unstake(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        _updateRewards(msg.sender);

        balances[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function claimRewards() external {
        _updateRewards(msg.sender);
    }

    function _updateRewards(address user) internal {
        uint256 timeElapsed = block.timestamp - lastUpdate[user];
        uint256 reward = balances[user] * rewardRate * timeElapsed;

        if (reward > 0) {
            stakingToken.transfer(user, reward);
        }

        lastUpdate[user] = block.timestamp;
    }
}
