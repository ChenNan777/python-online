import { useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import './DashboardPage.css';

const { Title } = Typography;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  if (!user) {
    return null;
  }

  const handleStart = () => {
    const challengeType = user.role === 'positioning' ? 'positioning' : 'pathfinding';
    navigate(`/challenge/${challengeType}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const roleText = user.role === 'positioning' ? '定位分析' : '路径规划';
  const buttonText = user.role === 'positioning'
    ? '开始方位角定位挑战'
    : '开始路径规划挑战';

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
          <Card title="用户信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
              <Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="队伍信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="队伍名称">{user.team.name}</Descriptions.Item>
              <Descriptions.Item label="队伍ID">{user.team.id}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="任务信息" bordered={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="任务名称">{user.task.name}</Descriptions.Item>
              <Descriptions.Item label="任务描述">{user.task.description}</Descriptions.Item>
              <Descriptions.Item label="分配角色">
                <span className={`role-badge role-${user.role}`}>
                  {roleText}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card className="start-card" bordered={false}>
            <div className="start-content">
              <p className="start-hint">
                你的角色是 <strong>{roleText}</strong>，点击下方按钮开始作业
              </p>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                onClick={handleStart}
                block
              >
                {buttonText}
              </Button>
            </div>
          </Card>
        </Space>
      </div>
    </div>
  );
}
