import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormField,
  Grid,
  Header,
  Input,
  SegmentedControl,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function SetupPage() {
  const { mealPlan, setMealPlan, budget, setBudget } = useContext(AppContext);
  const nav = useNavigate();

  // shared numeric input handler (accepts blank)
  const setNum = (objSetter, key) => (e) => {
    const val = e.detail.value;
    if (val === "" || /^[0-9]*$/.test(val)) {
      objSetter((o) => ({ ...o, [key]: val === "" ? "" : Number(val) }));
    }
  };

  return (
    <Box padding="l">
      <SpaceBetween size="xl">
        {/* --- Meal Plan Section --- */}
        <Container header={<Header variant="h1">Meal Plan Setup</Header>}>
          <Grid gridDefinition={[{ colspan: 3 }, { colspan: 3 }, { colspan: 3 }, { colspan: 3 }]}>
            <FormField label="Dining Dollars ($)">
              <Input
                type="number"
                value={String(mealPlan.diningDollars)}
                onChange={setNum(setMealPlan, "diningDollars")}
              />
            </FormField>
            <FormField label="Meal Swipes">
              <Input
                type="number"
                value={String(mealPlan.swipes)}
                onChange={setNum(setMealPlan, "swipes")}
              />
            </FormField>
            <FormField label="Meal Exchanges">
              <Input
                type="number"
                value={String(mealPlan.exchanges)}
                onChange={setNum(setMealPlan, "exchanges")}
              />
            </FormField>
            <FormField label="Meals / day">
              <SegmentedControl
                selectedId={String(mealPlan.mealsPerDay || 0)}
                onChange={(e) =>
                  setMealPlan((m) => ({ ...m, mealsPerDay: Number(e.detail.selectedId) }))
                }
                options={[
                  { id: "0", text: "—" },
                  { id: "1", text: "1" },
                  { id: "2", text: "2" },
                  { id: "3", text: "3" },
                  { id: "4", text: "4" },
                ]}
              />
            </FormField>
          </Grid>
        </Container>

        {/* --- Budget Section --- */}
        <Container header={<Header variant="h1">Current Budget Setup</Header>}>
          <Grid gridDefinition={[{ colspan: 3 }, { colspan: 3 }, { colspan: 3 }, { colspan: 3 }]}>
            <FormField label="Housing ($)">
              <Input
                type="number"
                value={String(budget.housing)}
                onChange={setNum(setBudget, "housing")}
              />
            </FormField>
            <FormField label="Groceries ($)">
              <Input
                type="number"
                value={String(budget.groceries)}
                onChange={setNum(setBudget, "groceries")}
              />
            </FormField>
            <FormField label="Personal ($)">
              <Input
                type="number"
                value={String(budget.personal)}
                onChange={setNum(setBudget, "personal")}
              />
            </FormField>
            <FormField label="Emergency Fund ($)">
              <Input
                type="number"
                value={String(budget.emergency)}
                onChange={setNum(setBudget, "emergency")} 
                  />
            </FormField>
            <FormField label="Spending Max ($)">
              <Input
                type="number"
                value={String(budget.maxSpend)}
                onChange={setNum(setBudget, "max spending")}
              />
            </FormField>

          </Grid>
        </Container>

        {/* --- Navigation Buttons --- */}
        <SpaceBetween direction="horizontal" size="s">
          <Button variant="primary" onClick={() => nav("/summary")}>
            Save & Continue
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    </Box>
  );
}
