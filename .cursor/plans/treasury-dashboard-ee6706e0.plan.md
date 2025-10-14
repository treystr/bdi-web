<!-- ee6706e0-1d37-451e-b1a4-d85b67df74cc ab54673a-dbef-42b6-aaab-1a95ddfc5be6 -->
# Treasury Dashboard Implementation Plan

## Overview

Transform the existing "Coming Soon" treasury dashboard placeholder into a functional daily-updated balance display using n8n automation, GitHub Actions, and static JSON data files.

## Implementation Approach

**Static Data with Daily Updates**: Use n8n to fetch balances from Mercury Bank and Strike.me APIs, commit updated JSON data to the repository, and trigger GitHub Actions to rebuild the site daily.

## Key Components

### 1. Data Structure & Storage

- Create `src/data/treasury.json` to store balance data
- Structure: `{ "lastUpdated": "ISO date", "usd": { "total": number }, "btc": { "total": number } }`
- Add treasury data type definitions in `src/types/treasury.ts`

### 2. Treasury Page Creation

- Create `/treasury` page at `src/pages/treasury/index.astro`
- Use existing `FullScreenHero` and `Stats` components from the theme
- Replace transparency page "Coming Soon" link with actual `/treasury` link
- Display total USD and BTC balances with last updated timestamp

### 3. Treasury Components

- Create `TreasuryStats.astro` component extending the existing `Stats` component
- Add balance formatting utilities in `src/utils/treasury.ts`
- Include loading states and error handling for missing data

### 4. n8n Automation Setup

- Configure n8n workflow to fetch Mercury Bank API data
- Add Strike.me API integration for fiat and Bitcoin balances  
- Calculate totals and format data structure
- Commit updated `treasury.json` to repository daily
- Trigger GitHub Actions rebuild after data update

### 5. GitHub Actions Integration

- Modify existing `.github/workflows/deploy.yml` to handle treasury data updates
- Add environment variables for API credentials (Mercury, Strike.me)
- Ensure builds trigger on treasury data file changes

## File Changes Required

- `src/pages/treasury/index.astro` (new)
- `src/data/treasury.json` (new) 
- `src/types/treasury.ts` (new)
- `src/utils/treasury.ts` (new)
- `src/components/sections/TreasuryStats.astro` (new)
- `src/pages/transparency/index.astro` (update link)
- `src/data/menu.ts` (add treasury nav item)

## Security Considerations

- Treasury data will be public (as intended for transparency)
- API credentials stored securely in n8n, not in repository
- No sensitive account details exposed, only total balances

This approach maintains your static hosting preference while providing daily balance updates through automated data commits and rebuilds.

### To-dos

- [ ] Create treasury data structure and JSON file with sample data
- [ ] Build /treasury page using existing theme components
- [ ] Create TreasuryStats component and utility functions
- [ ] Add treasury link to navigation menu and update transparency page
- [ ] Configure n8n automation for Mercury Bank and Strike.me API integration
- [ ] Update GitHub Actions workflow for treasury data handling