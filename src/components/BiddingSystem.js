import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, User, Star, MessageCircle, Award } from 'lucide-react';
import { bidsAPI, jobAPI } from '../services/api';

const BiddingSystem = ({ jobId, isClient, onBidSubmitted }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidForm, setBidForm] = useState({
    amount: '',
    deliveryTime: '',
    proposal: '',
    writerType: 'ESL',
    progressiveDelivery: {
      enabled: false,
      milestones: []
    }
  });

  useEffect(() => {
    if (isClient) {
      fetchBids();
    }
  }, [jobId, isClient]);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const response = await bidsAPI.getForJob(jobId);
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    try {
      const response = await bidsAPI.create({
        jobId,
        ...bidForm,
        amount: parseFloat(bidForm.amount),
        deliveryTime: parseInt(bidForm.deliveryTime)
      });
      
      setShowBidForm(false);
      setBidForm({
        amount: '',
        deliveryTime: '',
        proposal: '',
        writerType: 'ESL',
        progressiveDelivery: { enabled: false, milestones: [] }
      });
      
      if (onBidSubmitted) {
        onBidSubmitted(response.data);
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      await bidsAPI.accept(bidId);
      fetchBids(); // Refresh bids
    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };

  const getWriterBadge = (writerType, verification) => {
    if (writerType === 'ENL' || verification?.writerTier === 'ENL') {
      return (
        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          <Award className="w-3 h-3" />
          Native English
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
        <Award className="w-3 h-3" />
        ESL Writer
      </span>
    );
  };

  if (!isClient && !showBidForm) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Interested in this project?
          </h3>
          <button
            onClick={() => setShowBidForm(true)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Place Your Bid
          </button>
        </div>
      </div>
    );
  }

  if (showBidForm) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Submit Your Proposal</h3>
        
        <form onSubmit={handleSubmitBid} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bid Amount (KSh)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  required
                  value={bidForm.amount}
                  onChange={(e) => setBidForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your bid amount"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Time (days)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  required
                  min="1"
                  value={bidForm.deliveryTime}
                  onChange={(e) => setBidForm(prev => ({ ...prev, deliveryTime: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Days to complete"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Writer Type
            </label>
            <select
              value={bidForm.writerType}
              onChange={(e) => setBidForm(prev => ({ ...prev, writerType: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="ESL">ESL Writer</option>
              <option value="ENL">Native English Writer (+20% premium)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposal
            </label>
            <textarea
              required
              rows={6}
              value={bidForm.proposal}
              onChange={(e) => setBidForm(prev => ({ ...prev, proposal: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Describe your approach, experience, and why you're the best fit for this project..."
            />
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="progressiveDelivery"
              checked={bidForm.progressiveDelivery.enabled}
              onChange={(e) => setBidForm(prev => ({
                ...prev,
                progressiveDelivery: { ...prev.progressiveDelivery, enabled: e.target.checked }
              }))}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="progressiveDelivery" className="text-sm text-gray-700">
              Offer progressive delivery (split payments by milestones)
            </label>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Submit Proposal
            </button>
            <button
              type="button"
              onClick={() => setShowBidForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Proposals ({bids.length})
        </h3>
        <div className="text-sm text-gray-500">
          {bids.length > 0 && (
            <>
              Avg bid: KSh {Math.round(bids.reduce((sum, bid) => sum + bid.amount, 0) / bids.length).toLocaleString()}
            </>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : bids.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No proposals yet. Be the first to bid on this project!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map(bid => (
            <div key={bid._id} className="border border-gray-200 rounded-lg p-4 hover:border-teal-200 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {bid.freelancerId?.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{bid.freelancerId?.statistics?.avgRating || 0}</span>
                      </div>
                      <span>•</span>
                      <span>{bid.freelancerId?.statistics?.jobsCompleted || 0} jobs completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    KSh {bid.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {bid.deliveryTime} days delivery
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                {getWriterBadge(bid.writerType, bid.freelancerId?.profile?.verification)}
                {bid.progressiveDelivery?.enabled && (
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Progressive Delivery
                  </span>
                )}
                {bid.freelancerId?.profile?.verification?.isVerified && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    <Award className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">
                {bid.proposal}
              </p>
              
              {isClient && bid.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAcceptBid(bid._id)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    Accept Proposal
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Message
                  </button>
                </div>
              )}
              
              {bid.status === 'accepted' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-800">
                    <Award className="w-4 h-4" />
                    <span className="font-medium">Proposal Accepted</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BiddingSystem;