import React, { useState } from 'react';
import { Save, Check, Lock, Bell, Shield, User, CreditCard, Truck, FileText, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import adminDataService from '../services/adminDataService';

const AdminSettings = () => {
  const { adminUser } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || 'Store Manager',
    email: adminUser?.email || 'admin@dripclothing.in',
    role: 'Super Admin',
  });

  // Password Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailNewOrder: true,
    emailLowStock: true,
    emailNewReview: false,
    dailySummary: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all demo orders, sales, and test customers to 0?')) {
      adminDataService.resetDemoData();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 1500);
    }
  };

  const navItems = [
    { id: 'profile', label: 'Profile & Security', icon: User },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'shipping', label: 'Shipping & Delivery Rules', icon: Truck },
    { id: 'payment', label: 'Payment Gateway Integration', icon: CreditCard },
    { id: 'policies', label: 'Store Legal Policies', icon: FileText },
    { id: 'data', label: 'Data Reset & Maintenance', icon: Trash2 },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <span>System Configuration</span>
          <span>•</span>
          <span className="text-emerald-600 font-bold">Admin Console</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Admin Settings & Preferences
        </h1>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check size={16} className="text-emerald-600" />
          <span>Settings saved and updated successfully!</span>
        </div>
      )}

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation */}
        <div className="lg:col-span-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Content */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {activeSection === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Administrator Profile</h3>
                <p className="text-slate-500">Manage your administrative credentials and security</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-xs">Change Password</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-lg transition-colors shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {activeSection === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Notification Alerts</h3>
                <p className="text-slate-500">Configure real-time automated alerts for store events</p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <strong className="block text-slate-900">New Order Alerts</strong>
                    <span className="text-slate-500">Receive instant email/SMS when a customer places an order</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailNewOrder}
                    onChange={(e) => setNotifications({ ...notifications, emailNewOrder: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <strong className="block text-slate-900">Low Stock Warning</strong>
                    <span className="text-slate-500">Alert when any streetwear SKU drops below 10 units</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailLowStock}
                    onChange={(e) => setNotifications({ ...notifications, emailLowStock: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <div>
                    <strong className="block text-slate-900">Daily Sales Summary</strong>
                    <span className="text-slate-500">Nightly digest of total revenue and pending shipments</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.dailySummary}
                    onChange={(e) => setNotifications({ ...notifications, dailySummary: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-lg transition-colors shadow-xs"
                >
                  Save Notification Rules
                </button>
              </div>
            </form>
          )}

          {activeSection === 'shipping' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Shipping & Delivery Configuration</h3>
                <p className="text-slate-500">Set threshold for free shipping and courier integration</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Free Shipping Threshold</span>
                  <span className="text-lg font-bold text-slate-900">Orders above ₹1,499</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Flat Standard Courier Fee</span>
                  <span className="text-lg font-bold text-slate-900">₹99</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Payment Gateway Settings</h3>
                <p className="text-slate-500">Manage supported payment methods and API credentials</p>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">UPI / QR (Google Pay, PhonePe, Paytm)</span>
                  <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Active</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Cash on Delivery (Store Pickup & Haldwani Local)</span>
                  <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Active</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Credit / Debit Cards (Visa, Mastercard, RuPay)</span>
                  <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Active</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'policies' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Legal & Store Policies</h3>
                <p className="text-slate-500">Review terms published to the customer storefront</p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Store policies are active for <strong>Drip Clothing Haldwani</strong> covering 7-Day Returns & Exchanges, Privacy Protections, and Uttarakhand jurisdiction terms.
              </p>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Data Management & Reset</h3>
                <p className="text-slate-500">Reset test orders, sales stats, and customer accounts to 0</p>
              </div>

              {resetSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl font-bold flex items-center gap-2">
                  <Check size={16} />
                  <span>All demo data and test orders have been wiped clean (Reset to 0). Reloading...</span>
                </div>
              )}

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold">
                  <AlertTriangle size={16} />
                  <span>Wipe All Demo & Test Data</span>
                </div>
                <p className="text-rose-700 leading-relaxed">
                  This action resets all demo sales, fake revenue figures, demo order entries, and test customer profiles to <strong>0</strong>. Your product catalog and categories will remain safe.
                </p>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Sales & Orders Data to 0</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
