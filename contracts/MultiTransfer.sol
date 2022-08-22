// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiTransfer is Ownable {
    constructor() {}

    function multiTransfer(
        address _token,
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) public onlyOwner {
        require(
            _recipients.length == _amounts.length,
            "MultipleTransfer: invalid input"
        );
        IERC20 token = IERC20(_token);

        for (uint256 i = 0; i < _recipients.length; i++) {
            token.transferFrom(msg.sender, _recipients[i], _amounts[i]);
        }
    }

    function withdraw(address _token) public onlyOwner {
        IERC20 token = IERC20(_token);
        uint256 amount = token.balanceOf(address(this));

        token.transfer(msg.sender, amount);
    }

    function getBalance(address _token) public view returns (uint256) {
        IERC20 token = IERC20(_token);
        return token.balanceOf(address(this));
    }

    receive() external payable {
        revert();
    }
}
