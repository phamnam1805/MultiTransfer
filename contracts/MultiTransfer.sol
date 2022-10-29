// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultiTransfer {
    constructor() {}

    function multiTransfer(
        address _token,
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) public {
        require(
            _recipients.length == _amounts.length,
            "MultiTransfer: invalid input"
        );
        IERC20 token = IERC20(_token);

        for (uint256 i = 0; i < _recipients.length; i++) {
            token.transferFrom(msg.sender, _recipients[i], _amounts[i]);
        }
    }

    receive() external payable {
        revert();
    }

}
