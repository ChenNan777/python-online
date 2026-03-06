import { useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import { getChallengeStartState } from '../../constants/challenge';
import { buildChallengePath, LOGIN_PATH } from '../../constants/routes';
import { useEffect } from 'react';
import './DashboardPage.css';

const { Title } = Typography;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, refreshTaskInfo } = useAuthStore();

  // 组件加载时刷新任务信息
  useEffect(() => {
    refreshTaskInfo();
  }, [refreshTaskInfo]);

  if (!user) {
    return null;
  }

  const handleStart = () => {
    navigate(buildChallengePath(user.role));
  };

  const handleLogout = async () => {
    await logout();
    navigate(LOGIN_PATH);
  };

  // 复用统一判定
  const { canStart, buttonText } = getChallengeStartState(user.role, user.task.taskStatus);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <Title level={2}>任务信息</Title>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title="任务信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="任务名称">{user.task.name}</Descriptions.Item>
              <Descriptions.Item label="当前阶段">{user.task.stage}</Descriptions.Item>
              <Descriptions.Item label="队伍名称">{user.team.name}</Descriptions.Item>
              <Descriptions.Item label="成员名称">{user.task.memberName}</Descriptions.Item>
              <Descriptions.Item label="成员角色">{user.task.memberRole}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card className="start-card" bordered={false}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={handleStart}
              disabled={!canStart}
              block
            >
              {buttonText}
            </Button>
          </Card>
        </Space>
      </div>
    </div>
  );
}
