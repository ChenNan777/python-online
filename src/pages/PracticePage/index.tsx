import { useNavigate } from 'react-router-dom';
import { Card, Button, Space } from 'antd';
import { CodeOutlined, CompassOutlined, AimOutlined } from '@ant-design/icons';
import './PracticePage.css';

export default function PracticePage() {
  const navigate = useNavigate();

  return (
    <div className="practice-page">
      <Card className="practice-card" title="练习模式">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button
            size="large"
            block
            icon={<CodeOutlined />}
            onClick={() => navigate('/debugger')}
          >
            进入调试器
          </Button>

          <Button
            size="large"
            block
            icon={<CompassOutlined />}
            onClick={() => navigate('/practice/positioning')}
          >
            定位分析练习
          </Button>

          <Button
            size="large"
            block
            icon={<AimOutlined />}
            onClick={() => navigate('/practice/pathfinding')}
          >
            路径规划练习
          </Button>

          <Button
            size="large"
            block
            type="link"
            onClick={() => navigate('/login')}
          >
            返回登录
          </Button>
        </Space>
      </Card>
    </div>
  );
}
