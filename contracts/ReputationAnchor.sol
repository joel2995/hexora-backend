// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ReputationAnchor {
    event ReputationAnchored(
        address indexed creator,
        bytes32 reputationHash
    );

    mapping(address => bytes32) public reputationHashes;

    function anchorReputation(
        address creator,
        bytes32 reputationHash
    ) external {
        reputationHashes[creator] = reputationHash;
        emit ReputationAnchored(creator, reputationHash);
    }
}
