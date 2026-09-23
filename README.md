# Simple Counter App

A responsive and interactive **Counter Application built with React.js**.

This project was developed to practice the fundamentals of React, including state management, event handling, conditional rendering, keyboard events, localStorage, responsive design, and dynamic UI updates.

The application allows users to increase, decrease, and reset a counter while maintaining activity history and user preferences even after refreshing the browser.

---

## 🌐 Project Overview

The Simple Counter App is a beginner-friendly React project designed to demonstrate how a modern web application can manage state and user interactions.

The counter has a minimum value of **0** and a maximum value of **10**.

Users can control the counter using:

- 🖱️ Mouse buttons
- ⌨️ Keyboard shortcuts
- 📱 Responsive interface

The application also provides:

- Dark mode
- Progress tracking
- Activity history
- Timestamps
- Local storage
- Reset options
- Responsive design

---

## Features

###Counter Controls

The application provides three main controls:

- **+ Button** → Increases the counter by 1
- **- Button** → Decreases the counter by 1
- **Reset Button** → Resets the counter to 0

The counter cannot:

- Go below `0`
- Go above `10`

---

###Progress Indicator

A dynamic progress bar displays the current counter progress.

For example:

```text
Count: 5 / 10

██████████░░░░░░░░░░
