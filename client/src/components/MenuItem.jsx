import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ setsidebaropen }) => {
  return (
    <div className="px-6 text-gray-600 space-y-1 font-medium">
      {menuItemsData.map((item) => {
        const Icon = item.Icon

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => setsidebaropen(false)}
            className={({ isActive }) =>
              `px-3.5 py-2 flex items-center gap-3 rounded-xl ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'hover:bg-gray-50'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </div>
  )
}

export default MenuItem