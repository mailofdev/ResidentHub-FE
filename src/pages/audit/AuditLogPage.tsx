import { PageContainer, PageHeader, Card, EmptyState } from '@components/common'

export const AuditLogPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Audit Log"
        subtitle="View all system activities and changes"
      />

      <Card>
        <EmptyState
          title="No Audit Logs"
          message="Audit logs will appear here as activities occur."
        />
      </Card>
    </PageContainer>
  )
}

