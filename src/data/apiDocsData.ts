export interface ApiField {
  field: string;
  dataType: string;
  maxLength: string;
  description: string;
  type: 'M' | 'O' | 'CM';
}

export interface ApiEndpoint {
  id: string;
  title: string;
  method: 'POST' | 'GET';
  path: string;
  description: string;
  category: 'auth' | 'lookup' | 'rates' | 'transactions' | 'enquiry' | 'operations';
  requestFields: ApiField[];
  responseFields: ApiField[];
  sampleRequest: Record<string, any>;
  sampleResponse: Record<string, any>;
  edgeCaseResponses?: Array<{
    scenarioId: string;
    scenarioName: string;
    description: string;
    httpStatus: number;
    httpStatusText: string;
    responsePayload: Record<string, any>;
  }>;
}

export interface StatusCodeItem {
  slNo: number;
  categoryType: string;
  responseCode: string | number;
  description: string;
}

export interface NationalIdItem {
  code: string;
  description: string;
}

export const ACRONYMS = [
  { acronym: 'AN', description: 'Alpha Numeric' },
  { acronym: 'N', description: 'Numeric' },
  { acronym: 'D', description: 'Date (dd-mmm-yyyy)' },
  { acronym: 'F', description: 'Float' },
  { acronym: 'DT', description: 'Date & Time in UTC (ISO 8601)' },
  { acronym: 'CM', description: 'Conditional Mandatory' },
  { acronym: 'O', description: 'Optional' },
  { acronym: 'M', description: 'Mandatory' },
];

