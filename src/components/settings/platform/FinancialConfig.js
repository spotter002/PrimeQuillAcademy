import React, { useState } from 'react';
import { DollarSign, Percent, Clock, CreditCard } from 'lucide-react';

const FinancialConfig = () => {
  const [config, setConfig] = useState({
    commission: {
      global: 10,
      categories: {
        'Web Development': 8,
        'Design & Creative': 12,
        'Writing & Translation': 15
      }
    },
    withdrawal: {
      minAmount: 1000,
      maxAmount: 100000,
      processingTime: 24
    },
    escrow: {
      autoRelease: true,
      releaseTime: 7,
      disputeTime: 14
    },
    currency: {
      primary: 'KSh',
      exchangeRate: 1,
      allowMultiple: false
    },
    paymentGateways: {
      mpesa: {
        enabled: true,
        consumerKey: '',
        consumerSecret: '',
        passkey: ''
      },
      paypal: {
        enabled: false,
        clientId: '',
        clientSecret: ''
      }
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Financial Configuration</h1>

      {/* Commission Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Percent className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Commission Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Global Commission (%)</label>
            <input
              type="number"
              value={config.commission.global}
              onChange={(e) => setConfig({
                ...config,
                commission: { ...config.commission, global: parseFloat(e.target.value) }
              })}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Category-specific Commission</h4>
            <div className="space-y-2">
              {Object.entries(config.commission.categories).map(([category, rate]) => (
                <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-gray-700">{category}</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setConfig({
                        ...config,
                        commission: {
                          ...config.commission,
                          categories: {
                            ...config.commission.categories,
                            [category]: parseFloat(e.target.value)
                          }
                        }
                      })}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Withdrawal Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount (KSh)</label>
            <input
              type="number"
              value={config.withdrawal.minAmount}
              onChange={(e) => setConfig({
                ...config,
                withdrawal: { ...config.withdrawal, minAmount: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Amount (KSh)</label>
            <input
              type="number"
              value={config.withdrawal.maxAmount}
              onChange={(e) => setConfig({
                ...config,
                withdrawal: { ...config.withdrawal, maxAmount: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time (hours)</label>
            <input
              type="number"
              value={config.withdrawal.processingTime}
              onChange={(e) => setConfig({
                ...config,
                withdrawal: { ...config.withdrawal, processingTime: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Escrow Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Escrow Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-release Payments</p>
              <p className="text-sm text-gray-600">Automatically release payments after completion</p>
            </div>
            <input
              type="checkbox"
              checked={config.escrow.autoRelease}
              onChange={(e) => setConfig({
                ...config,
                escrow: { ...config.escrow, autoRelease: e.target.checked }
              })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          {config.escrow.autoRelease && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-release Time (days)</label>
                <input
                  type="number"
                  value={config.escrow.releaseTime}
                  onChange={(e) => setConfig({
                    ...config,
                    escrow: { ...config.escrow, releaseTime: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Window (days)</label>
                <input
                  type="number"
                  value={config.escrow.disputeTime}
                  onChange={(e) => setConfig({
                    ...config,
                    escrow: { ...config.escrow, disputeTime: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Payment Gateway Integration</h3>
        </div>
        <div className="space-y-6">
          {/* M-Pesa */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">M-Pesa Integration</h4>
              <input
                type="checkbox"
                checked={config.paymentGateways.mpesa.enabled}
                onChange={(e) => setConfig({
                  ...config,
                  paymentGateways: {
                    ...config.paymentGateways,
                    mpesa: { ...config.paymentGateways.mpesa, enabled: e.target.checked }
                  }
                })}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
            </div>
            {config.paymentGateways.mpesa.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consumer Key</label>
                  <input
                    type="password"
                    value={config.paymentGateways.mpesa.consumerKey}
                    onChange={(e) => setConfig({
                      ...config,
                      paymentGateways: {
                        ...config.paymentGateways,
                        mpesa: { ...config.paymentGateways.mpesa, consumerKey: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consumer Secret</label>
                  <input
                    type="password"
                    value={config.paymentGateways.mpesa.consumerSecret}
                    onChange={(e) => setConfig({
                      ...config,
                      paymentGateways: {
                        ...config.paymentGateways,
                        mpesa: { ...config.paymentGateways.mpesa, consumerSecret: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passkey</label>
                  <input
                    type="password"
                    value={config.paymentGateways.mpesa.passkey}
                    onChange={(e) => setConfig({
                      ...config,
                      paymentGateways: {
                        ...config.paymentGateways,
                        mpesa: { ...config.paymentGateways.mpesa, passkey: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* PayPal */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">PayPal Integration</h4>
              <input
                type="checkbox"
                checked={config.paymentGateways.paypal.enabled}
                onChange={(e) => setConfig({
                  ...config,
                  paymentGateways: {
                    ...config.paymentGateways,
                    paypal: { ...config.paymentGateways.paypal, enabled: e.target.checked }
                  }
                })}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
            </div>
            {config.paymentGateways.paypal.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                  <input
                    type="password"
                    value={config.paymentGateways.paypal.clientId}
                    onChange={(e) => setConfig({
                      ...config,
                      paymentGateways: {
                        ...config.paymentGateways,
                        paypal: { ...config.paymentGateways.paypal, clientId: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Secret</label>
                  <input
                    type="password"
                    value={config.paymentGateways.paypal.clientSecret}
                    onChange={(e) => setConfig({
                      ...config,
                      paymentGateways: {
                        ...config.paymentGateways,
                        paypal: { ...config.paymentGateways.paypal, clientSecret: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Financial Configuration
        </button>
      </div>
    </div>
  );
};

export default FinancialConfig;