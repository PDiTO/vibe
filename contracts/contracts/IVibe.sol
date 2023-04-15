// SPDX-License-Identifier: BUSL-1.1

/// @title IVibe
/// @author pdito
/// @notice The main event contract for vibe

pragma solidity ^0.8.18;

import "./Models/VibeStats.sol";
import "./Models/VibeeStats.sol";

interface IVibe {
    /// @notice Events
    event VibeCreated(uint256 indexed vibeId);
    event VibeUpdated(uint256 indexed vibeId);
    event ParticipantAdded(uint256 indexed vibeId, address indexed participant);
    event ParticipantRemoved(
        uint256 indexed vibeId,
        address indexed participant
    );

    /// @notice Creates a new vibe
    function createVibe(
        address _creator,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        string memory _eventType
    ) external returns (uint256);

    /// @notice Updates an existing vibe
    function updateVibe(
        address _sender,
        uint256 _vibeId,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        string memory _eventType
    ) external;

    /// @notice Joins a vibe
    function joinVibe(
        address _user,
        uint256 _viberId,
        uint256 _vibeId
    ) external;

    /// @notice Adds an admin to a vibe
    function addAdmin(
        address _sender,
        uint256 _vibeId,
        address _newAdmin
    ) external;

    function getVibes(
        uint256[] memory _vibeIds
    ) external view returns (VibeStats[] memory);

    function getVibeAndVibees(
        uint256 _vibeId
    ) external returns (VibeStats memory, VibeeStats[] memory);
}
