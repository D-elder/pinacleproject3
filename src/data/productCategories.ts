export type ProductCategoryId =
  | 'personal-banking'
  | 'cards'
  | 'digital-banking'
  | 'business-sme'
  | 'loans-credit'
  | 'electronic-payment'

export interface ProductCategory {
  id: ProductCategoryId
  name: string
  icon: string
  description: string
  subcategories: string[]
  subtitle?: string
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'personal-banking',
    name: 'Personal Banking',
    icon: 'User',
    description: 'Savings, current & premium accounts',
    subcategories: [
      "Zenith Children's Account (ZECA)",
      'Aspire Account',
      'Aspire Lite',
      'Ethical Savings Account',
      'EazySave Classic Account',
      'Zenith Salary Savings Account',
      'Zenith Individual Current Account',
      'Timeless Current Account',
      'Save4Me Target Account',
      'Zenith Gold Premium Current Account',
      'Timeless Savings Account',
    ],
  },
  {
    id: 'cards',
    name: 'Cards',
    icon: 'CreditCard',
    description: 'Debit, credit & virtual',
    subcategories: [
      'Zenith Debit Card - Classic',
      'Zenith Debit Card - Gold',
      'Zenith Debit Card - Platinum',
      'Zenith Prepaid Card',
      'Zenith Credit Card - Classic',
      'Zenith Credit Card - Gold',
      'Zenith Credit Card - Platinum/Infinite',
      'Zenith Virtual Card',
    ],
  },
  {
    id: 'digital-banking',
    name: 'Digital Banking',
    icon: 'Smartphone',
    description: 'Mobile, internet & USSD',
    subcategories: [
      'Zenith Internet Banking',
      'Zenith Mobile Banking App',
      '*966# EazyBanking',
      'ZIVA - Zenith Intelligent Virtual Assistant',
      'ZMoney - Agency Banking Platform',
    ],
  },
  {
    id: 'business-sme',
    name: 'Business & SME',
    icon: 'Briefcase',
    description: 'Growth solutions for enterprises',
    subcategories: [
      'SME Grow My Biz Account',
      'SME Loan',
      'Z-Woman Loan',
      'GlobalPay - Zenith Payment Gateway',
      'ZIVA Store',
      'Zenith Bank POS Terminals',
    ],
  },
  {
    id: 'loans-credit',
    name: 'Loans & Credit',
    icon: 'DollarSign',
    description: 'Personal & business financing',
    subcategories: [
      'Personal Loan',
      'Education Loan',
      'Household Acquisition Loan',
      'Auto Loan',
      'Salary Advance',
      'SME Loan',
      'Z-Woman Loan',
      'Timeless Pension Advance Plus',
      'Timeless Pension Advance',
      'Remita Loan',
    ],
  },
  {
    id: 'electronic-payment',
    name: 'Electronic Payment Solutions',
    icon: 'ShoppingCart',
    description: 'POS, gateway & transfers',
    subcategories: [
      'GlobalPay - Zenith Payment Gateway',
      'Scan To Pay (QR Payments)',
      'Zenith Bank POS Terminals',
      'ZMoney - Agency Banking Platform',
    ],
  },
]
