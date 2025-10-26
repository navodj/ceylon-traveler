# Ceylon Traveler 🇱🇰

A smart travel planning mobile application designed to help users discover Sri Lanka by generating personalized itineraries based on their preferences.

Here's a visual journey through the key interfaces of Ceylon Traveler:

| 1. Welcome Screen             | 2. Sign Up                                | 3. Email Verification                 | 4. Trip Itinerary                     | 5. Payment Flow                       |
| :---------------------------: | :---------------------------------------: | :-----------------------------------: | :-----------------------------------: | :------------------------------------: |
| <img src="<[URL_FIRST_SCREEN](https://github.com/navodj/ceylon-traveler/blob/master/assets/i2.jpg)>" alt="Welcome Screen" width="200"/> | <img src="<(https://github.com/navodj/ceylon-traveler/blob/master/assets/i1.jpg)>" alt="Sign Up Screen" width="200"/> | <img src="<(https://github.com/navodj/ceylon-traveler/blob/master/assets/i3.jpg)>" alt="Email Verification" width="200"/> | <img src="<(https://github.com/navodj/ceylon-traveler/blob/master/assets/i4.jpg)>" alt="Trip Itinerary" width="200"/> | <img src="<(https://github.com/navodj/ceylon-traveler/blob/master/assets/i5.jpg)>" alt="Payment Screen" width="200"/> |

---

**Watch a Demo:** [Link to Video Demo Here]([<PASTE_YOUTUBE/VIMEO_LINK_HERE>](https://drive.google.com/file/d/1DwUg6IqhQZ-mjxQIRbZoa9CmM9emSuqt/view?usp=drivesdk))

---

## ✨ Features

* **Personalized Itinerary Generation:** Creates multi-day travel plans based on user inputs like number of people, duration, budget, and interests.
* **Interactive Map View:** Displays the planned route and key locations for the entire trip and for each day.
* **Daily Plan Details:** Shows specific attractions, descriptions, images, and map routes for each day of the trip (with a draggable bottom sheet).
* **User Authentication:** Secure sign-up and sign-in using Clerk.
* **User Profile Management:** Allows users to view and update their personal information (requires backend connection).
* **Dark/Light Mode:** Supports theme switching for user preference.
* **Payment Flow UI:** Includes screens for reservation details, payment information, and confirmation.
* **Settings Screen:** Access to profile, password changes (via auth), theme toggle, and notification preferences.

---

## 🛠️ Tech Stack

* **Frontend:** React Native (Expo SDK) + TypeScript
* **Navigation:** Expo Router
* **Authentication:** Clerk (@clerk/clerk-expo)
* **Mapping:** `react-native-maps`
* **UI Components:** `react-native-paper`, `@gorhom/bottom-sheet`, `react-native-calendars`, Custom Components
* **Styling:** React Native StyleSheet
* **State Management:** React Hooks (`useState`, `useContext`)
* **Backend:** FastAPI (Python) - *(Note: Requires separate setup and deployment)*
* **Database:** Supabase (PostgreSQL) - *Accessed via Backend*
* **Routing Service:** OpenRouteService - *Accessed via Backend*

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* [Expo Go](https://expo.dev/go) app installed on your physical Android/iOS device or an emulator/simulator setup.
* Python environment (e.g., v3.8+) for the backend.
* Access to a running instance of the [Ceylon Traveler Backend API](<#link-to-your-backend-repo-if-available>) (locally or deployed).
* Clerk Account and Supabase Account for API keys.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ceylon-traveler.git](https://github.com/your-username/ceylon-traveler.git) 
    cd ceylon-traveler
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

### Configuration

1.  **Create an environment file:** Create a file named `.env` in the root directory of the project.
2.  **Add environment variables:** Populate the `.env` file with your keys and API URL:
    ```env
    # Clerk Publishable Key (Get from Clerk Dashboard)
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_YOUR_CLERK_PUBLISHABLE_KEY"

    # Base URL for your running backend API
    EXPO_PUBLIC_API_URL="http://YOUR_BACKEND_IP_ADDRESS:8000" 
    ```
   

### Running the Backend

*(Adjust based on your backend setup)*
1.  Navigate to your backend project directory.
2.  Set up backend environment variables (Supabase, Clerk Secret, ORS API Key).
3.  Install backend dependencies (e.g., `pip install -r requirements.txt`).
4.  Run the FastAPI server (ensure `--host 0.0.0.0` for device testing):
    ```bash
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload 
    ```

### Running the App

1.  **Start the Expo development server:**
    ```bash
    npx expo start
    ```
2.  **Open the app:** Scan the QR code with Expo Go or use an emulator/simulator.

---

## 📂 Project Structure

For a detailed explanation of the project's folder structure, please see [STRUCTURE.md](STRUCTURE.md).

---

## 🤝 Contributing (Optional)

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

---

## 📜 License (Optional)

This project is licensed under the MIT License - see the `LICENSE` file for details.
