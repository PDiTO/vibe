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
        string memory _eventType
    ) external returns (uint256 vibeId) {
        vibeId = vibeContract.createVibe(
            msg.sender,
            _name,
            _shortName,
            _imageUrl,
            _startDate,
            _endDate,
            _eventType
        );

        viberContract.addAdminVibe(msg.sender, vibeId);
    }

    function updateVibe(
        uint256 _vibeId,
        string memory _name,
        string memory _shortName,
        string memory _imageUrl,
        uint256 _startDate,
        uint256 _endDate,
        string memory _eventType
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

    function joinVibe(uint256 _viberId, uint256 _vibeId) external {
        // Add statement here to require whitelisted to join event
        viberContract.joinVibe(_viberId, _vibeId);
        vibeContract.joinVibe(msg.sender, _viberId, _vibeId);
    }

    function leaveVibe(uint256 _vibeId, uint256 _viberId) external {}

    function voteVibe(uint256 _voterId, uint256 _voteeId) external {}

    function mintViber(
        string calldata _name
    ) external returns (uint256 viberId) {
        viberId = viberContract.mint(msg.sender, _name);
    }

    function getVibeAndVibees(
        uint256 _vibeId
    ) external returns (VibeStats memory vibe, VibeeStats[] memory vibees) {
        (vibe, vibees) = vibeContract.getVibeAndVibees(_vibeId);
    }

    function getViberAndVibes(
        address _address
    )
        external
        view
        returns (
            ViberStats memory viber,
            VibeStats[] memory vibes,
            VibeStats[] memory adminVibes
        )
    {
        viber = viberContract.getViberForAddress(_address);
        vibes = vibeContract.getVibes(viber.vibes);
        adminVibes = vibeContract.getVibes(viber.adminVibes);
    }

    fallback() external payable {}

    receive() external payable {}
}
