import { PageContainer, PageHeader, Card, Button, EmptyState } from '@components/common'
import { Plus } from 'lucide-react'

export const SocietyPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Society Management"
        subtitle="Manage your society details and settings"
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Society
          </Button>
        }
      />

      <Card>
        <EmptyState
          title="No Society Found"
          message="Get started by adding your first society."
          actionLabel="Add Society"
          onAction={() => {}}
        />
      </Card>
    </PageContainer>
  )
}

