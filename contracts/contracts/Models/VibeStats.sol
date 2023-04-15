// SPDX-License-Identifier: BUSL-1.1

/// @title ViberStats
/// @author pdito
/// @notice Event stats for a vibes

pragma solidity ^0.8.18;

// Event types
enum EventType {
    INPERSON,
    REMOTE
}

// A Vibe (event)
struct VibeStats {
    string name;
    string shortName;
    string imageUrl;
    uint256 startDate;
    uint256 endDate;
    EventType eventType;
    address[] admins;
    uint256[] participantIds;
}
