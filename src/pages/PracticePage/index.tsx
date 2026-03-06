import { useNavigate } from 'react-router-dom';
import { Card, Button, Space } from 'antd';
import { CodeOutlined, CompassOutlined, AimOutlined } from '@ant-design/icons';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { PATHFINDING_TYPE, POSITIONING_TYPE } from '../../constants/challenge';
import {
  buildPracticeChallengePath,
  DEBUGGER_PATH,
  LOGIN_PATH,
} from '../../constants/routes';
import './PracticePage.css';

export default function PracticePage() {
  const navigate = useNavigate();

  return (
    <div className="practice-page">
      <div className="practice-shell">
        <div className="practice-switcher">
          <ThemeSwitcher />
        </div>
        <Card className="practice-card" title="练习模式">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Button
              size="large"
              block
              icon={<CodeOutlined />}
              onClick={() => navigate(DEBUGGER_PATH)}
            >
              进入调试器
            </Button>

            <Button
              size="large"
              block
              icon={<CompassOutlined />}
              onClick={() => navigate(buildPracticeChallengePath(POSITIONING_TYPE))}
            >
              定位分析练习
            </Button>

            <Button
              size="large"
              block
              icon={<AimOutlined />}
              onClick={() => navigate(buildPracticeChallengePath(PATHFINDING_TYPE))}
            >
              路径规划练习
            </Button>

            <Button
              size="large"
              block
              type="link"
              onClick={() => navigate(LOGIN_PATH)}
            >
              返回登录
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
