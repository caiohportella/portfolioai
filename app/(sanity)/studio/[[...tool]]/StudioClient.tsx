"use client";

import { NextStudio } from "next-sanity/studio";
import type { ComponentProps } from "react";
import { useEffect } from "react";

type NextStudioProps = ComponentProps<typeof NextStudio>;

/**
 * Client wrapper for NextStudio to handle React warnings.
 * Note: The disableTransition prop warning is a known issue in next-sanity v11.6.5
 * and doesn't affect functionality. This will be fixed in a future update.
 */
export default function StudioClient(props: NextStudioProps) {
  useEffect(() => {
    // Filter out the disableTransition warning from console
    // This is a known issue in next-sanity v11.6.5 where NextStudio passes
    // disableTransition to a DOM element internally
    const originalError = console.error;
    const filteredError = (...args: unknown[]) => {
      const firstArg = args[0];
      if (
        typeof firstArg === "string" &&
        firstArg.includes("disableTransition") &&
        firstArg.includes("React does not recognize")
      ) {
        // Suppress only the specific disableTransition warning
        return;
      }
      originalError(...args);
    };
    console.error = filteredError;

    return () => {
      console.error = originalError;
    };
  }, []);

  return <NextStudio {...props} />;
}
