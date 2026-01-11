// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ConfidentialReputationEngine {

    struct EncryptedSignals {
        bytes influenceSignal;
        bytes trustSignal;
        bool submitted;
    }

    mapping(address => EncryptedSignals) private signals;

    event SignalsSubmitted(address indexed creator);

    // 🔓 Final scores are emitted (computed off-chain for now)
    event ScoresFinalized(
        address indexed creator,
        uint256 influenceScore,
        uint256 trustScore
    );

    // Step 1: submit encrypted inputs (INCO-encrypted bytes)
    function submitSignals(
        address creator,
        bytes calldata encryptedInfluence,
        bytes calldata encryptedTrust
    ) external {
        signals[creator] = EncryptedSignals({
            influenceSignal: encryptedInfluence,
            trustSignal: encryptedTrust,
            submitted: true
        });

        emit SignalsSubmitted(creator);
    }

    // Step 2: backend submits FINAL scores (after decrypting off-chain)
    function finalizeScores(
        address creator,
        uint256 influenceScore,
        uint256 trustScore
    ) external {
        require(signals[creator].submitted, "No signals");

        emit ScoresFinalized(creator, influenceScore, trustScore);
    }

    // Optional: allow backend to verify signals exist
    function hasSignals(address creator) external view returns (bool) {
        return signals[creator].submitted;
    }
}
