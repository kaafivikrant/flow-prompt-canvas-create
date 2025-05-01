
import { NodeDefinition } from '../types/NodeDefinition';

/**
 * Banking domain node definitions based on PRD requirements
 */
export const bankingNodes: NodeDefinition[] = [
  {
    nodeName: "Initiate Transaction",
    description: "Starts a transaction and generates a transaction ID",
    category: "transaction",
    version: "1.0",
    config: {
      endpoint: "/initiate-transaction",
      method: "POST",
      validation: ["user_id", "amount"]
    },
    mapping: {
      request: {
        user_id: "input.user_id",
        amount: "input.amount"
      },
      response: {
        transaction_id: "output.transaction_id"
      }
    },
    policy: {
      allowedNextNodes: ["Validate KYC", "Check Wallet Balance"],
      conditions: ["user_verified == true"]
    }
  },
  {
    nodeName: "Validate KYC",
    description: "Verifies user identity using KYC service",
    category: "verification",
    version: "1.0",
    config: {
      endpoint: "/validate-kyc",
      method: "POST",
      validation: ["user_details"]
    },
    mapping: {
      request: {
        user_details: "input.user_details"
      },
      response: {
        kyc_status: "output.kyc_status"
      }
    },
    policy: {
      allowedNextNodes: ["Check Wallet Balance", "Authorize Payment"],
      conditions: []
    }
  },
  {
    nodeName: "Check Wallet Balance",
    description: "Checks the balance of the user's wallet",
    category: "transaction",
    version: "1.0",
    config: {
      endpoint: "/wallet/balance",
      method: "GET",
      validation: ["account_id"]
    },
    mapping: {
      request: {
        account_id: "input.account_id"
      },
      response: {
        balance: "output.balance"
      }
    },
    policy: {
      allowedNextNodes: ["Authorize Payment", "Send Notification"],
      conditions: []
    }
  },
  {
    nodeName: "Authorize Payment",
    description: "Confirms and authorizes payment request",
    category: "payment",
    version: "1.0",
    config: {
      endpoint: "/authorize-payment",
      method: "POST",
      validation: ["credentials", "amount"]
    },
    mapping: {
      request: {
        credentials: "input.credentials",
        amount: "input.amount"
      },
      response: {
        authorization_token: "output.authorization_token"
      }
    },
    policy: {
      allowedNextNodes: ["Execute Payment", "Create Ledger Entry"],
      conditions: ["amount <= balance"]
    }
  },
  {
    nodeName: "Send Notification",
    description: "Sends SMS/Email notifications to the user",
    category: "notification",
    version: "1.0",
    config: {
      endpoint: "/send-notification",
      method: "POST",
      validation: ["message", "contact"]
    },
    mapping: {
      request: {
        message: "input.message",
        contact: "input.contact"
      },
      response: {
        notification_status: "output.notification_status"
      }
    },
    policy: {
      allowedNextNodes: ["Generate Report", "Collect Feedback"],
      conditions: []
    }
  }
];

// Maps node definition names to visual node types
export const nodeTypeMapping: Record<string, string> = {
  "Initiate Transaction": "start",
  "Validate KYC": "verification",
  "Check Wallet Balance": "api",
  "Authorize Payment": "payment",
  "Send Notification": "notification",
  "Execute Payment": "payment",
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
