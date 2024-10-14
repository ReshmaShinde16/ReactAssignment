"use client";
import React, { useState } from "react";
import UserTable from "./components/user/page"; 
import CalendarComponent from "./components/calendar/page"; import { Provider } from "react-redux";
import { store } from "c:/Users/reshm/office/Practice/ReactwithRedux/my-app/src/app/store/store";
import DrawerSidebar from "./components/sidebar/page";

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState<"user" | "calendar">("user"); 

  const handleUserClick = () => {
    setCurrentComponent("user");
  };


  const handleCalendarClick = () => {
    setCurrentComponent("calendar");
  };

  return (
    <Provider store={store}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
        {/* Sidebar */}
        <DrawerSidebar
          onUserClick={handleUserClick}
          onCalendarClick={handleCalendarClick}
          selectedComponent={currentComponent}
        />

        <div className=""> 
          {currentComponent === "user" && <UserTable />}
          {currentComponent === "calendar" && <CalendarComponent />}
        </div>
      </div>
    </Provider>
  );
}
