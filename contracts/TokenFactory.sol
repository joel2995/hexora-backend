// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./CreatorToken.sol";

contract TokenFactory {
    event CreatorTokenCreated(
        address indexed creator,
        address tokenAddress
    );

    mapping(address => address) public creatorToToken;

    function createCreatorToken(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_
    ) external {
        require(
            creatorToToken[msg.sender] == address(0),
            "Token already created"
        );

        CreatorToken token = new CreatorToken(
            name_,
            symbol_,
            maxSupply_,
            msg.sender
        );

        creatorToToken[msg.sender] = address(token);

        emit CreatorTokenCreated(msg.sender, address(token));
    }
}
