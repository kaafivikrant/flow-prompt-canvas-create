
import { NodeDefinition } from '../types/NodeDefinition';

/**
 * Banking domain node definitions based on PRD requirements
 */
export const bankingNodes: NodeDefinition[] = 
[
  {
    nodeName: 'Amend Anticipation',
    description: 'For transaction vault use cases, this block records the credit anticipation to the new payment contract amount when the amend payment contract is received.',
    category: 'anticipation',
    version: '1.0',
    config: {
      endpoint: '/amend-anticipation',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Amend party',
    description: 'Amends party details like beneficiary account amendments, payment preferences, party address.',
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/amend-party',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'anticipation vault',
    description: 'For transaction vault use cases, this block records the credit anticipation when a payment contract is received.',
    category: 'anticipation',
    version: '1.0',
    config: {
      endpoint: '/anticipation-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'End Block',
    description: undefined,
    category: 'response',
    version: '1.0',
    config: {
      endpoint: '/end-block',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Offboard party',
    description: 'To offboard a party',
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/offboard-party',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Onboard party via XCRO',
    description: 'To onboard a party',
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/onboard-party-via-xcro',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Create Reconcile vault',
    description: 'To reconcile the credit amount against the anticipated fund inflow and update the vault balance',
    category: 'reconciliation',
    version: '1.0',
    config: {
      endpoint: '/create-reconcile-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Register Apportion',
    description: 'To register the "apportioned" amount from parent vault to child vault during vault movements',
    category: 'reconciliation',
    version: '1.0',
    config: {
      endpoint: '/register-apportion',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Schedule payment',
    description: "Invokes XCRO's transaction API to schedule payments in XCRO for immediate/scheduled release types.",
    category: 'payment',
    version: '1.0',
    config: {
      endpoint: '/schedule-payment',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Success Block',
    description: undefined,
    category: 'response',
    version: '1.0',
    config: {
      endpoint: '/success-block',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Create vault Transaction',
    description: 'Creates deposit/withdraw transactions in a vault',
    category: 'transaction',
    version: '1.0',
    config: {
      endpoint: '/create-vault-transaction',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Custom Amend party',
    description: 'All "custom" blocks are part of V3. So show the respective "custom" blocks for drag and drop.',
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/custom-amend-party',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Custom Offboard party',
    description: 'All "custom" blocks are part of V3. So show the respective "custom" blocks for drag and drop.',
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/custom-offboard-party',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'Custom Onboard party via XCRO',
    description: 'All "custom" blocks are part of V3. So show the respective "custom" blocks for drag and drop.',
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/custom-onboard-party-via-xcro',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'PAYOUT-CALCULATOR',
    description: 'For Split Pay calculation as per splitpay profile setup',
    category: 'payment',
    version: '1.0',
    config: {
      endpoint: '/payout-calculator',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'CUSTOM SCHEDULE PAYMENT',
    description: 'All "custom" blocks are part of V3. So show the respective "custom" blocks for drag and drop.',
    category: 'payment',
    version: '1.0',
    config: {
      endpoint: '/custom-schedule-payment',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'CUSTOM-RECOGNIZE-VAULT',
    description: 'All "custom" blocks are part of V3. So show the respective "custom" blocks for drag and drop.',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/custom-recognize-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'CUSTOM-CREATE-VAULT',
    description: 'All "custom" blocks are part of V3. So show the respective "custom" blocks for drag and drop. This block is used for Pure VaaS use cases (like RWP use case) where VA is not applicable for the vault.',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/custom-create-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'AMEND-VAULT',
    description: 'To amend the vault details like Tags and limits',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/amend-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'AMEND-VAULT-STATUS',
    description: 'To amend the vault status (Ex: Inactive to Active and viceversa)',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/amend-vault-status',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'DELETE-VAULT',
    description: 'To delete the vault',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/delete-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'VAULT-ACCOUNT-LINK',
    description: 'To link the vault with a VA',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/vault-account-link',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'CUSTOM-CREATE-VAULT-RCMS',
    description: 'This block is used when VA number is passed in the API. This will include validations in VA tables while creating the vault.',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/custom-create-vault-rcms',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'RECOGNIZE-VAULT-VIA-FILTER',
    description: 'To recognise vault via filters passed in the GET vault API like vault id etc',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/recognize-vault-via-filter',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'ACCOUNT-FETCH',
    description: 'To fetch the VA linked to the specific vault.',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/account-fetch',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'DEBIT-ANTICIPATION-VAULT',
    description: "To record the debit anticipation amount in the vault upon invoking XCRO's schedule payment API",
    category: 'anticipation',
    version: '1.0',
    config: {
      endpoint: '/debit-anticipation-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'RECONCILE-DEBIT-VAULT',
    description: 'To reconcile the debit anticipation against the actual debit when debit webhook is received from XCRO. XCRO sends the debit webhook when Bansta is received. vault balances are updated after reconciliation.',
    category: 'reconciliation',
    version: '1.0',
    config: {
      endpoint: '/reconcile-debit-vault',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'DELETE-DEBIT-ANTICIPATION',
    description: 'To delete the debit anticipation in the vault when the scheduled payment payment in XCRO is cancelled.',
    category: 'anticipation',
    version: '1.0',
    config: {
      endpoint: '/delete-debit-anticipation',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'HOLD-XCRO-TRANSACTIONS',
    description: `Invokes XCRO's transaction status change API to put a scheduled transaction to "Hold" (in scenarios like vault inavtive)`,
    category: 'transaction',
    version: '1.0',
    config: {
      endpoint: '/hold-xcro-transactions',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'RECONCILE-BLOCK-RESPONSE',
    description: 'To capture the details like vault id, tree id etc that is required to be sent in the API response to the client after the block flow sequence: Recognise vault -> Create vault transaction -> Reconcile vault.\n' +
      "(Because details like vault id, tree id etc are part of Recognise vault and  Create vault transaction blocks and not part of 'reconsile vault' block. So this block reconstructs the responses of previous block to send to client's API response).",
    category: 'reconciliation',
    version: '1.0',
    config: {
      endpoint: '/reconcile-block-response',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'RECOGNIZE-VAULT-VIA-MAPPING',
    description: "Similar to the block 'RECOGNIZE-VAULT-VIA-FILTER'. Check with Harsh on how this block is different from the other one. Understand which existing client is using what",
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/recognize-vault-via-mapping',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'CREATE-VAULT-WITHOUT-ACCOUNT',
    description: 'Creates a vault without linking the VA for it.',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/create-vault-without-account',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'RECOGNIZE-VAULT-ID-VIA-FILTERS',
    description: "Similar to the block 'RECOGNIZE-VAULT-VIA-FILTER'. Check with Harsh on how this block is different from the other one. Understand which existing client is using what",
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/recognize-vault-id-via-filters',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'ROLLBACK-PARTY',
    description: `Rollback of "create party" block - this will invoke XCRO's party rollback API`,
    category: 'party',
    version: '1.0',
    config: {
      endpoint: '/rollback-party',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'RECOGNIZE-VAULT-ROLLBACK',
    description: 'Rollback of "recognise vault" block',
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/recognize-vault-rollback',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'ATTACH-ACCOUNT',
    description: "Invokes XCRO's attach API to attach VA for a party when a party vault is created",
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/attach-account',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  },
  {
    nodeName: 'DETACH-ACCOUNT',
    description: "Invokes XCRO's detatch API to detatch VA for a party when a party is offboarded/ party vault is closed",
    category: 'vault',
    version: '1.0',
    config: {
      endpoint: '/detach-account',
      method: 'POST',
      validation: [
        'contract_id',
        'anticipation_amount'
      ]
    },
    mapping: {
      request: {
        contract_id: 'input.contract_id',
        anticipation_amount: 'input.anticipation_amount'
      },
      response: {
        amended_contract_id: 'output.amended_contract_id'
      }
    },
    policy: null
  }
  ];

// Maps node definition names to visual node types
export const nodeTypeMapping: Record<string, string> = {
  "Initiate Transaction": "start",
  "Validate KYC": "verification",
  "Check Wallet Balance": "api",
  "Authorize payment": "payment",
  "Send Notification": "notification",
  "Execute payment": "payment",
  "Create Ledger Entry": "api",
  "Generate Report": "api",
  "Collect Feedback": "api"
};

// Helper function to get node definition by name
export const getNodeDefinitionByName = (name: string): NodeDefinition | undefined => {
  return bankingNodes.find(node => node.nodeName === name);
};

// Helper function to get visual node type from definition name
export const getNodeType = (definitionName: string): string => {
  return nodeTypeMapping[definitionName] || 'api';
};
