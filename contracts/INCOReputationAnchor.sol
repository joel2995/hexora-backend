// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract INCOReputationAnchor {
    address public immutable incoAuthority;

    struct AnchoredReputation {
        bytes32 jobHash;        // attested compute job
        bytes32 outputHash;     // hash of decrypted result
        uint256 anchoredAt;
    }

    mapping(address => AnchoredReputation) public reputations;

    event INCOReputationAnchored(
        address indexed creator,
        bytes32 jobHash,
        bytes32 outputHash
    );

    constructor(address _incoAuthority) {
        incoAuthority = _incoAuthority;
    }

    /**
     * Anchors output of an attested INCO compute job
     */
    function anchorFromAttestedCompute(
        address creator,
        bytes32 jobHash,
        bytes32 outputHash
    ) external {
        require(msg.sender == incoAuthority, "Only INCO authority");

        reputations[creator] = AnchoredReputation({
            jobHash: jobHash,
            outputHash: outputHash,
            anchoredAt: block.timestamp
        });

        emit INCOReputationAnchored(creator, jobHash, outputHash);
    }

    function getReputationHash(address creator)
        external
        view
        returns (bytes32)
    {
        return reputations[creator].outputHash;
    }
}
