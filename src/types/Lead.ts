export interface ScoreBreakdown {
  businessType: number;
  businessClarity: number;
  loanRatio: number;
  turnover: number;
  loanPurpose: number;
  growthIntent: number;
  collateral: number;
  completeness: number;
  penalty: number;
}

export interface LeadInference {
  userId: string;
  leadScore: number;
  leadCategory: string;
  priority: string;
  recommendedAction: string;
  conversionProbability: string;
  scoreBreakdown: ScoreBreakdown;
  totalPossibleScore: number;
  processedAt: string;
}

export interface Lead {
  userid: string;
  company: string;
  typeOfBusiness: string;
  turnover: string;
  profitMargin: string;
  loanAmount: number;
  reasonForLoan: string;
  durationOfLoan: string;
  collateral: string;
  shortSummary: string;
  leadInference?: LeadInference;
} 