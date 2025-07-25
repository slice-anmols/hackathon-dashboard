import React, { useState } from 'react';
import { Lead } from '../types/Lead';
import { fetchTelegramUsername } from '../services/leadService';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleChatClick = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchTelegramUsername(lead.userid);
      if (result.username) {
        window.open(`https://t.me/${result.username}`, '_blank');
      } else {
        setError('No Telegram username found for this lead');
      }
    } catch (err) {
      setError('Failed to fetch Telegram username. Please try again.');
      console.error('Error fetching Telegram username:', err);
    } finally {
      setIsLoading(false);
    }
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

      {/* Chat Button */}
      <div className="mb-4">
        <button
          onClick={handleChatClick}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
              </svg>
              Chat with Lead
            </>
          )}
        </button>
        {error && (
          <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
        )}
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