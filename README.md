# Kaspa Token Explorer

A modern, responsive web application for exploring KRC20 tokens on the Kaspa
network. Built with Next.js, TypeScript, and Tailwind CSS.

![Kaspa Token Explorer](https://placeholder-for-project-screenshot.png)

## Features

- 🔍 Search and explore KRC20 tokens
- 📊 View detailed token information and statistics
- 👥 Track top token holders
- 🌓 Dark/Light theme support
- ⚡ Real-time data updates
- 📱 Responsive design for all devices

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context
- **Development**: ESLint, Prettier
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jorgearuv/kaspa-explorer.git
cd kaspa-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://your-api-url
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
kaspa-explorer/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── types/                # TypeScript types
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Kaspa Network](https://kaspa.org/) for the blockchain platform
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment

## Contact

Your Name - [@jorgearuv](https://twitter.com/jorgearuv)

Project Link:
[https://github.com/jorgearuv/kaspa-explorer](https://github.com/jorgearuv/kaspa-explorer)

---

Built with ❤️ for the Kaspa community
