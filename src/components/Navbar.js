import React from "react";
import { TopNavigation } from "@cloudscape-design/components";

export default function Navbar() {
  return (
    <TopNavigation
      identity={{ href: "/", title: "UniBalance", logo: { src: "", alt: "logo" } }}
      utilities={[
        { type: "button", text: "Setup", href: "/" },
        { type: "button", text: "Budget", href: "/budget" },
        { type: "button", text: "Summary", href: "/summary" },
      ]}
    />
  );
}