# Skip Hire Platform 🚛

A modern, user-centric skip hire platform built with React and TypeScript, featuring an engaging mascot-driven UX for increased user engagement. Click here to see how it is used in the live version: https://www.wewantwasteimproved.vercel.app

**I went the extra mile to read multiple articles in order to take a data-driven approach to the page revamp.**

'wewantwaste' is a catchy, memorable name, it's fun to say, almost playful. But 'waste' itself doesn’t naturally evoke a positive or enjoyable feeling. That’s exactly why, as a brand dealing with waste, we need to shift that perception. We’re not just managing waste, we’re rebranding it. By pairing a bold name with engaging design, clear messaging and a playful mascot, we can make the experience feel approachable, modern, and even fun. This emotional shift is key to driving user engagement, retention, and long-term loyalty.

This research gave birth to trashy, our mascot and some other key features (trashy says hi btw)

<img src="/public/mascot.png" alt="Trashy" width="300" />

## 🌟 Key Features

- **Mascot-Aided Tutorial**: To ensure users understand the platform seamlessly, our mascot guides new users through interactive tutorials and contextual tips, making onboarding engaging and intuitive.  
  _Note: While the mascot may not appear on this specific page in the final product, it was included here during early development to demonstrate how mascot-driven guidance could be applied effectively._

- **Favicon**: Added favicon for improved branding
- **Smart Skip Selection**: Intuitive filtering system with size-based categorization
- **Mobile-First Design**: Responsive UI that adapts seamlessly across devices
- **Visual Progress Tracking**: Clear step-by-step booking process
- **Smooth Animations**: Fluid transitions using Framer Motion

## 🛠 Technology Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Code Quality**: ESLint + TypeScript strict mode

## 💡 Technical Implementation

### Type-Safe Architecture

```typescript
// Strong typing for domain models
interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

// Custom hooks with proper typing
const useFilter = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  return { filter, setFilter };
};
```

### Component Features

- **Smart State Management**: Custom hooks for business logic
- **Responsive Design**: Mobile-first with dynamic tooltips
- **Animation System**: Framer Motion for smooth transitions
- **Accessibility**: ARIA labels and keyboard navigation

### Project Structure

```
src/
├── components/      # UI components
├── hooks/          # Custom React hooks
├── types/          # TypeScript definitions
├── utils/          # Helper functions
├── constants/      # App constants
└── ui/            # Animation variants
```

## 🎨 UX Design Philosophy

### Mascot Integration Strategy

Our mascot-driven UX strategy is backed by extensive research and data:

| Benefit Area            | Impact Metric          | Source                   |
| ----------------------- | ---------------------- | ------------------------ |
| 🧠 Emotional Connection | +23% User Retention    | Forrester Research, 2023 |
| 🧩 Brand Recognition    | +37% Brand Recall      | Nielsen Study, 2022      |
| 🔄 User Engagement      | +48% with Gamification | Gartner, 2023            |
| 📈 DAU Growth           | +34% Active Users      | Duolingo Case Study      |
| 🚪 Drop-off Reduction   | -25% Abandonment       | Adobe UX Research        |
| 💖 User Loyalty         | +20% Loyalty Scores    | Brandwatch Study         |
| 📣 Social Engagement    | +60% Engagement        | Sprout Social, 2023      |

For more details about mascot on user experience, visit [this comprehensive guide](https://raw.studio/blog/how-mascots-improve-user-experience/?utm_source=chatgpt.com).

### UI Features

- **Dynamic Tooltips**: Context-sensitive help on mobile devices
- **State Feedback**: Visual transitions for all state changes
- **Progressive Disclosure**: Step-by-step booking process
- **Responsive Layouts**: Adapts seamlessly to all screen sizes
- **Interactive Elements**: Clear hover and focus states

## 💪 Code Quality

### TypeScript Integration

- Strict mode enabled
- Comprehensive interface definitions
- Type-safe custom hooks
- Proper typing for all components

### Development Standards

- Consistent file organization
- Clean code principles
- ESLint configuration
- Modern React practices

## 📈 Future Roadmap

- Skip size recommendation engine
- Advanced filtering options
- Real-time price updates
- User preferences storage
- Multiple payment methods
