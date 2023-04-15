// SPDX-License-Identifier: BUSL-1.1

/// @title VibeeStats
/// @author pdito
/// @notice Statistics for a specific vibee at a vibe

pragma solidity ^0.8.18;

struct VibeeStats {
    uint256 vibe;
    uint256 id;
    address vibee;
    bool exists;
    uint256 achievements;
    string status;
}
