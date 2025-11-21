import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CollapsibleSidebar = ({ items, activeTab, onTabChange, user, title = "Dashboard" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Header */}
      <div className="p-6 border-b">
        {!isCollapsed ? (
          <>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 truncate">{user?.name}</p>
          </>
        ) : (
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors group ${
                activeTab === item.id ? 'bg-teal-50 text-teal-600 border-r-2 border-teal-600' : 'text-gray-600'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default CollapsibleSidebar;