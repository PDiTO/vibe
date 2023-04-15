// SPDX-License-Identifier: BUSL-1.1

/// @title ViberStats
/// @author pdito
/// @notice Event stats for a vibes

pragma solidity ^0.8.18;

// A Vibe (event)
struct VibeStats {
    uint256 id;
    string name;
    string shortName;
    string imageUrl;
    uint256 startDate;
    uint256 endDate;
    string eventType;
    address[] admins;
    uint256[] participantIds;
    bool live;
}
