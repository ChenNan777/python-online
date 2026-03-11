import { Button, Descriptions, Drawer, Form, InputNumber } from 'antd';
import type { Feature, LineString } from 'geojson';
import { useEffect, useMemo } from 'react';

type Props = {
  feature: Feature<LineString> | null;
  featureId: string | null;
  overrides: Record<string, { weight: number }>;
  onChange: (id: string, values: { weight: number }) => void;
  onClose: () => void;
};

function calculateLength(coords: number[][]) {
  let length = 0;
  const R = 6371e3; // meters

  for (let i = 1; i < coords.length; i++) {
    const [lng1, lat1] = coords[i - 1];
    const [lng2, lat2] = coords[i];

    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    length += R * c;
  }

  return length;
}

export default function ConfigPanel({ feature, featureId, overrides, onChange, onClose }: Props) {
  const [form] = Form.useForm();

  const currentWeight = useMemo(() => {
    if (!featureId) return 1.0;
    if (overrides[featureId]?.weight !== undefined) {
      return overrides[featureId].weight;
    }
    return feature?.properties?.weight ?? 1.0;
  }, [featureId, overrides, feature]);

  useEffect(() => {
    if (featureId) {
      form.setFieldsValue({ weight: currentWeight });
    }
  }, [featureId, currentWeight, form]);

  const length = useMemo(() => {
    if (!feature) return 0;
    return calculateLength(feature.geometry.coordinates);
  }, [feature]);

  if (!feature || !featureId) return null;

  const handleSave = () => {
    form.validateFields().then((values) => {
      onChange(featureId, values);
    });
  };

  return (
    <Drawer
      title="路段配置"
      placement="right"
      onClose={onClose}
      open={!!feature}
      mask={false}
      getContainer={false}
      width={320}
      styles={{
        body: { padding: '16px' },
        wrapper: {
          boxShadow: 'var(--shadow-panel)',
          borderLeft: '1px solid var(--border-default)',
        },
      }}
    >
      <Form form={form} layout="vertical">
        <Descriptions column={1} bordered size="small" className="mb-6">
          <Descriptions.Item label="ID">
            <span className="text-xs break-all">{featureId}</span>
          </Descriptions.Item>
          <Descriptions.Item label="长度">{length.toFixed(2)} m</Descriptions.Item>
        </Descriptions>

        <Form.Item
          label="权重 (Weight)"
          name="weight"
          rules={[{ required: true, message: '请输入权重' }]}
          help="数值越大，路径规划时越倾向于避开此路段"
        >
          <InputNumber step={0.1} min={0} className="w-full" />
        </Form.Item>

        <div className="flex gap-2 mt-8">
          <Button type="primary" onClick={handleSave} block>
            应用更改
          </Button>
          <Button
            onClick={() => {
              form.setFieldsValue({ weight: 1.0 });
              handleSave();
            }}
          >
            重置
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}
