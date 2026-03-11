import { Button, Layout, message, Spin } from 'antd';
import type { Feature, FeatureCollection, LineString } from 'geojson';
import { useMemo, useState } from 'react';

import PageToolbar from '@/components/PageToolbar';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useExamRoadDataQuery } from '@/pages/ChallengePage/queries/useExamRoadDataQuery';
import { useSaveExamRoadDataMutation } from '@/pages/ChallengePage/queries/useSaveExamRoadDataMutation';

import ConfigPanel from './components/ConfigPanel';
import RoadNetworkMap from './components/RoadNetworkMap';

export default function RoadNetworkConfigPage() {
  const { data: roadDataStr, isLoading, error } = useExamRoadDataQuery();
  const saveMutation = useSaveExamRoadDataMutation();

  const geojson = useMemo(() => {
    if (!roadDataStr) return null;
    try {
      return JSON.parse(roadDataStr) as FeatureCollection;
    } catch (e) {
      console.error('Failed to parse GeoJSON', e);
      return null;
    }
  }, [roadDataStr]);

  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, { weight: number }>>({});

  const selectedFeature = useMemo(() => {
    if (!geojson || !selectedFeatureId) return null;
    
    // Logic must match RoadNetworkMap ID generation
    const found = geojson.features.find((f, index) => {
        const fId = f.id ? String(f.id) : `feature-${index}`;
        return fId === selectedFeatureId;
    });
    
    return (found?.geometry.type === 'LineString' ? found : null) as Feature<LineString> | null;
  }, [geojson, selectedFeatureId]);

  const handleConfigChange = (id: string, values: { weight: number }) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: values,
    }));
    message.success('配置已更新（仅本地生效）');
  };

  const handleSave = async () => {
    if (!geojson) return;

    try {
      // Create a fresh copy with updated properties
      const newGeojson: FeatureCollection = {
        ...geojson,
        features: geojson.features.map((feature, index) => {
          // Logic must match RoadNetworkMap ID generation
          const fId = feature.id ? String(feature.id) : `feature-${index}`;
          const override = overrides[fId];
          
          if (override) {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                weight: override.weight,
              },
            };
          }
          return feature;
        }),
      };

      await saveMutation.mutateAsync(newGeojson);
      
      setOverrides({});
    } catch (err) {
      console.error(err);
      // Error message is handled by mutation or global handler, but adding specific feedback here
      // message.error('保存失败'); 
    }
  };

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"><Spin tip="加载路网数据..." /></div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center text-red-500">加载路网数据失败</div>;
  }

  return (
    <Layout className="flex flex-col h-full theme-page theme-app">
      <Layout.Header className="px-2! h-12! shrink-0 theme-toolbar">
        <PageToolbar
          className="flex items-center h-full"
          leftContent={<span className="text-sm font-semibold">路网配置 </span>}
          rightContent={
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <Button
                type="primary"
                onClick={handleSave}
                loading={saveMutation.isPending}
                disabled={!geojson}
              >
                保存配置
              </Button>
            </div>
          }
        />
      </Layout.Header>

      <div className="flex-1 relative min-h-0">
        <RoadNetworkMap
          geojson={geojson}
          selectedFeatureId={selectedFeatureId}
          overrides={overrides}
          onSelectFeature={setSelectedFeatureId}
        />

        <ConfigPanel
          feature={selectedFeature}
          featureId={selectedFeatureId}
          overrides={overrides}
          onChange={handleConfigChange}
          onClose={() => setSelectedFeatureId(null)}
        />
      </div>
    </Layout>
  );
}
