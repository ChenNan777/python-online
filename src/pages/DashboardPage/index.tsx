import { useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Space, Typography } from 'antd';
import { LogoutOutlined, RocketOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
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
    const challengeType = user.role === 'positioning' ? 'positioning' : 'pathfinding';
    navigate(`/challenge/${challengeType}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const roleText = user.role === 'positioning' ? '定位分析' : '路径规划';

  // 判断按钮是否可用
  // taskStatus: 2-定位阶段, 3-规划阶段
  // 定位角色只能在 taskStatus=2 时开始，规划角色只能在 taskStatus=3 时开始
  const taskStatusNum = parseInt(user.task.taskStatus || '0', 10);
  const expectedStatus = user.role === 'positioning' ? 2 : 3;
  const canStart = taskStatusNum === expectedStatus;

  // 根据状态显示不同的按钮文字
  let buttonText: string;
  if (canStart) {
    buttonText = `开始${roleText}作业`;
  } else if (taskStatusNum < expectedStatus) {
    buttonText = '未开始';
  } else {
    buttonText = '已结束';
  }

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
