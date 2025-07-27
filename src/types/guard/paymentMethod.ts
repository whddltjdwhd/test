import type {CashReceiptIssueType, CashReceiptUsageType} from '../domain/paymentMethod'

export function usageGuard(usage: string): usage is CashReceiptUsageType {
    return usage === 'PERSONAL_INCOME_TAX' || usage === 'BIZ_EXPENSE_PROOF'
}

export function issueTypeGuard(issueType: string): issueType is CashReceiptIssueType {
    return (
        issueType === 'PR_CELL_PHONE_NUMBER' ||
        issueType === 'PR_CASH_RECEPT_CARD_NUMBER' ||
        issueType === 'BUSINESS_REGISTRATION_NUMBER'
    )
}
