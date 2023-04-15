// SPDX-License-Identifier: BUSL-1.1

/// @title Viber
/// @author pdito

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Models/ViberStats.sol";

import "./IViber.sol";

contract Viber is ERC721, ERC721Enumerable, AccessControl, IViber {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    mapping(address => uint256) addressToId;
    mapping(uint256 => ViberStats) public vibers;

    constructor() ERC721("Vibe Viber", "VIBER") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function mintViber() external onlyRole(MANAGER_ROLE) returns (uint256) {}

    /// @notice Upgrades an existing profile
    function upgradeViber(
        uint256 _tokenId,
        uint256 _type
    ) external returns (uint256) {
        require(1 == 2, "STOP UPGRAFE");
    }

    function getViberForAddress(
        address _address
    ) external view returns (ViberStats memory) {
        return vibers[addressToId[_address]];
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        // TODO make sure new address doesnt have viber already
    }
}
