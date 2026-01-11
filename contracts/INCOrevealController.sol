// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract INCORevealController {
    address public immutable incoAuthority;

    struct RevealPermission {
        bool allowed;
        uint256 expiresAt;
    }

    // creator => viewer => permission
    mapping(address => mapping(address => RevealPermission)) public revealPermissions;

    event RevealAuthorized(
        address indexed creator,
        address indexed viewer,
        uint256 expiresAt
    );

    event DataRevealed(
        address indexed creator,
        address indexed viewer,
        bytes32 revealedHash
    );

    constructor(address _incoAuthority) {
        incoAuthority = _incoAuthority;
    }

    /**
     * STEP E (part 1):
     * Grant reveal permission (based on allowance voucher)
     */
    function authorizeReveal(
        address creator,
        address viewer,
        uint256 expiresAt,
        bytes calldata allowanceVoucher
    ) external {
        require(msg.sender == incoAuthority, "Unauthorized");
        require(allowanceVoucher.length > 0, "Invalid voucher");

        revealPermissions[creator][viewer] = RevealPermission({
            allowed: true,
            expiresAt: expiresAt
        });

        emit RevealAuthorized(creator, viewer, expiresAt);
    }

    /**
     * STEP E (part 2):
     * Emit reveal confirmation (actual data is revealed off-chain)
     */
    function confirmReveal(
        address creator,
        address viewer,
        bytes32 revealedHash
    ) external {
        RevealPermission memory perm = revealPermissions[creator][viewer];

        require(perm.allowed, "Reveal not allowed");
        require(block.timestamp <= perm.expiresAt, "Reveal expired");

        emit DataRevealed(creator, viewer, revealedHash);
    }
}
