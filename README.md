# 🤖 AskGem Bot

An intelligent AI-powered chatbot built with React and Google's Gemini API. AskGem provides a modern, responsive chat interface that delivers smart responses powered by cutting-edge AI technology.

## ✨ Features

- 🎯 **AI-Powered Conversations** - Intelligent responses using Google Gemini API
- 💬 **Modern Chat Interface** - Clean, responsive design with smooth animations
- 📝 **Markdown Support** - Rich text formatting for code, lists, and more
- 📋 **Copy Messages** - One-click copying of any message to clipboard
- 🔄 **Regenerate Responses** - Get alternative AI responses instantly
- 📥 **Export Conversations** - Download your chat history as text files
- 🆕 **New Chat Management** - Start fresh conversations anytime
- 📱 **Fully Responsive** - Works perfectly on desktop and mobile devices
- ⚡ **Fast & Efficient** - Optimized performance with smart state management

## 🚀 Demo

### Chat Interface
The bot features a modern, gradient-based design with:
- Real-time typing indicators
- Message timestamps
- Hover actions for enhanced UX
- Auto-scrolling to latest messages

### AI Capabilities
- Answer questions on any topic
- Generate code examples with syntax highlighting
- Creative writing and brainstorming
- Problem-solving assistance
- Context-aware conversations

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/meetpancl/askgem-bot
   cd askgem-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key to your `.env` file

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see AskGem in action!

## 📁 Project Structure

```
askgem-bot/
├── public/
├── src/
│   ├── components/
│   │   ├── ChatMessage.js      # Individual message component
│   │   └── ConversationManager.js  # Chat management features
│   ├── services/
│   │   └── geminiService.js    # Gemini API integration
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application styles
│   └── index.js                # Entry point
├── .env                        # Environment variables (not in repo)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎨 Technology Stack

- **Frontend**: React 18+ with Hooks
- **AI API**: Google Gemini API
- **HTTP Client**: Axios
- **Markdown**: react-markdown with syntax highlighting
- **Icons**: Lucide React
- **Styling**: CSS3 with modern features (Flexbox, Grid, Gradients)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Gemini Model Configuration

The bot uses Gemini 1.5 Flash model with these settings:
- **Temperature**: 0.9 (creative responses)
- **Max Output Tokens**: 2048
- **Chat History**: Last 20 messages maintained for context

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import project from GitHub
- **GitHub Pages**: Use `gh-pages` package for static deployment
- **Firebase Hosting**: Google's hosting platform

### Environment Variables for Deployment
Make sure to set `REACT_APP_GEMINI_API_KEY` in your deployment platform's environment variables section.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini API for powering the AI responses
- React team for the amazing framework
- Open source community for inspiration and tools

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/meetpancl/askgem-bot/issues) page
2. Create a new issue with detailed information
3. Star ⭐ this repository if you found it helpful!

---

**Made with ❤️ by Meet and powered by AI**