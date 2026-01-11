// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IReputationAnchor {
    function anchorReputation(address creator, bytes32 reputationHash) external;
}

contract INCOAttestedComputeVerifier {
    address public immutable incoAuthority;
    IReputationAnchor public immutable anchor;

    struct VerifiedCompute {
        bytes32 jobHash;
        bytes32 outputHash;
        bool verified;
    }

    mapping(address => VerifiedCompute) public verifiedResults;

    event ComputeVerified(
        address indexed creator,
        bytes32 jobHash,
        bytes32 outputHash
    );

    constructor(address _incoAuthority, address _anchor) {
        incoAuthority = _incoAuthority;
        anchor = IReputationAnchor(_anchor);
    }

    /**
     * STEP D:
     * Verify attested compute output coming from INCO TEE
     */
    function verifyCompute(
        address creator,
        bytes32 jobHash,
        bytes32 outputHash,
        bytes calldata attestationProof
    ) external {
        require(msg.sender == incoAuthority, "Unauthorized caller");
        require(attestationProof.length > 0, "Invalid attestation");

        // NOTE:
        // Full attestation verification is handled by INCO protocol.
        // This contract enforces trust boundary & anchoring.

        verifiedResults[creator] = VerifiedCompute({
            jobHash: jobHash,
            outputHash: outputHash,
            verified: true
        });

        // Anchor hash on-chain (immutability)
        anchor.anchorReputation(creator, outputHash);

        emit ComputeVerified(creator, jobHash, outputHash);
    }

    function isVerified(address creator) external view returns (bool) {
        return verifiedResults[creator].verified;
    }
}
