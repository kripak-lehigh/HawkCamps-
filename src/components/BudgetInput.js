import React from "react";
import { Container, Header, Button } from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

export default function BudgetInput() {
  const nav = useNavigate();

  return (
    <Container header={<Header variant="h1">Budget</Header>}>
      {/* input fields here */}
      <Button variant="primary" onClick={() => nav("/summary")}>
        Continue
      </Button>
    </Container>
  );
}