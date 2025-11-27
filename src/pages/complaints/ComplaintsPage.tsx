import { PageContainer, PageHeader, Card, Button, EmptyState } from '@components/common'
import { Plus } from 'lucide-react'

export const ComplaintsPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Complaints"
        subtitle="View and manage complaints"
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Complaint
          </Button>
        }
      />

      <Card>
        <EmptyState
          title="No Complaints"
          message="You haven't filed any complaints yet."
          actionLabel="New Complaint"
          onAction={() => {}}
        />
      </Card>
    </PageContainer>
  )
}

