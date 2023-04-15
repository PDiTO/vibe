// SPDX-License-Identifier: BUSL-1.1

/// @title IViber
/// @author pdito
/// @notice The profile contract for a vibe

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Models/ViberStats.sol";

interface IViber is IERC721 {
    function getViberForAddress(
        address _address
    ) external view returns (ViberStats memory);

    function mint(
        address _address,
        string calldata _name
    ) external returns (uint256);

    function joinVibe(uint256 _viberId, uint256 _vibeId) external;

    function addAdminVibe(address _user, uint256 _vibeId) external;
}
