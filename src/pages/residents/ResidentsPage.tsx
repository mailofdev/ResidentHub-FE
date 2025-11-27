import { PageContainer, PageHeader, Card, Button, EmptyState } from '@components/common'
import { Plus } from 'lucide-react'

export const ResidentsPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Residents"
        subtitle="Manage all residents in your society"
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Resident
          </Button>
        }
      />

      <Card>
        <EmptyState
          title="No Residents Found"
          message="Get started by adding your first resident."
          actionLabel="Add Resident"
          onAction={() => {}}
        />
      </Card>
    </PageContainer>
  )
}

