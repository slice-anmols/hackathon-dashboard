import React, { useState, useEffect } from 'react';
import { Lead } from '../types/Lead';
import { fetchLeads } from '../services/leadService';
import LeadCard from './LeadCard';

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads. Please check your backend URL configuration.');
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const scoreA = a.leadInference?.leadScore || 0;
    const scoreB = b.leadInference?.leadScore || 0;
    
    if (sortOrder === 'desc') {
      return scoreB - scoreA;
    } else {
      return scoreA - scoreB;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const getBackendUrl = () => {
    return process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full border-b-2 border-blue-600 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-6 mx-auto max-w-md text-center">
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Error Loading Data</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <div className="p-4 mb-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Backend URL:</strong> {getBackendUrl()}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Endpoint:</strong> /webhook/get-leads
            </p>
          </div>
          <button
            onClick={loadLeads}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lead Dashboard</h1>
              <p className="mt-1 text-gray-600">
                {leads.length} lead{leads.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Backend: {getBackendUrl()}
              </div>
              <button
                onClick={toggleSortOrder}
                className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                <span>Sort by Lead Score</span>
                <span className="text-sm">
                  {sortOrder === 'desc' ? '↓' : '↑'}
                </span>
              </button>
              <button
                onClick={loadLeads}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg transition-colors hover:bg-gray-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {leads.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl text-gray-400">📊</div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">No Leads Found</h2>
            <p className="mb-4 text-gray-600">
              No lead data is available. Please check your backend configuration.
            </p>
            <div className="inline-block p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Backend URL:</strong> {getBackendUrl()}
              </p>
              <p className="mt-1 text-sm text-gray-700">
                <strong>Endpoint:</strong> /webhook/get-leads
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedLeads.map((lead, index) => (
              <LeadCard key={`${lead.userid}-${index}`} lead={lead} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 