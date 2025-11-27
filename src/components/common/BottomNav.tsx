import { Home, Users, Wrench, MessageSquare, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '@store/ui.store'
import { cn } from '@utils/cn'

interface NavItem {
  label: string
  to: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/dashboard', icon: Home },
  { label: 'Residents', to: '/residents', icon: Users },
  { label: 'Maintenance', to: '/maintenance', icon: Wrench },
  { label: 'Complaints', to: '/complaints', icon: MessageSquare },
  { label: 'Profile', to: '/profile', icon: User },
]

export const BottomNav = () => {
  const { bottomNavVisible } = useUIStore()
  const location = useLocation()

  if (!bottomNavVisible) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

