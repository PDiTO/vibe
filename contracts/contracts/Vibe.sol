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
    mapping(uint256 => mapping(uint256 => VibeeStats)) public vibees;
    mapping(uint256 => mapping(address => bool)) public whitelist;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function createVibe(
        address _creator,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        string memory _eventType
    ) external onlyRole(MANAGER_ROLE) returns (uint256) {
        // Increment id
        vibeCounter++;

        // Store new vibe
        vibes[vibeCounter] = VibeStats({
            id: vibeCounter,
            name: _name,
            shortName: _shortName,
            imageUrl: _imageUrl,
            startDate: _startDate,
            endDate: _endDate,
            eventType: _eventType,
            admins: new address[](0),
            participantIds: new uint256[](0),
            live: true
        });

        vibes[vibeCounter].admins.push(_creator);

        emit VibeCreated(vibeCounter);

        return vibeCounter;
    }

    function addToWhitelist(
        address _sender,
        uint256 _vibeId,
        address[] memory _users
    ) external {
        require(isAdmin(_vibeId, _sender), "NOTADMIN");
        uint256 length = _users.length;
        for (uint256 i = 0; i < length; i++) {
            whitelist[_vibeId][_users[i]] = true;
        }
    }

    function removeFromWhitelist(
        uint256 _vibeId,
        address[] memory _users
    ) external {}

    function updateVibe(
        address _sender,
        uint256 _vibeId,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        string memory _eventType
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

    /// @notice Joins a vibe
    function joinVibe(
        address _user,
        uint256 _viberId,
        uint256 _vibeId
    ) external onlyRole(MANAGER_ROLE) {
        //Require _user whitelisted
        VibeStats memory vibe = vibes[_vibeId];
        // require(vibe.live, "XVIBE");
        vibes[_vibeId].participantIds.push(_viberId);
        vibees[_vibeId][_viberId] = VibeeStats({
            vibe: _vibeId,
            viber: _viberId,
            exists: true,
            achievements: 0,
            status: ""
        });
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

    /// @notice Returns vibes of passed ids
    function getVibes(
        uint256[] memory _vibeIds
    ) external view returns (VibeStats[] memory) {
        uint256 length = _vibeIds.length;
        VibeStats[] memory fetchedVibes = new VibeStats[](length);

        for (uint256 i = 0; i < length; i++) {
            fetchedVibes[i] = vibes[_vibeIds[i]];
        }

        return fetchedVibes;
    }

    function getVibeAndVibees(
        uint256 _vibeId
    ) external view returns (VibeStats memory, VibeeStats[] memory) {
        VibeStats memory vibe = vibes[_vibeId];
        uint256 participantCount = vibe.participantIds.length;
        VibeeStats[] memory fetchedVibees = new VibeeStats[](participantCount);

        for (uint256 i = 0; i < participantCount; i++) {
            fetchedVibees[i] = vibees[_vibeId][vibe.participantIds[i]];
        }

        return (vibe, fetchedVibees);
    }

    fallback() external payable {}

    receive() external payable {}
}
