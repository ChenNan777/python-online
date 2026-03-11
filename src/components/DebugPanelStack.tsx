import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";

export type DebugPanel = {
  key: string;
  title: ReactNode;
  content: ReactNode;
};

const HEADER_HEIGHT = 28; // px, approximate header height
const MIN_CONTENT_HEIGHT = 60;
const DEFAULT_CONTENT_HEIGHT = 140;
const RESIZE_HEIGHT = 2;

export default function DebugPanelStack({ panels }: { panels: DebugPanel[] }) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => {
    const firstKey = panels[0]?.key;
    return firstKey ? new Set([firstKey]) : new Set();
  });
  const [heights, setHeights] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const dragging = useRef<{ key: string; startY: number; startHeight: number } | null>(null);

  const getAvailableContentHeight = useCallback((
    nextOpenKeys: Set<string>,
    nextContainerHeight: number,
  ) => {
    const openCount = panels.filter((p) => nextOpenKeys.has(p.key)).length;
    const resizeTotal = Math.max(0, openCount - 1) * RESIZE_HEIGHT;
    return Math.max(0, nextContainerHeight - panels.length * HEADER_HEIGHT - resizeTotal);
  }, [panels]);

  const normalizeHeights = useCallback((
    nextOpenKeys: Set<string>,
    nextHeights: Record<string, number>,
    nextContainerHeight: number,
  ): Record<string, number> => {
    if (nextContainerHeight <= 0) return nextHeights;

    const openPanels = panels.filter((p) => nextOpenKeys.has(p.key));
    if (openPanels.length === 0) return nextHeights;

    const lastOpenKey = openPanels[openPanels.length - 1]?.key ?? null;
    const fixedKeys = openPanels
      .filter((p) => p.key !== lastOpenKey)
      .map((p) => p.key);

    if (fixedKeys.length === 0) return nextHeights;

    const available = getAvailableContentHeight(nextOpenKeys, nextContainerHeight);
    const availableForFixed = Math.max(0, available - MIN_CONTENT_HEIGHT);

    const pref: Record<string, number> = {};
    for (const key of fixedKeys) {
      pref[key] = Math.max(MIN_CONTENT_HEIGHT, nextHeights[key] ?? DEFAULT_CONTENT_HEIGHT);
    }

    let remainingKeys = [...fixedKeys];
    let remainingAvailable = availableForFixed;
    let remainingPrefSum = remainingKeys.reduce((sum, k) => sum + pref[k], 0);

    const out: Record<string, number> = { ...nextHeights };

    while (remainingKeys.length > 0) {
      if (remainingAvailable <= 0 || remainingPrefSum <= 0) {
        for (const k of remainingKeys) out[k] = MIN_CONTENT_HEIGHT;
        break;
      }

      const ratio = remainingAvailable / remainingPrefSum;
      const tooSmall = remainingKeys.filter((k) => pref[k] * ratio < MIN_CONTENT_HEIGHT);

      if (tooSmall.length === 0) {
        for (const k of remainingKeys) out[k] = Math.max(MIN_CONTENT_HEIGHT, Math.floor(pref[k] * ratio));
        break;
      }

      for (const k of tooSmall) {
        out[k] = MIN_CONTENT_HEIGHT;
        remainingAvailable -= MIN_CONTENT_HEIGHT;
        remainingPrefSum -= pref[k];
      }
      remainingKeys = remainingKeys.filter((k) => !tooSmall.includes(k));
    }

    return out;
  }, [getAvailableContentHeight, panels]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const ro = new ResizeObserver((entries) => {
      const next = Math.floor(entries[0]?.contentRect.height ?? node.clientHeight ?? 0);
      setContainerHeight(next);
      setHeights((prev) => normalizeHeights(openKeys, prev, next));
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [normalizeHeights, openKeys]);

  const toggle = (key: string) => {
    const nextOpenKeys = new Set(openKeys);
    if (nextOpenKeys.has(key)) nextOpenKeys.delete(key);
    else nextOpenKeys.add(key);

    const containerH = containerRef.current?.clientHeight ?? containerHeight;

    setHeights((prev) => {
      const nextHeights = { ...prev };
      if (nextOpenKeys.has(key) && !nextHeights[key]) {
        const nextOpenCount = nextOpenKeys.size;
        const available = getAvailableContentHeight(nextOpenKeys, containerH);
        const perPanel = available > 0 ? Math.floor(available / Math.max(nextOpenCount, 1)) : DEFAULT_CONTENT_HEIGHT;
        nextHeights[key] = Math.max(MIN_CONTENT_HEIGHT, Math.min(DEFAULT_CONTENT_HEIGHT, perPanel));
      }
      return normalizeHeights(nextOpenKeys, nextHeights, containerH);
    });

    setOpenKeys(nextOpenKeys);
  };

  const onMouseDown = useCallback((e: React.MouseEvent, key: string) => {
    e.preventDefault();
    dragging.current = {
      key,
      startY: e.clientY,
      startHeight: heights[key] ?? DEFAULT_CONTENT_HEIGHT,
    };
  }, [heights]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const { key, startY, startHeight } = dragging.current;
      const delta = e.clientY - startY;

      const containerH = containerRef.current?.clientHeight ?? containerHeight;
      const available = getAvailableContentHeight(openKeys, containerH);
      const openPanels = panels.filter((p) => openKeys.has(p.key));
      const lastOpenKey = openPanels[openPanels.length - 1]?.key ?? null;
      const fixedKeys = openPanels.filter((p) => p.key !== lastOpenKey).map((p) => p.key);
      const minLast = MIN_CONTENT_HEIGHT;

      setHeights((prev) => {
        const fixedHeightsSum = fixedKeys.reduce((sum, k) => {
          if (k === key) return sum;
          return sum + (prev[k] ?? DEFAULT_CONTENT_HEIGHT);
        }, 0);
        const maxForThis = Math.max(MIN_CONTENT_HEIGHT, available - fixedHeightsSum - minLast);
        const nextHeights = {
          ...prev,
          [key]: Math.max(MIN_CONTENT_HEIGHT, Math.min(maxForThis, startHeight + delta)),
        };
        return normalizeHeights(openKeys, nextHeights, containerH);
      });
    };
    const onMouseUp = () => { dragging.current = null; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [containerHeight, getAvailableContentHeight, normalizeHeights, openKeys, panels]);

  const openPanelIndices = panels
    .map((p, index) => (openKeys.has(p.key) ? index : -1))
    .filter((index) => index >= 0);
  const lastOpenIndex = openPanelIndices.length > 0 ? openPanelIndices[openPanelIndices.length - 1] : -1;

  const availableContentHeight = getAvailableContentHeight(openKeys, containerHeight);
  const openPanels = panels.filter((p) => openKeys.has(p.key));
  const lastOpenKey = openPanels.length > 0 ? openPanels[openPanels.length - 1]?.key ?? null : null;
  const fixedOpenKeys = openPanels.filter((p) => p.key !== lastOpenKey).map((p) => p.key);
  const fixedContentHeightSum = fixedOpenKeys.reduce(
    (sum, key) => sum + (heights[key] ?? DEFAULT_CONTENT_HEIGHT),
    0,
  );
  const minLastContentHeight = Math.min(MIN_CONTENT_HEIGHT, availableContentHeight);
  const lastContentHeight = lastOpenKey
    ? Math.max(minLastContentHeight, availableContentHeight - fixedContentHeightSum)
    : 0;

  return (
    <div ref={containerRef} className="h-full flex flex-col overflow-hidden theme-panel-strong theme-debug-panels">
      {panels.map((panel, index) => {
        const isOpen = openKeys.has(panel.key);
        const isLastOpen = isOpen && index === lastOpenIndex;
        const nextOpenIndex = openPanelIndices.find((i) => i > index) ?? -1;
        const canResize = isOpen && !isLastOpen && nextOpenIndex !== -1;
        const contentHeight = isLastOpen ? lastContentHeight : (heights[panel.key] ?? DEFAULT_CONTENT_HEIGHT);
        return (
          <div
            key={panel.key}
            data-open={isOpen ? "true" : "false"}
            className="flex flex-col shrink-0 theme-debug-panels__panel"
            style={{ height: isOpen ? HEADER_HEIGHT + contentHeight + (canResize ? RESIZE_HEIGHT : 0) : HEADER_HEIGHT }}
          >
            <button
              type="button"
              onClick={() => toggle(panel.key)}
              data-open={isOpen ? "true" : "false"}
              className="flex items-center justify-between w-full px-2 py-1.5 border-none text-xs font-semibold cursor-pointer shrink-0 text-left theme-toolbar theme-debug-panels__header"
              style={{ height: HEADER_HEIGHT }}
            >
              <span className="min-w-0 flex items-center gap-2">{panel.title}</span>
              <span className="text-[10px] ml-2 shrink-0 theme-debug-panels__chevron" style={{ color: 'var(--text-tertiary)' }}>
                ▸
              </span>
            </button>
            <div
              data-open={isOpen ? "true" : "false"}
              className="theme-debug-panels__content"
              style={{ height: isOpen ? contentHeight : 0 }}
            >
              <div className="h-full min-h-0 overflow-auto">{panel.content}</div>
            </div>
            {canResize ? (
              <div
                onMouseDown={(e) => onMouseDown(e, panel.key)}
                className="shrink-0 cursor-row-resize theme-debug-panels__resize"
                style={{ height: RESIZE_HEIGHT }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
