# 🗓️ Daily Schedule Optimizer

A productivity-focused web application that helps users automatically generate an optimized daily schedule based on their fixed timetable, must-do tasks, and flexible daily todos — removing the need for manual planning and maximizing daily efficiency.

## 🚀 Features

- 📆 Input structured tasks across three categories: Fixed Timetable, Must-Do Tasks, Daily Todos
- 🤖 AI-powered schedule generation using **Gemini API**
- 📅 Visualized schedules with **FullCalendar** in a dynamic, drag-and-drop interface
- 🔐 Secure authentication using **NextAuth** with Google OAuth
- 💾 Redux-based state management for persistent and consistent task data
- 📱 Fully responsive design using **Tailwind CSS**

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Authentication:** NextAuth (Google OAuth)
- **Calendar:** FullCalendar (with day/time views)
- **State Management:** Redux Toolkit
- **AI Scheduling:** Gemini 1.5 Flash API
- **Database:** MongoDB (via Mongoose)

## 📸 Demo

> _Insert a screenshot or Loom video link here to show the flow from task input to generated schedule._

## 🧠 How It Works

1. Users log in securely with Google OAuth.
2. They input:
   - **Fixed Timetable:** Non-flexible commitments (e.g., classes, meetings)
   - **Must-Do Tasks:** Tasks that must be done today
   - **Daily Todos:** Optional or flexible tasks
3. All inputs are combined and sent to the **Gemini API**, which returns a time-optimized schedule.
4. The schedule is rendered with **FullCalendar** in 24-hour format, reflecting time blocks intelligently.

## 🧪 Installation

```bash
git clone https://github.com/your-username/daily-schedule-optimizer.git
cd daily-schedule-optimizer
npm install
npm run dev
```

Create a `.env.local` file in the root:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_nextauth_secret
```

## ✨ Future Improvements

- User history and saved schedules
- Priority tagging and task dependencies
- Weekly/monthly planning support
- Drag-and-reschedule with auto-updates

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Made with ❤️ using MERN + Next.js + Gemini AI**
