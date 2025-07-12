use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{Transaction}

pub type UDI {
  id: ByteArray,
}

pub type BiometricData {
  data_hash: ByteArray,
  owner: VerificationKeyHash,
  shared_with: Option<VerificationKeyHash>,
}

pub type Action {
  Store
  Retrieve
  Share(VerificationKeyHash)
}

pub type Redeemer {
  action: Action,
  msg: ByteArray,
}

validator verisafe {
  spend(datum: Option<BiometricData>, redeemer: Redeemer, _, self: Transaction) {
    expect Some(BiometricData { data_hash, owner, shared_with }) = datum

    let is_owner = list.has(self.extra_signatories, owner)
    let is_authorized =
      when shared_with is {
        Some(shared_vkh) -> list.has(self.extra_signatories, shared_vkh)
        None -> False
      }
    let is_valid_signer = or {
        is_owner,
        is_authorized,
      }

    when redeemer.action is {
      Store -> {
        let valid_message = redeemer.msg == "store_data"
        and {
          is_owner,
          valid_message,
        }
      }
      Retrieve -> {
        let valid_message = redeemer.msg == "retrieve_data"
        and {
          is_valid_signer,
          valid_message,
        }
      }
      Share(new_vkh) -> {
        let valid_message = redeemer.msg == "share_data"
        and {
          is_owner,
          valid_message,
        }
      }
    }
  }

  else(_) {
    fail
  }
}
