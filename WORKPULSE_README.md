# WorkPulse - Workstation Efficiency Calculator

A complete React web application for calculating and tracking workstation efficiency metrics.

## Features Implemented ✅

### Core Functionality
- **Input Form** with 6 fields:
  - Workstation Name
  - Tasks Completed
  - Total Tasks Assigned
  - Hours Worked
  - Downtime (hours)
  - Quality Score (0-100)

### Calculations (Exact Formula)
```javascript
Completion Rate = tasksCompleted / totalTasks
Productive Hours = hoursWorked - downtime
Productivity Rate = productiveHours / hoursWorked
Tasks Per Hour = tasksCompleted / hoursWorked
Overall Efficiency Score = 40% × completionRate + 30% × productivityRate + 30% × (qualityScore/100)
```

### Display Features
- **Workstation Cards** showing:
  - Workstation name
  - Large overall efficiency % badge
  - 4 metric boxes: Completion Rate, Productivity, Tasks/Hour, Quality Score
  - Additional details (tasks, hours, downtime)
  - Delete button (trash icon)

- **Color Coding** based on efficiency:
  - 🟢 Green: 80%+ (Excellent)
  - 🟡 Yellow: 60-79% (Good)
  - 🔴 Red: <60% (Needs Improvement)

- **Average Efficiency Banner** at top showing:
  - Average efficiency across all workstations
  - Total workstation count

### UI/UX
- **Modern Design**:
  - Gradient blue background
  - White rounded cards with shadows
  - Smooth hover effects and transitions
  - Responsive grid layout

- **Responsive Grid**:
  - 1 column on mobile
  - 2 columns on large screens (lg breakpoint)

- **Icons** (lucide-react):
  - Calculator, TrendingUp, Clock, BarChart3, AlertCircle, Trash2

## Tech Stack

- **React 19** with functional components
- **Vite** for build tooling
- **Tailwind CSS 4** for styling
- **lucide-react** for icons
- **useState** hooks (no Redux)

## Quick Start

### Install Dependencies
```bash
cd c:\Coding\GoodGear
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
GoodGear/
├── src/
│   ├── App.jsx          # Main app wrapper
│   ├── WorkPulse.jsx    # Complete WorkPulse component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles + Tailwind
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## How to Use

1. **Fill in the form** with workstation data:
   - Enter a name for the workstation
   - Input tasks completed vs total tasks
   - Enter hours worked and any downtime
   - Provide a quality score (0-100)

2. **Calculate Efficiency**:
   - Click "Calculate Efficiency" button
   - Form clears automatically after submission

3. **View Results**:
   - See overall efficiency as a large badge
   - Review detailed metrics in smaller boxes
   - Check color-coded performance indicators

4. **Track Multiple Workstations**:
   - Add more workstations to compare
   - View average efficiency at the top
   - Delete any workstation with trash icon

## Validation

- All fields required
- Quality score must be 0-100
- Downtime cannot exceed hours worked
- Numeric fields must be positive

## Color Indicators

| Efficiency Range | Color | Badge | Card Border |
|-----------------|-------|-------|-------------|
| ≥ 80%          | Green | bg-green-500 | border-green-400 |
| 60-79%         | Yellow | bg-yellow-500 | border-yellow-400 |
| < 60%          | Red | bg-red-500 | border-red-400 |

## Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "lucide-react": "^0.556.0",
  "tailwindcss": "^4.1.17"
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly controls

## License

MIT License - See LICENSE file for details
