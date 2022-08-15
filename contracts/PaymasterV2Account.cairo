# SPDX-License-Identifier: MIT
# Paymaster Contracts for Cairo v0.3.1
# Reference to: OpenZeppelin Contracts for Cairo v0.3.1 (account/presets/Account.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin, BitwiseBuiltin
from starkware.cairo.common.alloc import alloc
from openzeppelin.account.library import Account, AccountCallArray, Call
from openzeppelin.introspection.erc165.library import ERC165
from openzeppelin.utils.constants.library import IACCOUNT_ID

@contract_interface
namespace IAccount:

    #
    # Getters
    #

    func get_nonce() -> (res : felt):
    end

    #
    # Business logic
    #

    func is_valid_signature(
            hash: felt,
            signature_len: felt,
            signature: felt*
        ) -> (is_valid: felt):
    end

    func __execute__(
            call_array_len: felt,
            call_array: AccountCallArray*,
            calldata_len: felt,
            calldata: felt*,
            nonce: felt
        ) -> (response_len: felt, response: felt*):
    end
end

#
# Constructor
#

@constructor
func constructor{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }():
    # Account.initializer(public_key)
    ERC165.register_interface(IACCOUNT_ID)
    return ()
end

#
# Getters
#

@view
func get_public_key{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (res: felt):
    let (res) = Account.get_public_key()
    return (res=res)
end

@view
func get_nonce{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (res: felt):
    let (res) = Account.get_nonce()
    return (res=res)
end

@view
func supportsInterface{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    } (interfaceId: felt) -> (success: felt):
    let (success) = ERC165.supports_interface(interfaceId)
    return (success)
end

#
# Setters
#

@external
func set_public_key{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(new_public_key: felt):
    Account.set_public_key(new_public_key)
    return ()
end

#
# Business logic
#

@view
func is_valid_signature{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr,
        ecdsa_ptr: SignatureBuiltin*
    }(
        hash: felt,
        signature_len: felt,
        signature: felt*
    ) -> (is_valid: felt):
    let (is_valid) = Account.is_valid_signature(hash, signature_len, signature)
    return (is_valid=is_valid)
end

@external
func __execute__{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr,
        ecdsa_ptr: SignatureBuiltin*,
        bitwise_ptr: BitwiseBuiltin*
    }(
        call_array_len: felt,
        call_array: AccountCallArray*,
        calldata_len: felt,
        calldata: felt*,
        nonce: felt
    ) -> (response_len: felt, response: felt*):
    alloc_locals

    # TODO: check nounce
    # TODO: paymaster signature

    # TMP: Convert `AccountCallArray` to 'Call'.
    let (calls : Call*) = alloc()
    Account._from_call_array_to_call(call_array_len, call_array, calldata, calls)
    let calls_len = call_array_len
    let new_call_array_len = call_array_len - 1
    let new_call_array = call_array + AccountCallArray.SIZE

    let (response_len, response) = IAccount.__execute__(
        contract_address = [calls].to,
        call_array_len = new_call_array_len,
        call_array = new_call_array,
        calldata_len = [calls+Call.SIZE].calldata_len,
        calldata = [calls+Call.SIZE].calldata,
        nonce = nonce
    )

    return (response_len=response_len, response=response)
end