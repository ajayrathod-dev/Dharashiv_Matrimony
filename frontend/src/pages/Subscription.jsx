import React, { useEffect, useState } from 'react';
import { Star, Check, Crown, Zap, ShieldCheck } from 'lucide-react';
import { getPlans, createSubscription, getSubscriptions } from '../api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Subscription() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [currentSub, setCurrentSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    Promise.all([
      getPlans(),
      user ? getSubscriptions({ userId: user.id, status: 'active' }) : Promise.resolve({ data: [] })
    ])
      .then(([plansRes, subRes]) => {
        setPlans(plansRes.data);
        if (subRes.data.length > 0) setCurrentSub(subRes.data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handlePurchase = async (plan) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }
    setPurchasing(plan.id);
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const months = parseInt(plan.duration) || 3;
      const endDate = new Date(Date.now() + months * 30 * 24 * 3600 * 1000).toISOString().split('T')[0];
      await createSubscription({
        userId: user.id,
        planId: plan.id,
        planName: plan.name,
        startDate,
        endDate,
        status: 'active',
        amount: plan.price
      });
      setCurrentSub({ planName: plan.name, endDate });
      toast.success(`${plan.name} membership activated! 🎉`);
    } catch {
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setPurchasing(null);
    }
  };

  const planIcons = {
    Silver: <Star className="w-6 h-6 text-gray-500" />,
    Gold: <Crown className="w-6 h-6 text-yellow-500 fill-yellow-400" />,
    Diamond: <Zap className="w-6 h-6 text-blue-500 fill-blue-400" />
  };

  const planStyles = {
    Silver: {
      header: 'bg-gray-100 text-gray-800',
      btn: 'bg-gray-800 hover:bg-gray-900',
      border: 'border-gray-200'
    },
    Gold: {
      header: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white',
      btn: 'bg-amber-600 hover:bg-amber-700',
      border: 'border-amber-400'
    },
    Diamond: {
      header: 'bg-gradient-to-r from-red-600 to-rose-700 text-white',
      btn: 'bg-red-700 hover:bg-red-800',
      border: 'border-red-400'
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Premium Membership Plans</h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Connect directly with verified matches, view contact phone numbers, and unlock unlimited messaging.
        </p>

        {currentSub && (
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-medium">
            <Check className="w-4 h-4" /> Active Plan: {currentSub.planName} (Valid until {currentSub.endDate})
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse h-96 bg-gray-100"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map(plan => {
            const styles = planStyles[plan.name] || planStyles.Silver;
            const isPopular = plan.isPopular;
            const isActive = currentSub?.planName === plan.name;

            return (
              <div
                key={plan.id}
                className={`card border-2 flex flex-col relative transition-all duration-300 hover:shadow-xl ${styles.border} ${
                  isPopular ? 'shadow-lg md:-translate-y-2' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                )}

                <div className={`${styles.header} p-6 text-center rounded-t-xl`}>
                  <div className="flex justify-center mb-2">
                    {planIcons[plan.name]}
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold">₹{plan.price.toLocaleString()}</span>
                  </div>
                  <p className="text-xs opacity-90 mt-1">Duration: {plan.duration}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white rounded-b-xl">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(plan)}
                    disabled={purchasing === plan.id || isActive}
                    className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-colors ${styles.btn} disabled:opacity-60 flex items-center justify-center gap-2`}
                  >
                    {purchasing === plan.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isActive ? (
                      'Current Active Plan'
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Assurance banner */}
      <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Benefits of Dharashiv Premium</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <ShieldCheck className="w-8 h-8 text-red-700 shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">100% Verified Contacts</h4>
              <p className="text-xs text-gray-500 mt-0.5">Government ID verified phone numbers & addresses.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Crown className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Top Placement</h4>
              <p className="text-xs text-gray-500 mt-0.5">Profiles with premium get up to 5x more views and responses.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Zap className="w-8 h-8 text-blue-500 shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Instant Notifications</h4>
              <p className="text-xs text-gray-500 mt-0.5">Get notified immediately when your preferred match joins.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

