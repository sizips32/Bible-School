# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bible School is a React-based educational platform designed for children and teenagers to learn about the Bible through multimedia content. The application supports bilingual functionality (Korean/English) and features slides, videos, quizzes, and various educational components.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Preview production build
pnpm preview
```

## Architecture & Core Technologies

### Tech Stack
- **Frontend Framework**: React 19.1.0 with Vite
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **UI Components**: Custom shadcn/ui components in `src/components/ui/`
- **Internationalization**: Custom i18n system in `src/lib/i18n.js`
- **State Management**: React hooks and local state
- **Data Persistence**: LocalStorage utilities in `src/lib/localStorage.js`
- **Icons**: lucide-react

### Key Architectural Patterns

#### Component Structure
- **Main App**: `src/App.jsx` - Central routing and state management hub
- **Page Components**: Each major section (home, resources, word, doctrine, etc.) has dedicated components
- **UI Components**: Reusable shadcn/ui components following consistent patterns
- **Data Files**: Static data stored in `src/data/` (bibleData.js, sdaDoctrines.js, etc.)

#### Data Flow
- **Media Upload**: Files are processed through FileUpload/ResourcesPage, stored in localStorage
- **YouTube Integration**: Uses YouTube Data API v3 for video metadata
- **Quiz Generation**: Integrates with Google Gemini API for AI-powered quiz creation
- **Language Switching**: Global language state managed through useTranslation hook

#### Important Patterns
- **Dark Mode**: Implemented throughout with conditional className based on `isDarkMode` state
- **Modal System**: SlideViewer and VideoPlayer use overlay modals with z-50 positioning
- **Responsive Design**: Mobile-first approach with md: breakpoints for desktop
- **Data Persistence**: saveToLocalStorage/loadFromLocalStorage for maintaining user data

## API Integration

### Environment Variables Required
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### API Usage
- **YouTube API**: Fetches video metadata (title, description, thumbnail) for YouTube URLs
- **Gemini API**: Generates quiz questions based on input text with specific formatting requirements

## Key Components & Their Responsibilities

- **App.jsx**: Main application shell, navigation, routing between pages
- **MainSlider.jsx**: Carousel display for slides with navigation controls
- **MainVideoGallery.jsx**: Grid display for video content
- **QuizGames.jsx**: Interactive quiz system with multiple game modes
- **ResourcesPage.jsx**: Central hub for uploading and managing educational content
- **BibleExplorer.jsx**: Interactive Bible exploration with chapters and verses
- **SDADoctrines.jsx**: Display of Seventh-day Adventist doctrines
- **SpiritOfProphecy.jsx**: Spirit of Prophecy content viewer
- **MeditationPage.jsx**: Meditation and reflection content
- **SanctuaryPage.jsx**: Sanctuary educational content

## Important Implementation Notes

### LocalStorage Management
- Videos and slides are automatically saved to localStorage on changes
- Data structure includes metadata like title, type (file/youtube/google), and URLs
- Clear functions available for resetting stored data

### Media Handling
- **Video Files**: Stored as blob URLs with metadata
- **YouTube Videos**: Store video ID and use embedded player
- **Slides**: Support both uploaded files and Google Slides embeds
- **Images**: Processed and displayed using URL.createObjectURL for uploaded files

### Quiz System
The quiz system has three types:
1. Card Flip: Matching questions with difficulty levels
2. Word Order: Arranging words in correct sequence
3. Fill Blank: Completing sentences with missing words

AI-generated quizzes must return specific JSON format with question, options array, and answer fields.

### Internationalization
- Language files support Korean (ko) and English (en)
- Translations accessed via `t()` function with dot notation paths
- Language preference saved to localStorage
- All UI text should use translation keys, not hardcoded strings