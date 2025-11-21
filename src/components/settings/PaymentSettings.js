import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Plus, Trash2, Star } from 'lucide-react';

const PaymentSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'mpesa', number: '+254 704 258 346', isDefault: true },
    { id: 2, type: 'bank', accountNumber: '****1234', bankName: 'KCB Bank', isDefault: false }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'mpesa',
    phoneNumber: '',
    accountNumber: '',
    bankName: ''
  });
  const [withdrawalSettings, setWithdrawalSettings] = useState({
    autoWithdraw: false,
    threshold: 5000,
    schedule: 'weekly'
  });
  const [taxInfo, setTaxInfo] = useState({
    kraPin: '',
    vatNumber: '',
    businessName: ''
  });

  const handleAddMethod = () => {
    const method = {
      id: Date.now(),
      ...newMethod,
      isDefault: paymentMethods.length === 0
    };
    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({ type: 'mpesa', phoneNumber: '', accountNumber: '', bankName: '' });
    setShowAddForm(false);
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleRemoveMethod = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const getMethodIcon = (type) => {
    switch (type) {
      case 'mpesa': return <Smartphone className="w-5 h-5 text-green-600" />;
      case 'bank': return <Building className="w-5 h-5 text-blue-600" />;
      default: return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  const getMethodLabel = (type) => {
    switch (type) {
      case 'mpesa': return 'M-Pesa';
      case 'airtel': return 'Airtel Money';
      case 'bank': return 'Bank Account';
      default: return 'Payment Method';
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payment Settings</h1>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Method
          </button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                {getMethodIcon(method.type)}
                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-900">{getMethodLabel(method.type)}</p>
                    {method.isDefault && (
                      <Star className="w-4 h-4 text-yellow-500 ml-2 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {method.type === 'mpesa' ? method.number : `${method.bankName} - ${method.accountNumber}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-sm text-teal-600 hover:text-teal-800"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleRemoveMethod(method.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Payment Method Form */}
        {showAddForm && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-3">Add New Payment Method</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                <select
                  value={newMethod.type}
                  onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="airtel">Airtel Money</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>

              {newMethod.type === 'mpesa' || newMethod.type === 'airtel' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newMethod.phoneNumber}
                    onChange={(e) => setNewMethod({ ...newMethod, phoneNumber: e.target.value })}
                    placeholder="+254 704 258 346"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={newMethod.bankName}
                      onChange={(e) => setNewMethod({ ...newMethod, bankName: e.target.value })}
                      placeholder="e.g., KCB Bank"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input
                      type="text"
                      value={newMethod.accountNumber}
                      onChange={(e) => setNewMethod({ ...newMethod, accountNumber: e.target.value })}
                      placeholder="Account number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={handleAddMethod}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add Method
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Withdrawal Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Withdrawal Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-withdraw</p>
              <p className="text-sm text-gray-600">Automatically withdraw earnings when threshold is reached</p>
            </div>
            <input
              type="checkbox"
              checked={withdrawalSettings.autoWithdraw}
              onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, autoWithdraw: e.target.checked })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>

          {withdrawalSettings.autoWithdraw && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Threshold</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">KSh</span>
                  <input
                    type="number"
                    value={withdrawalSettings.threshold}
                    onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, threshold: parseInt(e.target.value) })}
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Schedule</label>
                <select
                  value={withdrawalSettings.schedule}
                  onChange={(e) => setWithdrawalSettings({ ...withdrawalSettings, schedule: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tax Information */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Tax Information (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">KRA PIN</label>
            <input
              type="text"
              value={taxInfo.kraPin}
              onChange={(e) => setTaxInfo({ ...taxInfo, kraPin: e.target.value })}
              placeholder="A000000000A"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">VAT Number</label>
            <input
              type="text"
              value={taxInfo.vatNumber}
              onChange={(e) => setTaxInfo({ ...taxInfo, vatNumber: e.target.value })}
              placeholder="P000000000A"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={taxInfo.businessName}
              onChange={(e) => setTaxInfo({ ...taxInfo, businessName: e.target.value })}
              placeholder="Your business name (if applicable)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Payment Notifications */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Payment Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">Email me when I receive payments</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">SMS notifications for withdrawals</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">Weekly payment summary</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;