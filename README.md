# RecipeVault - Professional Recipe Management Platform

A comprehensive recipe management platform designed for restaurants, cafes, and culinary teams. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-Organization Support** - Manage multiple restaurants or locations
- **Employee Management** - Role-based access control for team members
- **Recipe Organization** - Create, edit, and categorize professional recipes
- **Measurement Converter** - Built-in calculator for unit conversions
- **Feedback System** - Employees can send notes and feedback about recipes
- **Professional Email System** - Automated notifications and confirmations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Professional dark interface optimized for kitchen environments

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Email Service**: Resend
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/recipevault.git
   cd recipevault
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   - `RESEND_API_KEY` - Your Resend API key for email functionality
   - `NEXT_PUBLIC_SITE_URL` - Your site URL (for production)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Configure Environment Variables in Vercel**
   - `RESEND_API_KEY` - Your Resend API key
   - `NEXT_PUBLIC_SITE_URL` - Your production URL

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start the production server**
   \`\`\`bash
   npm start
   \`\`\`

## 📧 Email Configuration

RecipeVault uses Resend for email functionality. To set up:

1. **Sign up at [resend.com](https://resend.com)**
2. **Create an API key**
3. **Add the API key to your environment variables**
4. **Test the email service** at `/admin/email-test`

## 🏗️ Project Structure

\`\`\`
recipevault/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── employee/          # Employee dashboard pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── contact/           # Contact page
│   ├── converter/         # Measurement converter
│   ├── pricing/           # Pricing page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   ├── email-service.ts  # Email service integration
│   └── email-templates.ts # Email templates
├── scripts/              # Database scripts
└── public/               # Static assets
\`\`\`

## 🎨 Customization

### Colors
The app uses a professional color scheme:
- **Primary**: Deep Red (#8B0000)
- **Secondary**: Charcoal Black (#36454F)
- **Accent**: Deep Gold (#B8860B)

### Branding
Update the following files to customize branding:
- `app/layout.tsx` - Site metadata
- `app/manifest.ts` - PWA configuration
- `public/` - Icons and images

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **Create new pages** in the `app/` directory
2. **Add API routes** in `app/api/`
3. **Create reusable components** in `components/`
4. **Add utility functions** in `lib/`

## 📱 Progressive Web App

RecipeVault is configured as a PWA with:
- **Offline support** (coming soon)
- **Install prompts** for mobile devices
- **App-like experience** on mobile
- **Custom icons** and splash screens

## 🔒 Security

- **HTTPS enforced** in production
- **Security headers** configured
- **Input validation** on all forms
- **XSS protection** enabled
- **CSRF protection** built-in

## 📊 Monitoring

- **Health check endpoint** at `/api/health`
- **Error tracking** with detailed logging
- **Performance monitoring** ready
- **Email delivery tracking** available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Create an issue on GitHub
- **Email**: Contact us through the app's contact form
- **Health Check**: Visit `/health` to check system status

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Real-time collaboration
- [ ] Recipe import/export
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] API for third-party integrations
- [ ] Multi-language support

---

Built with ❤️ for the culinary community
