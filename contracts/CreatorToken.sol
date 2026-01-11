// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorToken is ERC20, Ownable {
    uint256 public immutable maxSupply;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        address creator_
    ) ERC20(name_, symbol_) Ownable(creator_) {
        maxSupply = maxSupply_;
        _mint(creator_, maxSupply_);
    }
}
