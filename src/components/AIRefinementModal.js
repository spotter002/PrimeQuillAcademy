import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const AIRefinementModal = ({ isOpen, onClose, originalIdea, refinement, onAccept, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-charcoal">
              We refined your idea — here's how to make it deliverable
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original vs Refined */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-charcoal">Original vs Refined</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Original Idea</h4>
                  <p className="text-red-700 text-sm">{originalIdea}</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Refined Title</h4>
                  <p className="text-green-700 font-medium">{refinement.refinedTitle}</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Refined Description</h4>
                  <p className="text-green-700 text-sm">{refinement.refinedDescription}</p>
                </div>
              </div>
            </div>

            {/* Suggested Improvements */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-charcoal">Suggested Improvements</h3>
              
              <div className="space-y-4">
                {/* Milestones */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Suggested Milestones</h4>
                  <ul className="space-y-2">
                    {refinement.suggestedMilestones?.map((milestone, index) => (
                      <li key={index} className="text-blue-700 text-sm">
                        <span className="font-medium">{milestone.title}</span>
                        <span className="text-blue-600"> ({milestone.estimatedDays} days)</span>
                        <p className="text-blue-600 text-xs mt-1">{milestone.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Budget Range */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Budget Range</h4>
                  <p className="text-yellow-700">
                    KSh {refinement.budgetRange?.min?.toLocaleString()} - KSh {refinement.budgetRange?.max?.toLocaleString()}
                  </p>
                  <p className="text-yellow-600 text-xs mt-1">
                    Timeline: {refinement.timelineEstimate} days
                  </p>
                </div>

                {/* Clarifying Questions */}
                {refinement.clarifyingQuestions && refinement.clarifyingQuestions.length > 0 && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Clarifying Questions</h4>
                    <ul className="space-y-1">
                      {refinement.clarifyingQuestions.map((question, index) => (
                        <li key={index} className="text-purple-700 text-sm">
                          • {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Elevator Pitch */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Project Summary</h4>
                  <p className="text-gray-700 text-sm italic">"{refinement.elevatorPitch}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={onAccept}
              className="flex items-center px-6 py-3 bg-accent-teal text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Accept Refinement
            </button>
            <button
              onClick={onReject}
              className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Use My Original Idea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRefinementModal;