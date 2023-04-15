// SPDX-License-Identifier: BUSL-1.1

/// @title Vibe
/// @author pdito

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./IVibe.sol";

contract Vibe is AccessControl, ReentrancyGuard, IVibe {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    uint256 private vibeCounter;
    mapping(uint256 => VibeStats) public vibes;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function createVibe(
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        EventType _eventType
    ) external onlyRole(MANAGER_ROLE) returns (uint256) {
        // Increment id
        vibeCounter++;

        // Store new vibe
        vibes[vibeCounter] = VibeStats({
            name: _name,
            shortName: _shortName,
            imageUrl: _imageUrl,
            startDate: _startDate,
            endDate: _endDate,
            eventType: _eventType,
            admins: new address[](0),
            participantIds: new uint256[](0)
        });

        vibes[vibeCounter].admins.push(msg.sender);

        emit VibeCreated(vibeCounter);

        return vibeCounter;
    }

    function updateVibe(
        address _sender,
        uint256 _vibeId,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        EventType _eventType
    ) external onlyRole(MANAGER_ROLE) {
        require(isAdmin(_vibeId, _sender), "NOT ADMIN");

        // Get vibe
        VibeStats storage vibe = vibes[_vibeId];
        vibe.name = _name;
        vibe.shortName = _shortName;
        vibe.imageUrl = _imageUrl;
        vibe.startDate = _startDate;
        vibe.endDate = _endDate;
        vibe.eventType = _eventType;
        emit VibeUpdated(_vibeId);
    }

    /// @notice Add an admin to a vibe
    function addAdmin(
        address _sender,
        uint256 _vibeId,
        address _newAdmin
    ) external onlyRole(MANAGER_ROLE) {
        require(isAdmin(_vibeId, _sender), "NOT ADMIN");
        vibes[_vibeId].admins.push(_newAdmin);
    }

    /// @notice Removes an admin from a vibe
    /// @dev TO DO post hackathon
    function removeAdmin(uint256 _vibeId, address _retiredAdmin) external {}

    /// @notice Check if user is admin of a vibe
    function isAdmin(
        uint256 _vibeId,
        address _user
    ) internal view returns (bool) {
        VibeStats memory vibe = vibes[_vibeId];
        for (uint256 i = 0; i < vibe.admins.length; i++) {
            if (vibe.admins[i] == _user) {
                return true;
            }
        }
        return false;
    }
}
