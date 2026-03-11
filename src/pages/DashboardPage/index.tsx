import { useNavigate, useNavigationType } from 'react-router-dom';
import { Button, Card, Modal, Typography, message } from 'antd';
import { LogoutOutlined, ReloadOutlined, RocketOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { getChallengeStartState, getRoleLabel } from '../../constants/challenge';
import { buildChallengePath, LOGIN_PATH } from '../../constants/routes';
import { useEffect, useRef, useState } from 'react';
import './DashboardPage.css';

const { Paragraph, Title } = Typography;

export default function DashboardPage() {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const { user, logout, refreshTaskInfo } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const hasAutoRefreshed = useRef(false);

  useEffect(() => {
    if (!hasAutoRefreshed.current && user && navigationType === 'POP') {
      hasAutoRefreshed.current = true;
      void refreshTaskInfo();
    }
  }, [navigationType, refreshTaskInfo, user]);

  if (!user) {
    return null;
  }

  const handleStart = () => {
    if (!user.role || !user.task) {
      return;
    }

    if (user.task.isComplete) {
      return;
    }

    navigate(buildChallengePath(user.role));
  };

  const handleLogout = async () => {
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
  };

  const handleRefresh = async () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);
    try {
      const success = await refreshTaskInfo();
      if (success) {
        messageApi.success('任务已刷新');
      } else {
        messageApi.error('刷新任务失败');
      }
    } finally {
      setRefreshing(false);
    }
  };

  const isTaskCompleted = user.task?.isComplete === true;

  const startState = user.role && user.task && !isTaskCompleted
    ? getChallengeStartState(user.role, user.task.taskStatus)
    : (user.task
      ? { canStart: false, buttonText: isTaskCompleted ? '已完成' : '暂无任务' }
      : { canStart: false, buttonText: '暂无任务' });

  const taskStatusText = isTaskCompleted ? '已完成' : (user.task?.stage ?? '暂无任务');

  const infoItems = user.task ? [
    {
      label: '任务名称',
      value: user.task.name,
      emphasis: true,
    },
    {
      label: '队伍名称',
      value: user.team.name || '未分配队伍',
    },
    {
      label: '成员名称',
      value: user.task.memberName || user.username,
    },
    {
      label: '成员角色',
      value: user.task.memberRole || (user.role ? getRoleLabel(user.role) : '待分配'),
    },
  ] : [];

  const actionTitle = '开始作业';
  const actionHint = user.task
    ? (isTaskCompleted ? '已完成' : (startState.canStart ? '可开始' : startState.buttonText))
    : '暂无任务';
  const actionButtonText = user.task && user.role
    ? (isTaskCompleted ? '已完成' : startState.buttonText)
    : '暂无任务';

  return (
    <div className="dashboard-page">
      {contextHolder}
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-heading">
            <Title level={2}>任务信息</Title>
            <div className="dashboard-subtitle">在线作业平台 · 当前任务概览</div>
          </div>
          <div className="dashboard-actions">
            <Button
              className="dashboard-ghost-button"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={refreshing}
            >
              刷新任务
            </Button>
            <ThemeSwitcher />
            <Button
              className="dashboard-ghost-button"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              退出登录
            </Button>
          </div>
        </div>

        <div className="dashboard-grid">
          <Card bordered={false} className="dashboard-card dashboard-card--info">
            <div className="dashboard-card__header">
              <div>
                <div className="dashboard-card__eyebrow">任务概览</div>
                <div className="dashboard-card__title">当前任务</div>
              </div>
              <span className={`dashboard-status-pill${user.task ? '' : ' is-empty'}`}>
                {taskStatusText}
              </span>
            </div>

            {user.task ? (
              <div className="dashboard-info-list">
                {infoItems.map((item) => (
                  <div key={item.label} className="dashboard-info-item">
                    <span className="dashboard-info-item__label">{item.label}</span>
                    <span className={`dashboard-info-item__value${item.emphasis ? ' is-emphasis' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state dashboard-empty-state--expanded">
                <div className="dashboard-empty-state__icon">∅</div>
                <div className="dashboard-empty-state__title">暂无任务</div>
                <Paragraph className="dashboard-empty-state__text">当前账号暂未分配任务。</Paragraph>
              </div>
            )}
          </Card>

          {user.task ? (
            <Card className="dashboard-card start-card" bordered={false}>
              <div className="dashboard-card__header dashboard-card__header--compact">
                <div>
                  <div className="dashboard-card__eyebrow">操作面板</div>
                  <div className="dashboard-card__title dashboard-card__title--compact">{actionTitle}</div>
                </div>
              </div>

              <div className="start-card__footer">
                <span className={`dashboard-status-note${startState.canStart ? ' is-ready' : ''}`}>
                  {actionHint}
                </span>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={handleStart}
                  disabled={!startState.canStart}
                  className="dashboard-start-button"
                >
                  {actionButtonText}
                </Button>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
