// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultipleTransfer {
    function multipleTransfer(
        address _token,
        address[] memory _recipients,
        uint256[] memory _amounts
    ) public {
        require(
            _recipients.length == _amounts.length,
            "MultipleTransfer: invalid input"
        );
        IERC20 token = IERC20(_token);

        for (uint256 i = 0; i < _recipients.length; i++) {
            token.transferFrom(msg.sender, address(this), _amounts[i]);
            token.transfer(_recipients[i], _amounts[i]);
        }
    }
}
