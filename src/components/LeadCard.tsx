import React from 'react';
import { Lead } from '../types/Lead';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md transition-shadow duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {lead.company || 'No Company Name'}
          </h3>
          <p className="text-sm text-gray-600">User ID: {lead.userid}</p>
        </div>
        {lead.leadInference && (
          <div className="text-right">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(lead.leadInference.priority)}`}>
              {lead.leadInference.priority}
            </div>
          </div>
        )}
      </div>

      {/* Business Info */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Business Type:</span>
            <p className="text-gray-900">{lead.typeOfBusiness || 'N/A'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Turnover:</span>
            <p className="text-gray-900">{lead.turnover || 'N/A'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Loan Amount:</span>
            <p className="text-gray-900">₹{lead.loanAmount?.toLocaleString() || 'N/A'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Profit Margin:</span>
            <p className="text-gray-900">{lead.profitMargin || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium text-gray-700">Loan Details</h4>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Reason:</span> {lead.reasonForLoan || 'N/A'}</p>
          <p><span className="font-medium">Duration:</span> {lead.durationOfLoan || 'N/A'}</p>
          <p><span className="font-medium">Collateral:</span> {lead.collateral || 'N/A'}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium text-gray-700">Summary</h4>
        <p className="text-sm text-gray-900">{lead.shortSummary || 'No summary available'}</p>
      </div>

      {/* Lead Inference - Highlight Section */}
      {lead.leadInference ? (
        <div className="pt-4 border-t">
          <h4 className="mb-3 font-semibold text-gray-900">Lead Analysis</h4>
          
          {/* Lead Score */}
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Lead Score:</span>
              <span className={`text-lg font-bold ${getLeadScoreColor(lead.leadInference.leadScore)}`}>
                {lead.leadInference.leadScore}/{lead.leadInference.totalPossibleScore}
              </span>
            </div>
            <div className="mt-1 w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(lead.leadInference.leadScore / lead.leadInference.totalPossibleScore) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Lead Category */}
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <p className="text-sm text-gray-900">{lead.leadInference.leadCategory}</p>
          </div>

          {/* Conversion Probability */}
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">Conversion Probability:</span>
            <p className="text-sm text-gray-900">{lead.leadInference.conversionProbability}</p>
          </div>

          {/* Recommended Action */}
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">Recommended Action:</span>
            <p className="text-sm text-gray-900">{lead.leadInference.recommendedAction}</p>
          </div>

          {/* Score Breakdown */}
          {/* <div>
            <span className="text-sm font-medium text-gray-700">Score Breakdown:</span>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              {Object.entries(lead.leadInference.scoreBreakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Processed At */}
          <div className="mt-3 text-xs text-gray-500">
            Processed: {new Date(lead.leadInference.processedAt).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="pt-4 border-t">
          <div className="py-4 text-center">
            <p className="text-sm text-gray-500">No lead analysis available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadCard; 