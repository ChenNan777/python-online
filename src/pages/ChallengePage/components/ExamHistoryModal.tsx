import { Button, Empty, List, Modal, Space, Typography } from 'antd';

import type { StudentOperationCodeVo } from '@/services/admin/types';

type ExamHistoryModalProps = {
  open: boolean;
  loading: boolean;
  refreshing?: boolean;
  hasError?: boolean;
  records: StudentOperationCodeVo[];
  onClose: () => void;
  onRestore: (record: StudentOperationCodeVo) => void;
  onRefresh?: () => void;
};

function buildRecordTime(record: StudentOperationCodeVo): string {
  return record.updatedAt ?? record.submitTime ?? record.createdAt ?? '未知时间';
}

export default function ExamHistoryModal(props: ExamHistoryModalProps) {
  const { open, loading, refreshing = false, hasError = false, records, onClose, onRestore, onRefresh } = props;

  return (
    <Modal
      title={(
        <Space size={8} wrap>
          <span>历史代码</span>
          {onRefresh ? (
            <Button size="small" loading={refreshing} disabled={loading} onClick={onRefresh}>
              刷新
            </Button>
          ) : null}
          {hasError ? <Typography.Text type="danger">加载失败</Typography.Text> : null}
        </Space>
      )}
      open={open}
      width={920}
      footer={null}
      onCancel={onClose}
      destroyOnHidden
    >
      {records.length === 0 ? (
        <Empty description={loading ? '历史代码加载中' : hasError ? '历史代码加载失败' : '暂无历史代码'} />
      ) : (
        <List
          loading={loading}
          dataSource={records}
          renderItem={(record) => (
            <List.Item
              actions={[
                <Button key="restore" size="small" onClick={() => onRestore(record)}>
                  恢复到编辑器
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={(
                  <Space size={8} wrap>
                    <Typography.Text>{buildRecordTime(record)}</Typography.Text>
                    <Typography.Text type="secondary">
                      {record.programmingLanguage ?? 'Python'}
                    </Typography.Text>
                  </Space>
                )}
                description={(
                  <div>
                    {record.codeDescription ? (
                      <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
                        {record.codeDescription}
                      </Typography.Paragraph>
                    ) : null}
                    <pre className="max-h-48 overflow-auto rounded-md theme-subtle p-3 text-xs leading-5 m-0">
                      {record.sourceCode ?? '# 无代码内容'}
                    </pre>
                  </div>
                )}
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}
