import "@testing-library/react";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});
