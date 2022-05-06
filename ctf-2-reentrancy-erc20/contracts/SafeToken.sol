// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IERC20Receiver {
    function onERC721Received(address, address, uint256) external returns(bool);
}

contract SafeToken is ERC20 {
    using Address for address;

    constructor(uint256 initialSupply) ERC20("Safe", "SAFU") {
        _mint(msg.sender, initialSupply);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        address spender = tx.origin;
        uint256 currentAllowance = allowance(from, spender);
        require(currentAllowance >= amount, "ERC20: insufficient allowance");

        _transfer(from, to, amount);
        // if this is a contract, check that it knows its receiving ether
        _checkOnERC20Received(from, to, amount);
        unchecked {
            // update allowances
            _approve(from, spender, currentAllowance - amount);
        }
        
        return true;
    }

    function _checkOnERC20Received(address from, address to, uint256 amount) internal {
        if (to.isContract()) {
            require(IERC20Receiver(to).onERC721Received(from, to, amount));
        }
    }
}