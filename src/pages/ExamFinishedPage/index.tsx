import { Button, Card, Modal, Result, Typography } from 'antd';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { DASHBOARD_PATH, LOGIN_PATH } from '@/constants/routes';
import { useAuthStore } from '@/store/useAuthStore';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import '../DashboardPage/DashboardPage.css';

const { Title } = Typography;

export default function ExamFinishedPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const refreshTaskInfo = useAuthStore((state) => state.refreshTaskInfo);
  const [refreshingTask, setRefreshingTask] = useState(false);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-heading">
            <Title level={2}>考试结束</Title>
            <div className="dashboard-subtitle">在线作业平台 · 作业提交确认</div>
          </div>
          <div className="dashboard-actions">
            <ThemeSwitcher />
            <Button
              className="dashboard-ghost-button"
              icon={<LogoutOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: '确认退出登录？',
                  content: '退出后将返回登录页。',
                  okText: '退出登录',
                  cancelText: '取消',
                  okButtonProps: { danger: true },
                  onOk: async () => {
                    await logout();
                    navigate(LOGIN_PATH, { replace: true });
                  },
                });
              }}
            >
              退出登录
            </Button>
          </div>
        </div>

        <Card bordered={false} className="dashboard-card">
          <Result
            status="success"
            title="作业提交成功"
            subTitle="您已完成本次考试作业，请耐心等待评分结果。"
            extra={[
              <Button
                key="dashboard"
                type="primary"
                icon={<DashboardOutlined />}
                loading={refreshingTask}
                onClick={async () => {
                  setRefreshingTask(true);
                  try {
                    await refreshTaskInfo();
                  } finally {
                    setRefreshingTask(false);
                    navigate(DASHBOARD_PATH);
                  }
                }}
              >
                返回任务列表
              </Button>,
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
