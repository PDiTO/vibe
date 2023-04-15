// SPDX-License-Identifier: BUSL-1.1

/// @title Viber
/// @author pdito

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IViber.sol";

contract Viber is ERC721, ERC721Enumerable, AccessControl, IViber {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    uint256 public tokensMinted;
    mapping(uint256 => ViberStats) public vibers;
    mapping(address => uint256) addressToId;

    constructor() ERC721("Vibe Viber", "VIBER") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function mint(
        address _address,
        string calldata _name
    ) external onlyRole(MANAGER_ROLE) returns (uint256) {
        require(balanceOf(_address) == 0, "ALREADY MINTED");
        tokensMinted++;
        vibers[tokensMinted] = ViberStats({
            id: tokensMinted,
            name: _name,
            vibes: new uint256[](0),
            adminVibes: new uint256[](0)
        });
        _safeMint(_address, tokensMinted);
        addressToId[_address] = tokensMinted;
        return tokensMinted;
    }

    /// @notice Adds vibe to users admin
    function addAdminVibe(
        address _user,
        uint256 _vibeId
    ) external onlyRole(MANAGER_ROLE) {
        vibers[addressToId[_user]].adminVibes.push(_vibeId);
    }

    /// @notice Joins a vibe
    function joinVibe(
        uint256 _viberId,
        uint256 _vibeId
    ) external onlyRole(MANAGER_ROLE) {
        vibers[_viberId].vibes.push(_vibeId);
    }

    /// @notice Returns a specific viber for address
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
        override(IERC165, ERC721, ERC721Enumerable, AccessControl)
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

    fallback() external payable {}

    receive() external payable {}
}
