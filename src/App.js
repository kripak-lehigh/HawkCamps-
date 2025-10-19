import React, { createContext, useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopNavigation } from "@cloudscape-design/components";
import SetupPage from "./components/SetupPage";
import Summary from "./components/Summary";

export const AppContext = createContext(null);

export default function App() {
  const [mealPlan, setMealPlan] = useState({
    diningDollars: 0,
    swipes: 0,
    exchanges: 0,
    mealsPerDay: 0,
  });

  const [budget, setBudget] = useState({
    housing: 0,
    groceries: 0,
    personal: 0,
    semesterGoal: 0,
    emergency: 0,
    maxSpend: 0,
  });

  useEffect(() => localStorage.setItem("mealPlan", JSON.stringify(mealPlan)), [mealPlan]);
  useEffect(() => localStorage.setItem("budget", JSON.stringify(budget)), [budget]);

  const ctx = useMemo(() => ({ mealPlan, setMealPlan, budget, setBudget }), [mealPlan, budget]);

  return (
    <Router>
      <AppContext.Provider value={ctx}>
        {/* ✅ Simple header — no logo */}
        <TopNavigation
          identity={{ href: "/", title: "UniBalance" }}
          utilities={[
            { type: "button", text: "Reset", href: "/" },
            // { type: "button", text: "Summary", href: "/summary" },
          ]}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SetupPage />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}