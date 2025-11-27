import { PageContainer, PageHeader, Card, Input, Button } from '@components/common'
import { useAuthStore } from '@store/auth.store'

export const ProfilePage = () => {
  const { user } = useAuthStore()

  return (
    <PageContainer maxWidth="lg">
      <PageHeader title="Profile" subtitle="Manage your account settings" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {user?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              {user?.role}
            </p>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Personal Information
              </h2>
              <Input label="Full Name" value={user?.name || ''} fullWidth disabled />
              <Input label="Email" type="email" value={user?.email || ''} fullWidth disabled />
              <Input
                label="Phone Number"
                type="tel"
                value={user?.phone || ''}
                fullWidth
                disabled
              />
              <Button variant="primary">Update Profile</Button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

