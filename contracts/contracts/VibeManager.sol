// SPDX-License-Identifier: BUSL-1.1

/// @title VibeManager
/// @author pdito

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./IVibe.sol";
import "./IViber.sol";
import "./IVibeManager.sol";
import "./Models/VibeeStats.sol";
import "./Models/ViberStats.sol";
import "./Models/VibeStats.sol";

contract VibeManager is AccessControl, ReentrancyGuard, IVibeManager {
    IVibe public vibeContract;
    IViber public viberContract;

    /// @notice Contract Constructor
    constructor(address _vibe, address _viber) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        vibeContract = IVibe(_vibe);
        viberContract = IViber(_viber);
    }

    function createVibe(
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        EventType _eventType
    ) external returns (uint256 vibeId) {
        vibeId = vibeContract.createVibe(
            _name,
            _shortName,
            _imageUrl,
            _startDate,
            _endDate,
            _eventType
        );
    }

    function updateVibe(
        uint256 _vibeId,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        EventType _eventType
    ) external {
        vibeContract.updateVibe(
            msg.sender,
            _vibeId,
            _name,
            _shortName,
            _imageUrl,
            _startDate,
            _endDate,
            _eventType
        );
    }

    function joinVibe(uint256 _vibeId, uint256 _viberId) external {}

    function leaveVibe(uint256 _vibeId, uint256 _viberId) external {}

    function voteVibe(uint256 _voterId, uint256 _voteeId) external {}

    function getOrMintViber(
        address _address
    ) external returns (ViberStats memory) {}
}