export const TECHNICAL_GUIDE = {
  uatUrl: '<TEST_URL>',
  liveUrl: '<PROD_URL>',
  sampleAgentCode: '<AGENT_CODE>',
  sampleSubAgentCode: '<SUB_AGENT_CODE>',
  sampleSecret: '<AGENT_SECRET>',
  authNote: 'All API calls (except Get Authorization Token) require the Bearer Token returned by get_token in the Authorization header. Generated tokens are valid for 5 minutes and single-use per request.',
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'get_token',
    title: '1. Get Authorization Token',
    method: 'POST',
    path: '/get_token',
    category: 'auth',
    description: 'Basic token method called before every API call to retrieve a single-use alphanumeric Bearer Token valid for 5 minutes.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'Password', dataType: 'AN', maxLength: '50', description: 'Secret password shared by SunnyRemit', type: 'M' },
      { field: 'DateStamp', dataType: 'DT', maxLength: '30', description: 'Date Time in UTC when request is sent', type: 'M' },
    ],
    responseFields: [
      { field: 'ResponseStatus.StatusCode', dataType: 'N', maxLength: '1', description: 'Response Status Code (1-Success, 0-Fail)', type: 'M' },
      { field: 'ResponseStatus.Message', dataType: 'AN', maxLength: '50', description: 'Description message of the request', type: 'O' },
      { field: 'Token', dataType: 'AN', maxLength: '100', description: 'Generated Bearer token valid for 5 minutes', type: 'M' },
    ],
    sampleRequest: {
      get_token: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        agent_secret: '<AGENT_SECRET>',
        date_stamp: '2026-07-30T14:00:00.000Z',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'GetTokenResponse',
        time_stamp: '2026-07-30T14:00:01.1759989+05:30',
        response_status: {
          status_code: 1,
          message: 'Token created successfully',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZ2VudENvZGUiOiJBR1gwMSJ9.BEARER_TOKEN_SAMPLE',
        },
      },
    },
    edgeCaseResponses: [
      {
        scenarioId: 'success',
        scenarioName: '✅ 200 OK — Token Generated Successfully',
        description: 'Valid credentials provided; token issued.',
        httpStatus: 200,
        httpStatusText: '200 OK',
        responsePayload: {
          accumexs: {
            type: 'GetTokenResponse',
            time_stamp: '2026-07-30T14:00:01.1759989+05:30',
            response_status: {
              status_code: 1,
              message: 'Token created successfully',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.BEARER_TOKEN_SAMPLE',
            },
          },
        },
      },
      {
        scenarioId: 'unauthorized',
        scenarioName: '🔒 401 Unauthorized — Authentication Failed',
        description: 'Invalid Agent Secret or Agent Code provided.',
        httpStatus: 401,
        httpStatusText: '401 Unauthorized',
        responsePayload: {
          error: 'Unauthorized',
          message: 'Invalid agent credentials or secret key provided.',
          status_code: 401,
        },
      },
      {
        scenarioId: 'bad_request',
        scenarioName: '⚠️ 400 Bad Request — Missing Parameters',
        description: 'DateStamp or AgentCode missing from request payload.',
        httpStatus: 400,
        httpStatusText: '400 Bad Request',
        responsePayload: {
          error: 'Bad Request',
          message: 'Missing mandatory field: agent_secret or date_stamp',
          status_code: 400,
        },
      },
    ],
  },
  {
    id: 'master_data',
    title: '2. Get Master Data',
    method: 'POST',
    path: '/master_data',
    category: 'lookup',
    description: 'Retrieves default metadata including available currencies, active remittance service modes, transfer purposes, sources of income, and remitter-beneficiary relationship types.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Authorization token received from getToken', type: 'M' },
      { field: 'CountryCode', dataType: 'AN', maxLength: '2', description: 'ISO 2-letter country code. Omit to retrieve full global list.', type: 'O' },
    ],
    responseFields: [
      { field: 'CurrencyList', dataType: 'AN', maxLength: 'Array', description: 'Supported currency codes and names per country', type: 'M' },
      { field: 'ServiceList', dataType: 'AN', maxLength: 'Array', description: 'Available service modes (e.g. CASH PICKUP, MPESA)', type: 'M' },
      { field: 'PurposeList', dataType: 'AN', maxLength: 'Array', description: 'Valid transfer purpose codes (e.g. EDU, FAM)', type: 'M' },
      { field: 'SourceOfIncomeList', dataType: 'AN', maxLength: 'Array', description: 'Valid source of income codes (e.g. SAL, BUS)', type: 'M' },
      { field: 'RemitterRelationList', dataType: 'AN', maxLength: 'Array', description: 'Relationship categories between remitter and receiver', type: 'M' },
    ],
    sampleRequest: {
      master_data: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        country_code: 'KE',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'MasterDataResponse',
        time_stamp: '2026-07-30T14:05:00.1516696+05:30',
        response_status: {
          status_code: 1,
          message: 'Master data retrieved successfully',
          data: {
            currency_list: [{ country_code: 'KE', currency_code: 'KES', currency_name: 'Kenyan Shilling' }],
            service_list: [{ service_id: '12670', service_name: 'MPESA', country_code: 'KE' }, { service_id: '12680', service_name: 'CASH PICKUP', country_code: 'KE' }],
            purpose_list: [{ purpose_code: 'EDU', purpose_name: 'Education' }, { purpose_code: 'FAM', purpose_name: 'Family Maintenance' }],
            source_of_income_list: [{ source_code: 'SAL', source_name: 'Salary' }],
            remitter_relation_list: [{ relation_code: 'FAM', relation_name: 'Family' }],
          },
        },
      },
    },
  },
  {
    id: 'bank_list',
    title: '3. Get Beneficiary Bank List',
    method: 'POST',
    path: '/bank_list',
    category: 'lookup',
    description: 'Lists supported payout beneficiary banks available for a specific destination country and service mode.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Token received from getToken', type: 'M' },
      { field: 'CountryCode', dataType: 'AN', maxLength: '3', description: 'ISO Country Code to filter bank list', type: 'M' },
      { field: 'ServiceID', dataType: 'AN', maxLength: '10', description: 'Service ID received from Master Data', type: 'M' },
    ],
    responseFields: [
      { field: 'BankCode', dataType: 'AN', maxLength: '10', description: 'Unique Bank Code to supply in transaction API', type: 'M' },
      { field: 'BankName', dataType: 'AN', maxLength: '100', description: 'Full name of the beneficiary bank', type: 'M' },
      { field: 'BankAddress', dataType: 'AN', maxLength: '100', description: 'Headquarters or registered address of bank', type: 'O' },
      { field: 'IsBranchAvailable', dataType: 'N', maxLength: '1', description: '1 if branch selection is required; 0 if bank-level payout', type: 'M' },
    ],
    sampleRequest: {
      bank_list: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        country_code: 'KE',
        service_id: 12680,
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'BankListResponse',
        time_stamp: '2026-07-30T14:10:00.4738828+05:30',
        response_status: {
          status_code: 1,
          message: 'Beneficiary bank list retrieved successfully',
          data: [
            { bank_code: 'BNK01', bank_name: 'Equity Bank Kenya', bank_address: 'Nairobi HQ', is_branch_available: 1 },
            { bank_code: 'BNK02', bank_name: 'KCB Bank Kenya', bank_address: 'Nairobi', is_branch_available: 0 },
          ],
        },
      },
    },
  },
  {
    id: 'branch_list',
    title: '4. Get Beneficiary Branch List',
    method: 'POST',
    path: '/branch_list',
    category: 'lookup',
    description: 'Lists active branch locations for a specific bank when IsBranchAvailable equals 1.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer token from getToken', type: 'M' },
      { field: 'ServiceID', dataType: 'AN', maxLength: '10', description: 'Service ID received from Master Data', type: 'M' },
      { field: 'BankCode', dataType: 'AN', maxLength: '10', description: 'Target Bank Code', type: 'M' },
      { field: 'BranchRouteCode', dataType: 'AN', maxLength: '40', description: 'Routing code (e.g. IFSC/SWIFT/Branch Code) to search specific branch', type: 'O' },
    ],
    responseFields: [
      { field: 'BranchCode', dataType: 'AN', maxLength: '10', description: 'Specific code for the bank branch', type: 'M' },
      { field: 'BranchName', dataType: 'AN', maxLength: '100', description: 'Name of branch location', type: 'M' },
      { field: 'BranchRouteCode', dataType: 'AN', maxLength: '40', description: 'Branch routing code', type: 'M' },
      { field: 'BranchAddress', dataType: 'AN', maxLength: '100', description: 'Physical street address of branch', type: 'O' },
    ],
    sampleRequest: {
      branch_list: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        service_id: 12680,
        bank_code: 'BNK01',
        branch_route_code: 'EQBL001',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'BranchListResponse',
        time_stamp: '2026-07-30T14:15:00.0978618+05:30',
        response_status: {
          status_code: 1,
          message: 'Beneficiary branch list retrieved successfully',
          data: [
            {
              branch_code: '065001',
              branch_name: 'Nairobi Central Branch',
              branch_route_code: 'EQBL001',
              branch_address: 'Kenyatta Avenue, Nairobi',
              branch_contact: '+254-20-1234567',
            },
          ],
        },
      },
    },
  },
  {
    id: 'get_rate_and_charge',
    title: '5. Get Rate and Charge',
    method: 'POST',
    path: '/get_rate_and_charge',
    category: 'rates',
    description: 'Calculates foreign exchange conversion rates, settlement totals, and partner transaction fees based on FC (Foreign Currency destination) or LC (Local Currency source) input amounts.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Authorization token', type: 'M' },
      { field: 'CurrencyCode', dataType: 'AN', maxLength: '3', description: 'Destination payout currency code (e.g. KES, USD)', type: 'M' },
      { field: 'ServiceCode', dataType: 'AN', maxLength: '10', description: 'Service Code received from Master Data', type: 'M' },
      { field: 'Type', dataType: 'AN', maxLength: '2', description: 'Calculation type: FC (Destination Amount) or LC (Local Amount). Default is FC.', type: 'M' },
      { field: 'Amount', dataType: 'N', maxLength: '14', description: 'Monetary value to calculate rate & fee against', type: 'M' },
    ],
    responseFields: [
      { field: 'PayoutCurrency', dataType: 'AN', maxLength: '3', description: 'Payout currency delivered to beneficiary', type: 'M' },
      { field: 'PayInCurrency', dataType: 'AN', maxLength: '3', description: 'Pay-in settlement currency collected from sender', type: 'M' },
      { field: 'RateType', dataType: 'AN', maxLength: '1', description: 'Exchange rate operation type (* or /)', type: 'M' },
      { field: 'Rate', dataType: 'F', maxLength: '14,8', description: 'Exact conversion rate applied', type: 'M' },
      { field: 'Charge', dataType: 'F', maxLength: '14,3', description: 'Transaction commission fee debited to partner', type: 'O' },
      { field: 'ChargeCurrency', dataType: 'AN', maxLength: '3', description: 'Currency unit of transaction fee', type: 'O' },
    ],
    sampleRequest: {
      get_rate_and_charge: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        currency_code: 'KES',
        service_id: '12670',
        type: 'FC',
        amount: 1000,
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'RateAndChargeResponse',
        time_stamp: '2026-07-30T14:20:00.8066484+05:30',
        response_status: {
          status_code: 1,
          message: 'Rate and Charge retrieved successfully',
          data: {
            payout_currency: 'KES',
            pay_in_currency: 'USD',
            rate_type: '*',
            rate: '129.15000000',
            charge: '2.50',
            charge_currency: 'USD',
          },
        },
      },
    },
    edgeCaseResponses: [
      {
        scenarioId: 'success',
        scenarioName: '✅ 200 OK — Rate & Charge Calculated',
        description: 'Rate calculation succeeded.',
        httpStatus: 200,
        httpStatusText: '200 OK',
        responsePayload: {
          accumexs: {
            type: 'RateAndChargeResponse',
            time_stamp: '2026-07-30T14:20:00.8066484+05:30',
            response_status: {
              status_code: 1,
              message: 'Rate and Charge retrieved successfully',
              data: {
                payout_currency: 'KES',
                pay_in_currency: 'USD',
                rate_type: '*',
                rate: '129.15000000',
                charge: '2.50',
                charge_currency: 'USD',
              },
            },
          },
        },
      },
      {
        scenarioId: 'limit_exceeded',
        scenarioName: '⚠️ 400 Bad Request — FC Amount Limit Exceeded',
        description: 'Requested remittance amount exceeds single transfer ceiling.',
        httpStatus: 400,
        httpStatusText: '400 Bad Request',
        responsePayload: {
          error: 'Bad Request',
          message: 'FC Amount Limit Exceeded for current service mode.',
          status_code: 28,
        },
      },
    ],
  },
  {
    id: 'transaction_request',
    title: '6. Send Transaction',
    method: 'POST',
    path: '/transaction_request',
    category: 'transactions',
    description: 'Posts a new outbound remittance transaction (supports Mobile Money like MPESA, Bank Deposits, or Branch Cash Pickup).',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Authorization token', type: 'M' },
      { field: 'CountryCode', dataType: 'AN', maxLength: '3', description: 'Destination country ISO code', type: 'M' },
      { field: 'SourceCountryCode', dataType: 'AN', maxLength: '3', description: 'Originating country ISO code', type: 'M' },
      { field: 'ServiceID', dataType: 'AN', maxLength: '10', description: 'Target Service ID (e.g. 12670 MPESA, 12680 BranchPayout)', type: 'M' },
      { field: 'PartnerReferenceNumber', dataType: 'AN', maxLength: '30', description: 'Unique agent reference number for idempotency', type: 'M' },
      { field: 'CustomerFirstName', dataType: 'AN', maxLength: '50', description: 'Sender First Name', type: 'M' },
      { field: 'CustomerLastName', dataType: 'AN', maxLength: '50', description: 'Sender Last Name', type: 'M' },
      { field: 'CustomerContact', dataType: 'AN', maxLength: '20', description: 'Sender Phone Number', type: 'M' },
      { field: 'CustomerIdentity', dataType: 'AN', maxLength: '3', description: 'Sender ID document type code (See National ID List)', type: 'M' },
      { field: 'CustomerIdentityNo', dataType: 'AN', maxLength: '30', description: 'Sender Passport / ID document number', type: 'M' },
      { field: 'BeneficiaryFirstName', dataType: 'AN', maxLength: '50', description: 'Receiver First Name', type: 'M' },
      { field: 'BeneficiaryLastName', dataType: 'AN', maxLength: '50', description: 'Receiver Last Name', type: 'M' },
      { field: 'RecevingCurrencyCode', dataType: 'AN', maxLength: '3', description: 'Currency code receiver receives', type: 'M' },
      { field: 'ReceivingAmount', dataType: 'F', maxLength: '14,3', description: 'Amount receiver gets', type: 'M' },
      { field: 'SendingCurrencyCode', dataType: 'AN', maxLength: '3', description: 'Currency code sender paid in', type: 'M' },
      { field: 'SendingAmount', dataType: 'F', maxLength: '14,3', description: 'Amount sender paid', type: 'M' },
      { field: 'ConversionRate', dataType: 'F', maxLength: '14,8', description: 'Rate agreed upon from Get Rate and Charge', type: 'M' },
      { field: 'AccountNo', dataType: 'AN', maxLength: '50', description: 'Receiver account or mobile money phone number', type: 'CM' },
      { field: 'BeneficiaryBankCode', dataType: 'AN', maxLength: '10', description: 'Bank code (Required for bank deposit)', type: 'CM' },
      { field: 'SourceofRemittance', dataType: 'AN', maxLength: '5', description: 'Selected source of income code', type: 'M' },
      { field: 'Purpose', dataType: 'AN', maxLength: '5', description: 'Selected purpose code', type: 'M' },
      { field: 'RemitterRelation', dataType: 'AN', maxLength: '5', description: 'Selected relationship code', type: 'M' },
    ],
    responseFields: [
      { field: 'PartnerReferenceNo', dataType: 'AN', maxLength: '30', description: 'Echoed Partner Reference Number', type: 'M' },
      { field: 'ReferenceNo', dataType: 'AN', maxLength: '100', description: 'Unique SunnyRemit transaction tracking number', type: 'M' },
    ],
    sampleRequest: {
      transaction_request: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        country_code: 'KE',
        source_country_code: 'US',
        service_id: 12670,
        service_name: 'MPESA',
        partner_reference_number: 'REF_MPESA_001',
        customer_first_name: 'Akash',
        customer_last_name: 'Chopra',
        customer_address: '3/302 Comm St',
        customer_contact: '254700000000',
        customer_identity: 100,
        customer_identity_no: 'A12345678',
        customer_nationality: 'KE',
        beneficiary_first_name: 'Arjun',
        beneficiary_last_name: 'Kapoor',
        beneficiary_contact_number: '254711223344',
        sending_currency_code: 'USD',
        sending_amount: 100.0,
        Receiving_currency_code: 'KES',
        Receiving_amount: 12915.0,
        settlement_currency_code: 'USD',
        settlement_amount: 100.0,
        conversion_rate: 129.15,
        charge: 0,
        charge_currency: 'USD',
        source_of_remittance: 'SAL',
        purpose: 'EDU',
        remitter_relation: 'FAM',
        value_date: '2026-07-30',
        remark: 'MPESA Transfer',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'TransactionResponse',
        time_stamp: '2026-07-30T14:25:00.7679824+05:30',
        response_status: {
          status_code: 1,
          message: 'Transaction sent successfully',
          data: {
            partner_reference_no: 'REF_MPESA_001',
            reference_no: 241111100025,
          },
        },
      },
    },
    edgeCaseResponses: [
      {
        scenarioId: 'success',
        scenarioName: '✅ 200 OK — Transaction Sent Successfully',
        description: 'Transaction validated and dispatched to payout queue.',
        httpStatus: 200,
        httpStatusText: '200 OK',
        responsePayload: {
          accumexs: {
            type: 'TransactionResponse',
            time_stamp: '2026-07-30T14:25:00.7679824+05:30',
            response_status: {
              status_code: 1,
              message: 'Transaction sent successfully',
              data: {
                partner_reference_no: 'REF_MPESA_001',
                reference_no: 241111100025,
              },
            },
          },
        },
      },
      {
        scenarioId: 'invalid_bank',
        scenarioName: '⚠️ 400 Bad Request — Invalid Beneficiary Bank Code',
        description: 'Invalid bank code for destination country.',
        httpStatus: 400,
        httpStatusText: '400 Bad Request',
        responsePayload: {
          error: 'Bad Request',
          message: 'Bank Code not Valid for destination country (Code: 24)',
          status_code: 24,
        },
      },
      {
        scenarioId: 'invalid_mobile',
        scenarioName: '⚠️ 400 Bad Request — Invalid Receiver Mobile Format',
        description: 'Receiver phone number format failed MPESA validation.',
        httpStatus: 400,
        httpStatusText: '400 Bad Request',
        responsePayload: {
          error: 'Bad Request',
          message: 'Invalid Receiver Mobile number format for MPESA (Code: 25)',
          status_code: 25,
        },
      },
      {
        scenarioId: 'duplicate_pin',
        scenarioName: '⚠️ 409 Conflict — Duplicate Partner Reference Number',
        description: 'Idempotency check detected duplicate reference number.',
        httpStatus: 409,
        httpStatusText: '409 Conflict',
        responsePayload: {
          error: 'Conflict',
          message: 'Duplicate Partner Reference Number detected (Code: 30)',
          status_code: 30,
        },
      },
    ],
  },
  {
    id: 'transaction_enquiry',
    title: '7. Transaction Enquiry',
    method: 'POST',
    path: '/transaction_enquiry',
    category: 'enquiry',
    description: 'Queries the current execution status of a transaction using either the Partner Reference Number or the SunnyRemit Reference Number.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Authorization token', type: 'M' },
      { field: 'Type', dataType: 'N', maxLength: '1', description: '1: Search by Partner Reference No | 2: Search by SunnyRemit Reference No', type: 'M' },
      { field: 'ReferenceNumber', dataType: 'AN', maxLength: '30', description: 'Reference number to track', type: 'M' },
    ],
    responseFields: [
      { field: 'PartnerReferenceNo', dataType: 'AN', maxLength: '30', description: 'Original partner reference number', type: 'M' },
      { field: 'ReferenceNo', dataType: 'AN', maxLength: '30', description: 'SunnyRemit internal tracking reference number', type: 'M' },
      { field: 'StatusCode', dataType: 'AN', maxLength: '2', description: 'Current status code of transaction (See Status Codes table)', type: 'M' },
      { field: 'Description', dataType: 'AN', maxLength: '100', description: 'Textual status description (e.g. Paid out, Processing)', type: 'O' },
    ],
    sampleRequest: {
      transaction_enquiry: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        type: 2,
        reference_number: '241111100025',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'TransactionEnquiryResponse',
        time_stamp: '2026-07-30T14:30:00.7725922+05:30',
        response_status: {
          status_code: 1,
          message: 'Transaction Enquiry retrieved successfully',
          data: {
            partner_reference_number: 'REF_MPESA_001',
            reference_number: '241111100025',
            status_code: '16',
            description: 'Paid out',
          },
        },
      },
    },
  },
  {
    id: 'account_balance',
    title: '8. Get Account Balance',
    method: 'POST',
    path: '/account_balance',
    category: 'enquiry',
    description: 'Retrieves current agent balance and credit limits for pre-funding or post-funding settlement accounts.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Authorization token', type: 'M' },
    ],
    responseFields: [
      { field: 'Currency', dataType: 'AN', maxLength: '30', description: 'Settlement currency of account', type: 'M' },
      { field: 'Type', dataType: 'N', maxLength: '1', description: '1: Post Funding Account | 2: Pre Funding Account', type: 'M' },
      { field: 'Amount', dataType: 'F', maxLength: '14,3', description: 'Current available balance or limit consumed', type: 'M' },
    ],
    sampleRequest: {
      account_balance: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'AccountBalanceResponse',
        time_stamp: '2026-07-30T14:35:00.4138329+05:30',
        response_status: {
          status_code: 1,
          message: 'Account Balance retrieved successfully',
          data: {
            currency: 'USD',
            type: 'Post Funding',
            amount: 50000.0,
          },
        },
      },
    },
  },
  {
    id: 'cancel_transaction',
    title: '9. Cancel Transaction',
    method: 'POST',
    path: '/cancel_transaction',
    category: 'operations',
    description: 'Submits a formal cancellation request for a pending transaction prior to payout completion.',
    requestFields: [
      { field: 'AgentCode', dataType: 'AN', maxLength: '5', description: 'Agent code shared by SunnyRemit', type: 'M' },
      { field: 'SubAgentCode', dataType: 'AN', maxLength: '10', description: 'Partner code assigned by the Agent', type: 'M' },
      { field: 'AuthorizationCode', dataType: 'AN', maxLength: '100', description: 'Bearer Authorization token', type: 'M' },
      { field: 'AgentReferenceNo', dataType: 'AN', maxLength: '30', description: 'Reference number of transaction to cancel', type: 'M' },
      { field: 'Remark', dataType: 'AN', maxLength: '100', description: 'Reason for cancellation request', type: 'M' },
    ],
    responseFields: [
      { field: 'PartnerReferenceNo', dataType: 'AN', maxLength: '30', description: 'Partner reference number of cancelled transaction', type: 'M' },
      { field: 'ReferenceNo', dataType: 'AN', maxLength: '30', description: 'SunnyRemit reference number', type: 'M' },
      { field: 'StatusCode', dataType: 'AN', maxLength: '2', description: 'Cancellation status code (e.g. 13 Cancel Requested)', type: 'M' },
      { field: 'Description', dataType: 'AN', maxLength: '100', description: 'Cancellation detail status message', type: 'O' },
    ],
    sampleRequest: {
      cancel_transaction: {
        agent_code: '<AGENT_CODE>',
        sub_agent_code: '<SUB_AGENT_CODE>',
        agent_reference_no: 'REF_MPESA_001',
        remark: 'Customer requested cancellation due to wrong phone number',
      },
    },
    sampleResponse: {
      accumexs: {
        type: 'CancelTransactionResponse',
        time_stamp: '2026-07-30T14:40:00.1396963+05:30',
        response_status: {
          status_code: 1,
          message: 'Transaction cancellation requested successfully',
          data: {
            partner_reference_number: 'REF_MPESA_001',
            reference_number: '241111100025',
            status_code: '13',
            description: 'Cancel Requested',
          },
        },
      },
    },
  },
];

