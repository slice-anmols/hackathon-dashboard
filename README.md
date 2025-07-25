# Lead Dashboard

A React application with Tailwind CSS that displays lead data in a beautiful grid layout with sorting functionality.

## Features

- 📊 **Lead Data Display**: Shows comprehensive lead information in card format
- 🎯 **Lead Analysis**: Highlights lead inference data with score breakdowns
- 🔄 **Sorting**: Sort leads by lead score in ascending or descending order
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Real-time Updates**: Refresh button to fetch latest data
- 🛡️ **Error Handling**: Graceful error handling with retry functionality
- 🎨 **Modern UI**: Beautiful design with Tailwind CSS

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Backend URL**
   Create a `.env` file in the root directory:
   ```bash
   REACT_APP_BACKEND_URL=http://localhost:3001
   ```
   
   Replace `http://localhost:3001` with your actual backend URL.

3. **Start Development Server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000).

## Backend API Requirements

The application expects your backend to have the following endpoint:

- **GET** `/webhook/get-leads`
- **Response**: Array of lead objects

### Lead Object Structure

```typescript
{
  "userid": "user15",
  "company": "",
  "typeOfBusiness": "food shop",
  "turnover": "0",
  "profitMargin": "0",
  "loanAmount": 0,
  "reasonForLoan": "to buy a ferrari",
  "durationOfLoan": "",
  "collateral": "",
  "shortSummary": "User operates a food shop and wants to take a loan to buy a Ferrari.",
  "leadInference": {
    "userId": "user15",
    "leadScore": 45,
    "leadCategory": "Average Lead",
    "priority": "Medium",
    "recommendedAction": "Follow up within 2-3 days",
    "conversionProbability": "20-45%",
    "scoreBreakdown": {
      "businessType": 12,
      "businessClarity": 6,
      "loanRatio": 5,
      "turnover": 3,
      "loanPurpose": 6,
      "growthIntent": 4,
      "collateral": 5,
      "completeness": 4,
      "penalty": 0
    },
    "totalPossibleScore": 100,
    "processedAt": "2025-07-24T13:52:27.938Z"
  }
}
```

**Note**: The `leadInference` field is optional. Cards without this field will show "No lead analysis available".

## Features Explained

### Lead Cards
Each lead is displayed in a card showing:
- Company information and user ID
- Business details (type, turnover, loan amount, profit margin)
- Loan details (reason, duration, collateral)
- Summary of the lead
- **Lead Analysis** (highlighted section):
  - Lead score with visual progress bar
  - Lead category and priority
  - Conversion probability
  - Recommended action
  - Detailed score breakdown
  - Processing timestamp

### Sorting
- Click "Sort by Lead Score" to toggle between ascending and descending order
- Leads without lead inference data are sorted with a score of 0

### Error Handling
- Displays helpful error messages if the backend is unreachable
- Shows the configured backend URL for debugging
- Retry button to attempt reconnection

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Fetch API** for HTTP requests
- **Environment Variables** for configuration

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx      # Main dashboard component
│   └── LeadCard.tsx       # Individual lead card component
├── services/
│   └── leadService.ts     # API service for fetching leads
├── types/
│   └── Lead.ts           # TypeScript interfaces
├── App.tsx               # Root component
└── index.css             # Tailwind CSS imports
```

## Troubleshooting

1. **Backend Connection Issues**
   - Check that your backend server is running
   - Verify the `REACT_APP_BACKEND_URL` in your `.env` file
   - Ensure CORS is properly configured on your backend

2. **No Data Displayed**
   - Check the browser console for errors
   - Verify your backend endpoint returns the expected JSON format
   - Ensure the response is an array of lead objects

3. **Styling Issues**
   - Make sure Tailwind CSS is properly installed
   - Check that `tailwind.config.js` includes the correct content paths

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API base URL | `http://localhost:3001` |

Remember to restart the development server after changing environment variables.
