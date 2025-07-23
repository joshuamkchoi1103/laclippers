<p align="center">
  <img src="./src/assets/clippers-logo.png" alt="LA Clippers Logo" width="160" />
</p>

<h1 align="center">🏀 ClippersCentral</h1>

<p align="center">
  An interactive React + TypeScript website for LA Clippers fans featuring live news, AI predictions, roster data, and game insights.
</p>

<p align="center">
  <strong>🌐 Live Site:</strong> <a href="https://joshuamkchoi1103.github.io/laclippers">joshuamkchoi1103.github.io/laclippers</a>
</p>

---

## 🚀 Features

- ⚛️ **React + TypeScript** with modern hooks and routing
- 🏀 **Interactive Homepage** with hero banner, player spotlights, and quick stats
- 📰 **Live News Feed** aggregating from News API, Reddit, and social media
- 🤖 **AI Stat Predictor** using machine learning for player performance predictions
- 👥 **Team Roster** with detailed player profiles and statistics
- 📅 **Schedule & Games** with upcoming matchups and results
- 🎨 **Clippers-themed design** with team colors and modern UI
- 📱 **Fully responsive** mobile-first design
- 🚀 **Auto-deployment** with GitHub Actions

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, React Router
- **Styling:** Custom CSS with animations and responsive design  
- **APIs:** News API, Reddit API, NBA data integration
- **Deployment:** GitHub Pages with GitHub Actions CI/CD
- **Tools:** npm, GitHub Actions, gh-pages

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- News API key (optional, for full news functionality)

### Local Setup
```bash
# Clone the repository
git clone https://github.com/joshuamkchoi1103/laclippers.git
cd laclippers

# Install dependencies
npm install

# Create environment file (optional)
echo "REACT_APP_NEWS_API_KEY=your_api_key_here" > .env

# Start development server
npm start
```

### Building for Production
```bash
npm run build
```

## 🚀 Deployment

This project uses **GitHub Actions** for automatic deployment to GitHub Pages.

### Automatic Deployment
- **Triggers:** Every push to `main` or `master` branch
- **Process:** Build → Test → Deploy to GitHub Pages
- **URL:** https://joshuamkchoi1103.github.io/laclippers

### Manual Deployment
```bash
npm run deploy
```

## 🔐 Environment Variables

To enable full functionality, add these to your repository secrets:

- `REACT_APP_NEWS_API_KEY`: Get from [newsapi.org](https://newsapi.org)

### Adding Secrets to GitHub:
1. Go to your repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add `REACT_APP_NEWS_API_KEY` with your API key

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Main page components
│   ├── Home.tsx        # Interactive homepage
│   ├── News.tsx        # Live news aggregation
│   ├── Model.tsx       # AI prediction model
│   ├── Roster.tsx      # Team roster
│   └── Schedule.tsx    # Game schedule
├── styles/             # CSS styling files
├── assets/             # Images and static files
└── App.tsx            # Main app component
```

