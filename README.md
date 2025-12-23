# SNAP Admin Dashboard

A comprehensive, modern admin dashboard for the SNAP delivery service. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Dashboard Overview
- Real-time analytics and key metrics
- Revenue and order trends
- Order status distribution
- Recent orders monitoring
- Performance indicators

### Orders Management
- Complete order tracking system
- Detailed order information with customer and delivery partner details
- Interactive map for delivery route visualization
- Order status timeline
- Search and filter capabilities
- Export functionality

### Customer Management
- Customer database with search and filtering
- User profile management
- Wallet funding capabilities
- Account suspension/activation
- User deletion
- Customer statistics and insights

### Delivery Partners Management
- Partner profiles with ratings
- Vehicle information tracking
- Active deliveries monitoring
- Earnings tracking
- Partner activation/deactivation
- Performance metrics

### Transactions
- Complete transaction history
- Multiple payment methods support
- Transaction status tracking
- Search and filtering by type and status
- Revenue analytics
- Export reports

### Analytics & Reports
- Revenue and order trends
- Category distribution analysis
- Weekly performance metrics
- Top delivery routes
- Customer acquisition metrics
- Customizable date ranges

### Settings
- Profile management
- Security settings with 2FA
- Notification preferences
- System configuration
- Payment settings
- Commission rate management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Font Awesome
- **Maps**: React Leaflet
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd Snap-Admin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The dashboard will automatically redirect to `/dashboard`.

## Project Structure

```
Snap-Admin/
├── app/
│   ├── dashboard/          # Dashboard overview page
│   ├── orders/            # Orders management
│   ├── customers/         # Customer management
│   ├── delivery-partners/ # Delivery partners management
│   ├── transactions/      # Transaction history
│   ├── analytics/         # Analytics and reports
│   ├── settings/          # Settings page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (redirects to dashboard)
├── components/
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Top header with search
│   ├── OrderDetailsModal.tsx  # Order details modal
│   └── MapComponent.tsx   # Leaflet map component
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## Color Scheme

The dashboard uses SNAP's brand colors:

- **Primary Red**: #FF3333
- **Dark Background**: #0A0E27
- **Light Gray**: #F5F5F5

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Breakdown

### Responsive Design
- Fully responsive on desktop, tablet, and mobile
- Collapsible sidebar on mobile devices
- Touch-friendly interface
- Optimized layouts for all screen sizes

### User Management
- View all customers
- Edit customer information
- Fund customer wallets
- Suspend/activate accounts
- Delete users
- Track customer statistics

### Order Tracking
- Real-time order status
- Delivery route mapping
- Customer and delivery partner information
- Order timeline
- Multiple status filters
- Search by order ID, tracking number, or customer

### Analytics
- Revenue trends
- Order volume analysis
- Category distribution
- Route performance
- Customer growth
- Customizable time periods

## Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#FF3333',
    dark: '#E62E2E',
    light: '#FF5555',
  },
}
```

### Adding New Pages
1. Create a new folder in the `app` directory
2. Add a `page.tsx` file
3. Update the sidebar navigation in `components/Sidebar.tsx`

### Connecting to Backend API
Replace the mock data in each page with actual API calls:

```typescript
// Example
const fetchOrders = async () => {
  const response = await fetch('/api/orders')
  const data = await response.json()
  return data
}
```

## Production Deployment

### Build the application:
```bash
npm run build
```

### Deploy to Vercel (Recommended):
```bash
vercel
```

### Deploy to other platforms:
The built application in the `.next` folder can be deployed to any Node.js hosting platform.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Real-time notifications with WebSockets
- Advanced reporting and data export
- Multi-language support
- Dark mode theme
- Role-based access control
- API integration
- Database connectivity
- Authentication system
- Real-time delivery tracking

## License

This project is created for SNAP Delivery Service.

## Support

For support, email admin@snap.com or contact the development team.
