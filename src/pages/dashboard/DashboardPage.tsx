import { PageContainer, PageHeader, Card } from '@components/common'
import { useAuthStore } from '@store/auth.store'

export const DashboardPage = () => {
  const { user } = useAuthStore()

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome, ${user?.name || 'User'}`}
        subtitle="Here's what's happening in your society"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Residents</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">0</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Complaints</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">0</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Maintenance Due</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">0</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Notices</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">0</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h2>
          <p className="text-gray-600 dark:text-gray-400">No recent activity to display.</p>
        </div>
      </Card>
    </PageContainer>
  )
}

