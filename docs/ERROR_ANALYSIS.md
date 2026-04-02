# Error Analysis & Diagnostics

The Aura Platform includes intelligent error analysis tools to help you quickly triage and fix issues.

## Quick Start

### Analyze a Specific Error

When you get an error report with a Support ID like `V4KFIPCB`:

```bash
node scripts/analyze-error.js V4KFIPCB
```

Output includes:
- **Error Category**: Type classification (Vite Code Splitting, Null Reference, Infinite Loop, etc.)
- **Likely Causes**: Common reasons this error occurs
- **Recommended Fixes**: Specific steps ordered by likelihood to help
- **Documentation**: Links to relevant MDN/Vite/React docs

### List All Errors

See all captured error reports with their Support IDs:

```bash
node scripts/analyze-error.js
```

### Error Categories & Remediation

The analyzer recognizes these error patterns:

#### Vite Code Splitting
**Symptom:** `Failed to fetch dynamically imported module`

**Causes:**
- Module file missing or incorrect path
- Build artifact not generated (missing dist/)
- Module syntax error preventing load
- Network error fetching chunk

**Fixes:**
1. `npm run build` (ensure dist assets exist)
2. Check browser DevTools Network tab for 404s
3. `npm run dev` and check for build errors
4. Verify file path matches import statement
5. Clear browser cache and hard refresh (Ctrl+Shift+R)

#### Null Reference  
**Symptom:** `Cannot read properties of undefined`

**Causes:**
- Component prop not passed or undefined
- API response missing expected field
- useState value not initialized
- Optional chaining (?.) not used

**Fixes:**
1. Check component props (DefaultProps, propTypes, JSDoc)
2. Verify API response structure
3. Use optional chaining: `obj?.field ?? defaultValue`
4. Add guards: `if (data) { ... }`
5. Check console for network errors

#### Type Mismatch
**Symptom:** `X is not a function`

**Causes:**
- Function not imported/exported correctly
- Variable named same as function (shadowing)
- Callback passed as value instead of function
- Module import failed silently

**Fixes:**
1. Verify import: `import { funcName } from 'path'`
2. Check export is named (not default)
3. Use arrow functions for callbacks: `onClick={() => func()}`
4. Check for circular imports
5. `npm run lint` to catch static errors

#### Infinite Loop
**Symptom:** `Maximum update depth exceeded`

**Causes:**
- setState in render or effect without dependency array
- Effect dependency missing, runs every render
- setState triggered by state change
- Recursive component mounting

**Fixes:**
1. Add dependency array: `useEffect(() => {...}, [])`
2. Check if dep changes trigger setState that changes deps
3. Use `useCallback` to memoize callback
4. Move setState from render to effects
5. Use React DevTools Profiler to find re-render loops

#### Asset Loading
**Symptom:** `Chunk load failed`

**Causes:**
- Production assets not deployed correctly
- CDN misconfigured
- Manifest.json or references broken
- Build hash mismatch

**Fixes:**
1. Verify build output: `ls dist/assets/`
2. Check HTML asset path references
3. Hard refresh and clear service worker cache
4. Ensure Content-Type headers correct
5. Check CORS if assets on different domain

#### Undefined Variable
**Symptom:** `ReferenceError: X is not defined`

**Causes:**
- Variable declared in wrong scope
- Typo in variable name
- Variable used before declaration
- Missing import or require

**Fixes:**
1. Check variable name spelling (case-sensitive)
2. Ensure declared before use
3. Verify import exists
4. Check block scope rules
5. `npm run lint` to catch errors

## Integration with Monitoring

Errors are automatically captured by the ErrorBoundary when they occur on the frontend. you can then:

1. **View in Admin CLI:**
   ```bash
   node scripts/admin.js errors 20
   ```

2. **Analyze specific error:**
   ```bash
   node scripts/analyze-error.js <supportId>
   ```

3. **Get error patterns:**
   ```bash
   curl http://127.0.0.1:8000/api/diagnostics/error-patterns
   ```

## Error Report Structure

Each error report includes:

```json
{
  "supportId": "V4KFIPCB",
  "sessionToken": "AURA-129282",
  "errorName": "TypeError",
  "errorMessage": "Failed to fetch dynamically imported module: ...",
  "stack": "Full JavaScript stack trace",
  "componentStack": "React component stack",
  "route": "/",
  "url": "http://localhost:5174/",
  "userAgent": "Browser string",
  "viewport": "4608x2188",
  "timestamp": "2026-04-02T05:04:09.495Z",
  "received_at": "2026-04-02T05:04:10.123Z"
}
```

## Debugging Workflow

1. **See the error in browser** → ErrorBoundary shows crash page
2. **Copy Support ID** from error details
3. **Analyze in terminal:**
   ```bash
   node scripts/analyze-error.js V4KFIPCB
   ```
4. **Read suggested fixes** ordered by likelihood
5. **Implement fix** and test with `npm run dev`
6. **Monitor for regressions** with `node scripts/admin.js errors`

## Common Resolutions

### Case Study: Support ID V4KFIPCB

Symptom:
- `TypeError: Failed to fetch dynamically imported module: /src/pages/dashboards/Dashboard.jsx`

Observed Root Causes:
1. Corrupted CSS file with null-byte characters in [frontend/src/styles/pages/dashboards/DashboardIndex.css](../frontend/src/styles/pages/dashboards/DashboardIndex.css), which broke module compilation for Dashboard lazy loading.
2. Broken re-export paths in [frontend/src/pages/video-ai/index.js](../frontend/src/pages/video-ai/index.js):
   - `./TextToVideo` did not exist
   - `./ImageToVideo/ImageToVideoDashboard` did not exist

Applied Fix:
1. Sanitized null bytes in Dashboard CSS.
2. Updated exports to existing modules:
   - `TextToVideoGenerator`
   - `ImageToVideo/ImageToVideoGenerator`

Verification:
1. `npm run build` completed successfully.
2. Dashboard bundle/assets were generated, including `DashboardIndex-*.css`.
3. Dynamic import failure no longer reproduced for dashboard route.

### "Failed to fetch dynamically imported module"
- Run `npm run build` to generate dist assets
- Hard refresh browser cache
- Check that Dashboard.jsx file exists at expected path

### "Cannot read properties of undefined"  
- Add null checks: `data?.field ?? 'default'`
- Check API response in DevTools Network tab

### "Maximum update depth exceeded"
- Add empty dependency array to effects: `useEffect(() => {...}, [])`
- Use React DevTools Profiler to find infinite re-render loop

### "Chunk load failed"
- Clear service worker: DevTools → Application → Clear storage
- Verify all assets loaded in Network tab
- Check CORS headers for CDN-hosted assets

## Tips

- **Copy full error details** from ErrorBoundary for better analysis
- **Check DevTools Network tab** for failed asset requests
- **Enable React DevTools Profiler** to find performance bottlenecks  
- **Use `npm run lint`** before committing to catch static errors
- **Clear browser cache** when debugging build issues (Ctrl+Shift+Delete)
