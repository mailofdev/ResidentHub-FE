import { PageContainer, PageHeader, Card, Button, EmptyState } from '@components/common'
import { Plus } from 'lucide-react'

export const NoticesPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Notice Board"
        subtitle="View all society notices and announcements"
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Notice
          </Button>
        }
      />

      <Card>
        <EmptyState
          title="No Notices"
          message="No notices have been posted yet."
          actionLabel="New Notice"
          onAction={() => {}}
        />
      </Card>
    </PageContainer>
  )
}

