# Map Right-Click Copy Coordinates Feature Design

## Overview

Add the ability to copy coordinates by right-clicking anywhere on the map. When the user right-clicks, the coordinates at that location will be copied to the clipboard in "纬度,经度" format, and a success message will be displayed.

## Requirements

- Right-click on map captures the clicked location's coordinates
- Coordinates copied in format: "纬度,经度" (e.g., "28.2282, 112.9388")
- Show toast notification confirming the copy action
- Non-intrusive user experience

## Architecture

### Implementation Location
All changes will be made in `src/components/MapPanel.tsx`.

### Approach
Use Leaflet's built-in `contextmenu` event system with custom handling:
1. Attach event handler to MapContainer's `contextmenu` event
2. Extract lat/lng from the event object
3. Format as "纬度,经度" string
4. Copy to clipboard using Clipboard API
5. Show success message using Ant Design's message component

### Components Involved
- **MapContainer**: Add `eventHandlers` prop with `contextmenu` handler
- **Clipboard API**: `navigator.clipboard.writeText()` for copying
- **Ant Design Message**: `message.success()` for user feedback

## Data Flow

1. User right-clicks on map
2. Leaflet fires `contextmenu` event with `latlng` object
3. Event handler extracts `lat` and `lng` from event
4. Format string: `${lat}, ${lng}`
5. Call `navigator.clipboard.writeText()`
6. Display success message: "坐标已复制: {lat}, {lng}"

## Error Handling

- Check if Clipboard API is available (`navigator.clipboard`)
- Catch and handle clipboard write failures
- Show error message if copy fails

## Testing Considerations

- Test on different browsers (Chrome, Firefox, Edge)
- Verify clipboard permissions work correctly
- Test coordinate precision (decimal places)
- Verify message appears and disappears correctly

## Future Enhancements

- Add more context menu options (e.g., "Add marker here")
- Allow user to configure coordinate format
- Support copying in different coordinate systems