export const STATUS_CODES: StatusCodeItem[] = [
  { slNo: 1, categoryType: 'Success', responseCode: 0, description: 'Success' },
  { slNo: 2, categoryType: 'In Progress', responseCode: 10, description: 'Pending Verification' },
  { slNo: 2, categoryType: 'In Progress', responseCode: 11, description: 'Transaction In Progress' },
  { slNo: 2, categoryType: 'In Progress', responseCode: 12, description: 'Transaction Hold' },
  { slNo: 2, categoryType: 'In Progress', responseCode: 13, description: 'Cancel Requested' },
  { slNo: 4, categoryType: 'Cancelled', responseCode: 14, description: 'Cancelled' },
  { slNo: 2, categoryType: 'In Progress', responseCode: 15, description: 'Sent to Bank' },
  { slNo: 1, categoryType: 'Success', responseCode: 16, description: 'Paid out' },
  { slNo: 3, categoryType: 'Error', responseCode: 17, description: 'Database Insert Failed' },
  { slNo: 3, categoryType: 'Error', responseCode: 18, description: 'Error in Connection' },
  { slNo: 3, categoryType: 'Error', responseCode: 19, description: 'SQL Server Not Accessible' },
  { slNo: 3, categoryType: 'Error', responseCode: 20, description: 'Database Error' },
  { slNo: 3, categoryType: 'Error', responseCode: 21, description: 'Query Timed Out' },
  { slNo: 3, categoryType: 'Error', responseCode: 22, description: '<Custom Message>' },
  { slNo: 3, categoryType: 'Error', responseCode: 23, description: 'Invalid IFSC Code' },
  { slNo: 3, categoryType: 'Error', responseCode: 24, description: 'Bank Code not Valid' },
  { slNo: 3, categoryType: 'Error', responseCode: 25, description: 'Invalid Receiver Mobile number' },
  { slNo: 3, categoryType: 'Error', responseCode: 26, description: 'Invalid Transaction PIN number' },
  { slNo: 3, categoryType: 'Error', responseCode: 27, description: 'IBAN/IFSC Code should not be empty' },
  { slNo: 3, categoryType: 'Error', responseCode: 28, description: 'FC Amount Limit Exceeded' },
  { slNo: 3, categoryType: 'Error', responseCode: 29, description: 'Invalid Beneficiary Account Number' },
  { slNo: 3, categoryType: 'Error', responseCode: 30, description: 'Duplicate Pin Number' },
  { slNo: 0, categoryType: 'Pending', responseCode: 'NULL', description: 'Yet to Release' },
];

