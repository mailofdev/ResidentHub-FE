import { PageContainer, PageHeader, Card, Button, EmptyState } from '@components/common'
import { Plus } from 'lucide-react'

export const MaintenancePage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Maintenance & Payments"
        subtitle="Track maintenance charges and payments"
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </Button>
        }
      />

      <Card>
        <EmptyState
          title="No Maintenance Records"
          message="Maintenance records will appear here once added."
          actionLabel="Add Payment"
          onAction={() => {}}
        />
      </Card>
    </PageContainer>
  )
}

