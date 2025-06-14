"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./makeClient";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
