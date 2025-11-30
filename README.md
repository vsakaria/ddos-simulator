# DDoS Simulator - Classroom Teaching Tool

A safe, educational Next.js application that simulates DDoS attacks by counting button clicks. Perfect for teaching students about server load and request handling.

## ⚠️ Important

This is a **classroom-safe educational tool** that does NOT perform any real DDoS attacks. It only counts button clicks and displays them on a graph.

## Features

- **Student Clicker Page** (`/click`): Students click a button to send requests
- **Server Monitor Page** (`/monitor`): Real-time graph showing request count
- **Overload Detection**: Shows warning when count reaches 1600
- **Reset Functionality**: Reset counter to start fresh

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel KV (for data storage)
- Recharts (for graph visualization)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel KV

1. Go to your Vercel dashboard
2. Create a new KV database
3. Copy the connection details
4. Add to your `.env.local` file:

```env
KV_URL=your-kv-url
KV_REST_API_URL=your-rest-api-url
KV_REST_API_TOKEN=your-rest-api-token
KV_REST_API_READ_ONLY_TOKEN=your-read-only-token
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (KV credentials)
4. Deploy!

The app will automatically:
- Use Vercel KV for data storage
- Deploy with all dependencies
- Work immediately after deployment

## Project Structure

```
DDoS/
├── app/
│   ├── api/
│   │   ├── add-request/route.ts    # Increment counter
│   │   ├── status/route.ts         # Get current count
│   │   └── reset/route.ts          # Reset counter
│   ├── click/
│   │   └── page.tsx                # Student clicker page
│   ├── monitor/
│   │   └── page.tsx                # Server monitor page
│   ├── layout.tsx
│   ├── page.tsx                    # Home page
│   └── globals.css
├── components/
│   └── Graph.tsx                    # Chart component
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Usage in Classroom

1. **Setup**: Deploy to Vercel and share the URL
2. **Student Activity**: Have students visit `/click` and click the button repeatedly
3. **Monitor**: Teacher/students watch `/monitor` to see the graph rise
4. **Discussion**: When count reaches 1600, discuss server overload concepts
5. **Reset**: Use reset button to start a new simulation

## Safety Notes

- ✅ No real network attacks
- ✅ Only counts button clicks
- ✅ Safe for classroom use
- ✅ No external services affected
- ✅ All data stored in Vercel KV (isolated)

## License

Educational use only.

