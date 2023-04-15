// SPDX-License-Identifier: BUSL-1.1

/// @title ViberStats
/// @author pdito
/// @notice Profile stats for a viber

pragma solidity ^0.8.18;

struct ViberStats {
    uint256 id;
    string name;
    uint256[] vibes;
    uint256[] adminVibes;
}
