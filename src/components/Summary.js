import React, { useContext, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Header,
  KeyValuePairs,
  ProgressBar,
  SpaceBetween,
  ColumnLayout,
  StatusIndicator,
  Calender,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const SEMESTER_DAYS = 112; // ~16 weeks x 7 days

export default function Summary() {
  const { mealPlan, budget } = useContext(AppContext);
  const nav = useNavigate();

  const derived = useMemo(() => {
    // --- Meal plan calculations ---
    const mealsPerDay = Math.max(0, Number(mealPlan.mealsPerDay || 0));
    const totalMeals = Number(mealPlan.swipes || 0) + Number(mealPlan.exchanges || 0);
    const canCoverDays = mealsPerDay > 0 ? Math.floor(totalMeals / mealsPerDay) : 0;
    const needsMealsPerDay =
      SEMESTER_DAYS > 0 ? (totalMeals / SEMESTER_DAYS).toFixed(2) : "0";

    const diningDollars = Number(mealPlan.diningDollars || 0);
    const dailyDollarAllowance =
      SEMESTER_DAYS > 0 ? (diningDollars / SEMESTER_DAYS).toFixed(2) : "0.00";

    const progressMeals =
      totalMeals > 0 && mealsPerDay > 0
        ? Math.min(100, Math.round((canCoverDays / SEMESTER_DAYS) * 100))
        : 0;

    // --- Dining Dollar tracker calculations ---
    const diningDollarsUsed = Math.min(
      100,
      Math.round((diningDollars / (dailyDollarAllowance * SEMESTER_DAYS)) * 100)
    );
    const diningDollarStatus =
      diningDollarsUsed < 70 ? "success" : diningDollarsUsed < 100 ? "warning" : "error";
    const diningDollarMessage =
      diningDollarsUsed < 70
        ? "You're on track with your dining dollars!"
        : diningDollarsUsed < 100
        ? "You're spending moderately: keep an eye on your balance."
        : "Spending too fast: dining dollars might run out early!";

    // --- Budget calculations ---
    const housing = Number(budget.housing || 0);
    const groceries = Number(budget.groceries || 0);
    const personal = Number(budget.personal || 0);
    const emergency = Number(budget.emergency || 0);
    const maxSpend = Number(budget.maxSpend || 0);

    // const totalBudget = housing + groceries + personal + emergency;
    const idealPerDay = (maxSpend / SEMESTER_DAYS).toFixed(2);

    // Assume “current spending” is groceries + personal for now
    const currentSpent = housing + groceries + personal + emergency;
    const percentUsed =
      currentSpent > 0 ? Math.min(100, Math.round((currentSpent / maxSpend) * 100)) : 0;
    const remaining = maxSpend - currentSpent;

    const budgetStatus =
      percentUsed < 70
        ? "success"
        : percentUsed < 100
        ? "warning"
        : "error";

    const budgetMessage =
      percentUsed < 70
        ? `You’re on track: only ${percentUsed}% of your budget used.`
        : percentUsed < 100
        ? `Careful: ${percentUsed}% used.`
        : `⚠️ Over budget by $${Math.abs(remaining)}!`;

    return {
      // Meal
      mealsPerDay,
      totalMeals,
      canCoverDays,
      needsMealsPerDay,
      dailyDollarAllowance,
      progressMeals,
      diningDollars,
      diningDollarsUsed,
      diningDollarStatus,
      diningDollarMessage,
      // Budget
      housing,
      groceries,
      personal,
      emergency,
      maxSpend,
    //   totalBudget,
      idealPerDay,
      percentUsed,
      remaining,
      budgetStatus,
      budgetMessage,
    };
  }, [mealPlan, budget]);

  return (
    <ColumnLayout columns={2}>
      {/* --- Left: Meal Plan --- */}
      <div>
        <Box padding="l">
          <SpaceBetween size="l">
            <Container header={<Header variant="h1">Meal plan summary</Header>}>
              <SpaceBetween size="m">
                <KeyValuePairs
                  items={[
                    { label: "Total meals (swipes + exchanges)", value: derived.totalMeals },
                    { label: "Meals per day (selected)", value: derived.mealsPerDay },
                    { label: "Days you can cover", value: derived.canCoverDays },
                    {
                      label: "Meals/day needed to last full semester",
                      value: derived.needsMealsPerDay,
                    },
                    { label: "Dining Dollars total ($)", value: `$${derived.diningDollars}` },
                    { label: "Dining Dollars per day ($)", value: `$${derived.dailyDollarAllowance}` },
                  ]}
                />

                {/* --- Meal Tracker --- */}
                <ProgressBar
                  value={derived.progressMeals}
                  description="Meal Plan Usage:"
                  additionalInfo={`${derived.canCoverDays} / ${SEMESTER_DAYS} days`}
                />
                <StatusIndicator
                  type={
                    derived.progressMeals >= 90
                      ? "success"
                      : derived.progressMeals >= 60
                      ? "warning"
                      : "error"
                  }
                >
                  {derived.progressMeals >= 90
                    ? "You're on track — great meal balance!"
                    : derived.progressMeals >= 60
                    ? "You're doing okay: keep an eye on your remaining meals."
                    : "You might run out of meals before semester ends!"}
                </StatusIndicator>

                {/* --- Dining Dollars Tracker --- */}
                {/* <Header variant="h2">Dining Dollars Tracker</Header> */}
                <ProgressBar
                  value={derived.diningDollarsUsed}
                  description="Dining Dollar Usage"
                  additionalInfo={`${derived.diningDollarsUsed}% of balance used`}
                />
                <StatusIndicator type={derived.diningDollarStatus}>
                  {derived.diningDollarMessage}
                </StatusIndicator>
              </SpaceBetween>
            </Container>

            <Button variant="primary" onClick={() => nav("/")}>
              Dashboard Edit
            </Button>
          </SpaceBetween>
        </Box>
      </div>

      {/* --- Right: Budget Summary --- */}
      <div>
        <Box padding="l">
          <SpaceBetween size="l">
            <Container header={<Header variant="h1">Budget plan summary</Header>}>
              <SpaceBetween size="m">
                <KeyValuePairs
                  items={[
                    { label: "Housing total ($)", value: `$${derived.housing}` },
                    { label: "Groceries total ($)", value: `$${derived.groceries}` },
                    { label: "Personal total ($)", value: `$${derived.personal}` },
                    { label: "Emergency fund ($)", value: `$${derived.emergency}` },
                    { label: "Total semester budget ($)", value: `$${derived.totalBudget}` },
                    { label: "Ideal spending per day ($)", value: `$${derived.idealPerDay}` },
                  ]}
                />

                <ProgressBar
                  value={derived.percentUsed}
                  description="Budget usage"
                  additionalInfo={`${derived.percentUsed}% used`}
                />

                <StatusIndicator type={derived.budgetStatus}>
                  {derived.budgetMessage}
                </StatusIndicator>
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </Box>
      </div>
    </ColumnLayout>
  );
}