# Map Right-Click Copy Coordinates Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enable users to copy map coordinates by right-clicking anywhere on the map.

**Architecture:** Add a contextmenu event handler to the Leaflet MapContainer that captures click coordinates, formats them as "纬度,经度", copies to clipboard using the Clipboard API, and shows a success message using Ant Design's message component.

**Tech Stack:** React, TypeScript, Leaflet, react-leaflet, Ant Design

---

## Task 1: Add Ant Design Message Import

**Files:**
- Modify: `src/components/MapPanel.tsx:1-5`

**Step 1: Add message import from antd**

Add the import at the top of the file:

```typescript
import { message } from 'antd';
```

**Step 2: Verify no TypeScript errors**

Run: `npm run build` or check in IDE
Expected: No compilation errors

**Step 3: Commit**

```bash
git add src/components/MapPanel.tsx
git commit -m "feat: add antd message import for coordinate copy feedback

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Implement Coordinate Copy Handler

**Files:**
- Modify: `src/components/MapPanel.tsx:28-95`

**Step 1: Add the handleContextMenu function**

Add this function inside the MapPanel component, after the useMemo hooks and before the return statement:

```typescript
  // Handle right-click to copy coordinates
  const handleContextMenu = async (e: L.LeafletMouseEvent) => {
    e.originalEvent.preventDefault(); // Prevent default context menu

    const { lat, lng } = e.latlng;
    const coordText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(coordText);
        message.success(`坐标已复制: ${coordText}`);
      } else {
        message.error('浏览器不支持复制功能');
      }
    } catch (error) {
      console.error('Failed to copy coordinates:', error);
      message.error('复制坐标失败');
    }
  };
```

**Step 2: Verify TypeScript compilation**

Run: `npm run build` or check in IDE
Expected: No compilation errors

**Step 3: Commit**

```bash
git add src/components/MapPanel.tsx
git commit -m "feat: add coordinate copy handler function

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Attach Event Handler to MapContainer

**Files:**
- Modify: `src/components/MapPanel.tsx:97-102`

**Step 1: Add eventHandlers prop to MapContainer**

Modify the MapContainer component to include the eventHandlers prop:

```typescript
      <MapContainer
        key={`map-${roadNetwork.start}-${roadNetwork.end}`}
        center={center as [number, number]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        eventHandlers={{
          contextmenu: handleContextMenu,
        }}
      >
```

**Step 2: Test the feature manually**

1. Run: `npm run dev`
2. Open the application in browser
3. Right-click anywhere on the map
4. Expected: Coordinates copied to clipboard and success message appears

**Step 3: Verify clipboard content**

1. After right-clicking, paste (Ctrl+V) into a text editor
2. Expected: Format should be "纬度,经度" (e.g., "28.228200, 112.938800")

**Step 4: Commit**

```bash
git add src/components/MapPanel.tsx
git commit -m "feat: attach contextmenu handler to map for coordinate copying

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Test Error Handling

**Files:**
- Test: Manual testing in browser

**Step 1: Test in browser without clipboard API**

1. Open browser DevTools Console
2. Run: `delete navigator.clipboard`
3. Right-click on map
4. Expected: Error message "浏览器不支持复制功能"

**Step 2: Test clipboard write failure**

1. Refresh page to restore clipboard API
2. In DevTools Console, run:
```javascript
navigator.clipboard.writeText = () => Promise.reject(new Error('test error'))
```
3. Right-click on map
4. Expected: Error message "复制坐标失败"

**Step 3: Verify normal operation still works**

1. Refresh page
2. Right-click on map
3. Expected: Success message and coordinates copied

---

## Task 5: Final Verification and Documentation

**Files:**
- Test: Full feature testing

**Step 1: Test coordinate precision**

1. Right-click at different locations on the map
2. Paste coordinates and verify format
3. Expected: Always 6 decimal places (e.g., "28.228200, 112.938800")

**Step 2: Test message display**

1. Right-click multiple times quickly
2. Expected: Messages appear and disappear correctly without stacking

**Step 3: Test across different browsers**

1. Test in Chrome, Firefox, and Edge
2. Expected: Feature works consistently across all browsers

**Step 4: Final commit if any adjustments made**

```bash
git add .
git commit -m "test: verify coordinate copy feature across browsers

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Completion Checklist

- [ ] Ant Design message imported
- [ ] handleContextMenu function implemented with error handling
- [ ] Event handler attached to MapContainer
- [ ] Coordinates copy in correct format (纬度,经度)
- [ ] Success message displays on successful copy
- [ ] Error handling works for unsupported browsers
- [ ] Feature tested in multiple browsers
- [ ] All changes committed with descriptive messages
