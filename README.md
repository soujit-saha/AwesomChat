# AwesomChat 💬

A modern React Native chat application with offline message queue functionality and simulated real-time messaging.

## 🎥 Demo
https://github.com/user-attachments/assets/cca6366a-1848-49bf-9b80-a5e892ff4f8c


> **Note:** If the video doesn't play above, you can view it directly in the [`demo/Demo_Chat_App.mp4`](./demo/Demo_Chat_App.mp4) file.

## 📑 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Testing the Offline/Online Flow](#-testing-the-offlineonline-flow)
  - [Understanding the UI Components](#understanding-the-ui-components)
  - [Test Scenarios](#test-scenarios)
- [Architecture](#-architecture)
- [Technical Details](#-technical-details)
- [Platform-Specific Notes](#-platform-specific-notes)
- [Troubleshooting](#-troubleshooting)
- [Development Scripts](#-development-scripts)
- [Contributing](#-contributing)
- [License](#-license)
- [Authors](#-authors)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

- 💬 Real-time messaging simulation
- 📴 Offline message queue with automatic retry
- 📊 Message status tracking (pending, sent, delivered)
- 🎨 Light/Dark theme support
- ⌨️ Keyboard-aware interface
- 📱 Safe-area handling for modern devices
- 🔄 Online/offline toggle for testing

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20
- **npm** or **yarn**
- **React Native development environment**
  - For Android: Android Studio with SDK
  - For iOS: Xcode (macOS only)
- **Android Emulator** or physical device with USB debugging enabled
- **iOS Simulator** (macOS only)

## 📦 Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone <repository-url>
   cd Chat
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 🎯 Running the Application

### Android

1. **Start an Android emulator** or connect a physical device with USB debugging enabled

2. **Run the app**:

   ```bash
   npm run android
   ```

   Or alternatively:

   ```bash
   npx react-native run-android
   ```

### iOS (macOS only)

1. **Run the app**:

   ```bash
   npm run ios
   ```

   Or alternatively:

   ```bash
   npx react-native run-ios
   ```

### Development Server

To start the Metro bundler separately:

```bash
npm start
```

## 🧪 Testing the Offline/Online Flow

### Overview

AwesomChat simulates a real messaging system with offline capabilities. The app demonstrates how messages are queued when offline and automatically sent when connectivity is restored.

### Understanding the UI Components

#### 1. **Status Indicator** (Top Header)

- **Green dot + "Online"**: App is in connected mode
- **Red dot + "Offline"**: App is in offline mode
- **Toggle switch**: Tap to simulate network changes

#### 2. **Pending Message Badge**

- Appears next to the status indicator when offline
- Shows count of queued messages (e.g., "3")
- Disappears when all messages are sent

#### 3. **Message Status Icons**

- **🕐 Clock icon**: Message is pending
- **✓ Single check**: Message sent
- **✓✓ Double check**: Message delivered

#### 4. **Send Button**

- **📤 Icon**: Located at the right of the input field
- Disabled (grayed out) when input is empty
- Enabled when there's text to send

---

### Test Scenarios

#### **Scenario 1: Normal Online Messaging**

**Steps:**

1. Launch the app (it starts in online mode by default)
2. Wait for the welcome message: "Hey! Welcome to AwesomChat! 👋" from "Soujit Saha"
3. Type a message in the input field
4. Tap the send icon (📤)

**Expected Results:**

- Message appears immediately in the chat
- Status shows pending (🕐) for a brief moment
- After ~1.5 seconds, status changes to sent (✓)
- After another moment, status updates to delivered (✓✓)
- Input field clears automatically

---

#### **Scenario 2: Switching to Offline Mode**

**Steps:**

1. Locate the toggle switch in the header (next to "Online")
2. Tap the toggle switch

**Expected Results:**

- Status indicator changes from green "Online" to red "Offline"
- Toggle switch animates to the left position
- You can still type messages

---

#### **Scenario 3: Sending Messages While Offline**

**Steps:**

1. Ensure you're in offline mode (red indicator)
2. Type and send the first message: "Hello offline world"
3. Send a second message: "This is queued"
4. Send a third message: "Testing offline queue"

**Expected Results:**

- All three messages appear in the chat immediately
- All messages show pending status (🕐) and stay that way
- A **red badge** appears in the header showing "3" (pending count)
- Messages do NOT change to sent or delivered
- Scroll works normally

---

#### **Scenario 4: Reconnecting (Queue Flush)**

**Steps:**

1. Verify you have 3 queued messages (badge shows "3")
2. Tap the toggle switch to go back online

**Expected Results:**

- Status indicator changes to green "Online"
- All three queued messages are automatically sent in order
- Each message status updates: pending → sent → delivered
- Badge count decreases: 3 → 2 → 1 → 0 (disappears)
- Process takes ~4-5 seconds total (1.5s delivery delay per message)

---

#### **Scenario 5: Mixed Online/Offline Workflow**

**Steps:**

1. Start in **online mode**, send 2 messages
   - Wait for them to be delivered (✓✓)
2. Toggle to **offline mode**
3. Send 3 more messages
   - Observe they stay pending and badge shows "3"
4. Toggle back to **online mode**

**Expected Results:**

- First 2 messages remain delivered (✓✓)
- Next 3 messages transition from pending → sent → delivered
- All 5 messages appear in chronological order
- Badge clears after all queued messages are sent

---

#### **Scenario 6: Keyboard Behavior**

**Steps:**

1. Tap the message input field
2. Type some text
3. Observe the layout

**Expected Results:**

- Keyboard opens smoothly
- Input field moves above the keyboard (not hidden)
- Chat messages scroll up to remain visible
- No extra spacing between input and keyboard
- Send icon becomes enabled when text is present

**Additional Tests:**

- Tap outside the input or swipe down to dismiss keyboard
- Try typing multiple lines (input expands vertically)
- Test with both short and long messages (max 500 characters)

---

#### **Scenario 7: Empty Input Validation**

**Steps:**

1. Tap the input field
2. Try tapping the send icon without typing anything
3. Type only spaces and tap send
4. Type actual text and tap send

**Expected Results:**

- Send button is disabled (opacity 0.5) when input is empty
- Tapping disabled button does nothing
- Spaces-only messages are not sent
- Valid messages are sent and input clears

---

## 🏗️ Architecture

### Key Components

- **`ChatScreen`**: Main chat interface with message list and input
- **`MessageBubble`**: Individual message display with status indicators
- **`MessageInput`**: Text input with send button and keyboard handling
- **`ChatHeader`**: Header with title and online/offline toggle
- **`StatusIndicator`**: Visual indicator for connection status

### Services

- **`MockMessageService`**: Simulates message sending with configurable delays
- **`OfflineQueueService`**: Manages queued messages when offline

### Hooks

- **`useMessages`**: Manages message state, online/offline status, and queue flushing
- **`useTheme`**: Provides theme colors for light/dark mode

### Flow Diagram

```
User Types Message
       ↓
   Is Online?
   ↙        ↘
 YES         NO
  ↓           ↓
Send to      Add to
Service      Queue
  ↓           ↓
Update       Show as
Status       Pending
  ↓           ↓
pending      (stays
  ↓          pending)
sent            ↓
  ↓          User goes
delivered      online
               ↓
            Flush Queue
               ↓
            Send all
            queued msgs
               ↓
            Update status
            (pending → sent
             → delivered)
```

## 🛠️ Technical Details

### Message Status Flow

1. **Pending** (🕐): Message created, waiting to be sent
2. **Sent** (✓): Message sent to service (immediate in simulation)
3. **Delivered** (✓✓): Confirmation received after 1.5s delay

### Offline Queue Mechanism

- Messages sent while offline are stored in `OfflineQueueService`
- Queue is held in memory (in-app session only)
- When connectivity is restored (`isOnline` toggles to `true`):
  - `useMessages` hook triggers queue flush
  - All queued messages are sent sequentially
  - Status indicators update for each message
  - Badge count decrements as messages are processed

### Keyboard Handling

- `KeyboardAvoidingView` with platform-specific behavior:
  - **iOS**: `padding` behavior with 56pt offset
  - **Android**: `height` behavior (works with `adjustResize` in manifest)
- `FlatList` props:
  - `keyboardShouldPersistTaps="handled"` - allows tapping input while keyboard is open
  - `keyboardDismissMode` - interactive dismiss on iOS, drag dismiss on Android

### Safe Area Handling

- Uses `react-native-safe-area-context` for modern device support
- Input respects bottom safe area (gesture bars, home indicators)
- Top safe area handled via `SafeAreaProvider` in `App.tsx`

## 📱 Platform-Specific Notes

### Android

- Requires `android:windowSoftInputMode="adjustResize"` in `AndroidManifest.xml` (already configured)
- Tested on Android API 21+ (Android 5.0+)
- Works with both soft navigation buttons and gesture navigation

### iOS

- Requires iOS 12.0 or higher
- Handles notch and safe areas automatically
- Interactive keyboard dismissal supported

## 🐛 Troubleshooting

### Input Hidden by Keyboard

**Problem**: Message input is covered by the keyboard when typing

**Solutions**:

- Verify `android:windowSoftInputMode="adjustResize"` is set in `android/app/src/main/AndroidManifest.xml`
- Ensure `KeyboardAvoidingView` behavior prop is correctly set for your platform
- Try adjusting `keyboardVerticalOffset` value in `ChatScreen.tsx` (currently 56 for iOS)

### Messages Not Sending When Back Online

**Problem**: Queue doesn't flush when toggling back to online

**Solutions**:

- Check console logs for errors: `npm start` and view Metro logs
- Verify `useMessages` hook has `isOnline` in the `useEffect` dependency array
- Ensure `OfflineQueueService.flush()` is being called

### Badge Count Not Updating

**Problem**: Pending message count doesn't reflect queue state

**Solutions**:

- Check that `getPendingCount()` is called after state changes
- Verify `OfflineQueueService.getQueueCount()` returns correct value
- Ensure `ChatHeader` re-renders when pending count changes

### Build Errors

**Problem**: App fails to build or run

**Solutions**:

- Clear cache: `npm start -- --reset-cache`
- Clean Android build: `cd android && ./gradlew clean && cd ..`
- Clean iOS build: `cd ios && rm -rf build && pod deintegrate && pod install && cd ..`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Metro Bundler Issues

**Problem**: "Unable to resolve module" or bundler errors

**Solutions**:

- Stop Metro and restart: `npm start -- --reset-cache`
- Check for typos in import statements
- Ensure all dependencies are installed: `npm install`

## 📝 Development Scripts

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run linter
npm run lint

# Run tests
npm test
```

## 🤝 Contributing

1. Follow the existing code style and structure
2. Test offline/online flow thoroughly before submitting changes
3. Update this README if you add new features or change behavior
4. Run `npm run lint` to ensure code quality

## 📄 License

[Add your license information here]

## 👥 Authors

- Soujit Saha (Initial chat system and offline queue)

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Inspiration from modern messaging apps like WhatsApp and Telegram