export const NATIONAL_IDS: NationalIdItem[] = [
  { code: '100', description: 'Passport' },
  { code: '101', description: 'National ID Card' },
  { code: '102', description: 'Driver’s License' },
  { code: '103', description: 'Social Security Number (SSN)' },
  { code: '104', description: 'National Insurance Number' },
  { code: '105', description: 'Tax Identification Number (TIN)' },
  { code: '106', description: 'Alien Registration Number' },
  { code: '107', description: 'Identity Card' },
  { code: '108', description: 'Voter ID Card' },
  { code: '109', description: 'Military ID Card' },
  { code: '110', description: 'Health Insurance Card' },
  { code: '111', description: 'Permanent Resident Card' },
  { code: '112', description: 'Citizen Card' },
  { code: '113', description: 'Foreigner Registration Card' },
  { code: '114', description: 'Residence Permit' },
  { code: '115', description: 'Driver’s Permit' },
];

export function generateCodeSnippet(endpoint: ApiEndpoint, language: 'curl' | 'js' | 'python' | 'php', baseUrl: string = TECHNICAL_GUIDE.uatUrl) {
  const jsonBody = JSON.stringify(endpoint.sampleRequest, null, 2);
  const fullUrl = `${baseUrl}${endpoint.path}`;

  switch (language) {
    case 'curl':
      return `curl -X ${endpoint.method} "${fullUrl}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '${jsonBody}'`;

    case 'js':
      return `const response = await fetch("${fullUrl}", {
  method: "${endpoint.method}",
  headers: {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(${jsonBody})
});

const data = await response.json();
console.log(data);`;

    case 'python':
      return `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}
payload = ${jsonBody}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;

    case 'php':
      return `<?php
$ch = curl_init("${fullUrl}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_ACCESS_TOKEN',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${jsonBody}));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`;
  }
}

export function generateApiDocsMarkdown(): string {
  let md = `# SunnyRemit — API Documentation (Version 1.1)\n\n`;
  md += `**Provider**: SunnyRemit, Kenya  \n`;
  md += `**Contact**: info@sunnyremit.com | +254 722 350400  \n\n`;

  md += `## 1. Introduction & Overview\n`;
  md += `SunnyRemit offers Web Services enabling Sending Agent Partners to execute remittance transactions, query exchange rates, fetch beneficiary banking master data, and track account balances.\n\n`;

  md += `### Acronyms & Abbreviations\n\n`;
  md += `| Acronym | Description |\n|---|---|\n`;
  ACRONYMS.forEach((a) => {
    md += `| ${a.acronym} | ${a.description} |\n`;
  });

  md += `\n## 2. Technical Specification\n\n`;
  md += `- **UAT Endpoint**: \`${TECHNICAL_GUIDE.uatUrl}\` *(Provided confidentially by SunnyRemit Support Team)*\n`;
  md += `- **Live Endpoint**: \`${TECHNICAL_GUIDE.liveUrl}\` *(Provided confidentially by SunnyRemit Support Team)*\n`;
  md += `- **Authentication**: All endpoints (except \`/get_token\`) require a Bearer token in the \`Authorization\` header.\n\n`;

  md += `## 3. Web Service Methods\n\n`;
  API_ENDPOINTS.forEach((ep) => {
    md += `### ${ep.title}\n`;
    md += `**Endpoint**: \`${ep.method} ${ep.path}\`  \n`;
    md += `*${ep.description}*\n\n`;

    md += `#### Request Parameters\n\n`;
    md += `| Field | Data Type | Max Length | Description | Requirement |\n|---|---|---|---|---|\n`;
    ep.requestFields.forEach((rf) => {
      md += `| ${rf.field} | ${rf.dataType} | ${rf.maxLength} | ${rf.description} | ${rf.type} |\n`;
    });

    md += `\n#### Response Fields\n\n`;
    md += `| Field | Data Type | Max Length | Description | Requirement |\n|---|---|---|---|---|\n`;
    ep.responseFields.forEach((rf) => {
      md += `| ${rf.field} | ${rf.dataType} | ${rf.maxLength} | ${rf.description} | ${rf.type} |\n`;
    });

    md += `\n#### Sample Request\n\`\`\`json\n${JSON.stringify(ep.sampleRequest, null, 2)}\n\`\`\`\n\n`;
    md += `#### Sample Response\n\`\`\`json\n${JSON.stringify(ep.sampleResponse, null, 2)}\n\`\`\`\n\n`;
    md += `---\n\n`;
  });

  md += `## 4. System Status Codes\n\n`;
  md += `| SlNo | Category Type | Code | Description |\n|---|---|---|---|\n`;
  STATUS_CODES.forEach((sc) => {
    md += `| ${sc.slNo} | ${sc.categoryType} | ${sc.responseCode} | ${sc.description} |\n`;
  });

  md += `\n## 5. National ID Code Reference\n\n`;
  md += `| Code | Document Description |\n|---|---|\n`;
  NATIONAL_IDS.forEach((id) => {
    md += `| ${id.code} | ${id.description} |\n`;
  });

  return md;
}
