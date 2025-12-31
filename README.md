# 🏡 Estate App – React Property Search Application

## 📌 Project Overview
Estate App is a responsive property search web application built using **React** and **Vite**.  
The application allows users to search for residential properties using multiple filters, view detailed property information, browse image galleries, and manage a favourites list stored in local browser storage.

This project was developed as coursework for **5COSC026W – Web Application Development**.

---

## 🚀 Features

### 🔍 Property Search
Users can filter properties by:
- Property type (House / Flat)
- Number of bedrooms
- Minimum and maximum price
- Postcode

Multiple filters can be combined to refine search results.  
Results are displayed dynamically after performing a search.

---

### 🎨 React UI Widgets
The application enhances form usability using React UI components:
- **React Select** for dropdown selections
- **React DatePicker** for date inputs
- **Bootstrap** components for layout and styling

---

### 🖼️ Results Display
Search results are displayed as responsive property cards, each showing:
- Property image
- Short description
- Price
- Number of bedrooms
- Postcode

---

## 🏠 Property Details Page
Each property has a dedicated details page featuring:
- Large hero image
- Property price and key information

### 📑 Tabs (React UI Tabs)
Information is organised using tabs:
- Description
- Floorplan
- Image gallery
- Zoomable Google Map

### 🖼️ Image Gallery
A fullscreen image gallery is implemented using **yet-another-react-lightbox**, allowing users to browse all property images interactively.

---

## ⭐ Favourites Functionality
Users can manage favourite properties using two interaction methods:
- Clicking the **Favourite** button
- Dragging property cards into the favourites sidebar

Favourites:
- Are stored in **localStorage**
- Persist across page refreshes

Users can also:
- Remove individual favourites
- Clear the entire favourites list
- View favourites on a dedicated page

---

## 📱 Responsive Web Design (RWD)
The application is fully responsive and adapts to different screen sizes.

Two layouts are implemented:
- Large screens (desktop)
- Screens smaller than iPad landscape width

Technologies used:
- Bootstrap grid system
- Custom CSS
- Hand-written media queries

---

## 🔐 Security Considerations
- All dynamic content is rendered using JSX expressions, preventing HTML injection
- No usage of `dangerouslySetInnerHTML`
- React automatically escapes rendered values
- Content Security Policy (CSP) is acknowledged as a server-side concern

---

## 🧪 Testing
Automated tests are written using **Vitest**.

### Tests cover:
- Adding properties to favourites
- Removing properties from favourites
- Clearing the favourites list
- Rendering of property cards
- Core search logic

### Run tests:
```bash
npm run test

### 🌍 Deployment:
The application is deployed using GitHub Pages.

## GitHub Repository:
https://github.com/dramaticamo/estate-app

## Live Application:
https://dramaticamo.github.io/estate-app/