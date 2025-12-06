# React Firebase Chat App

A modern, real-time chat application built with React and Firebase. Features user authentication, real-time messaging, file uploads, emoji support, and a clean, intuitive user interface.

## Features

- 🔐 **User Authentication** - Secure login and registration using Firebase Authentication
- 💬 **Real-time Messaging** - Instant message delivery using Firebase Firestore
- 📁 **File Uploads** - Share images and files using Firebase Storage
- 😊 **Emoji Support** - Express yourself with emoji picker integration
- 👥 **User Management** - Add users, manage contacts, and view user profiles
- 🔔 **Notifications** - Toast notifications for better user experience
- 🎨 **Modern UI** - Clean and responsive design
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI library
- **Firebase** - Backend services (Authentication, Firestore, Storage)
- **Vite** - Build tool and development server
- **Zustand** - State management
- **React Toastify** - Toast notifications
- **Emoji Picker React** - Emoji selection component

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Firebase project with Authentication, Firestore, and Storage enabled

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-firebase-chat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:

   - **Authentication** (Email/Password provider)
   - **Cloud Firestore** (create database in production mode)
   - **Storage** (set up storage bucket)

3. Get your Firebase configuration from Project Settings > General > Your apps

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your-firebase-api-key
```

**Note:** The Firebase configuration in `src/services/firebase.js` contains hardcoded values. For production, consider moving all Firebase config values to environment variables.

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
react-firebase-chat/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── components/         # React components
│   │   ├── chat/          # Chat interface component
│   │   ├── detail/        # User detail panel
│   │   ├── list/          # Chat list and user list
│   │   │   ├── chatList/  # Chat list component
│   │   │   └── userInfo/  # User info component
│   │   ├── login/         # Authentication component
│   │   └── notification/  # Notification component
│   ├── services/          # Services and utilities
│   │   ├── firebase.js    # Firebase configuration
│   │   ├── userStore.js   # User state management (Zustand)
│   │   ├── chatStore.js   # Chat state management (Zustand)
│   │   └── uploads.js     # File upload utilities
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js         # Vite configuration
└── README.md
```

## Firebase Configuration

The app uses the following Firebase services:

- **Authentication**: User login and registration
- **Firestore**: Real-time database for messages and user data
- **Storage**: File and image uploads

Make sure your Firestore security rules allow authenticated users to read/write messages and user data. Example rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /chats/{chatId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Features in Detail

### Authentication

- Email/password authentication
- Persistent login sessions
- User profile management

### Chat Functionality

- Real-time message synchronization
- Message history
- File and image sharing
- Emoji support
- User presence indicators

### User Management

- Add new users to chat
- View user profiles
- Manage contacts

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Deployment

You can deploy this application to:

- **Firebase Hosting**: `firebase deploy`
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **Any static hosting service**: Upload the `dist` folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository.

---

Built with ❤️ using React and Firebase
