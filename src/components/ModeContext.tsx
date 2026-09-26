"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Mode = "recruiter" | "showcase";

type Ctx = {
  mode: Mode;
  toggle: () => void;
};

const ModeCtx = createContext<Ctx | null>(null);

// ponytail: no persistence yet; add localStorage read in initializer when we need
// the user's last choice to survive reload.
export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("recruiter");
  const value = useMemo(
    () => ({ mode, toggle: () => setMode((m) => (m === "recruiter" ? "showcase" : "recruiter")) }),
    [mode],
  );
  return <ModeCtx.Provider value={value}>{children}</ModeCtx.Provider>;
}

export function useMode(): Ctx {
  const ctx = useContext(ModeCtx);
  if (!ctx) throw new Error("useMode must be used inside <ModeProvider>");
  return ctx;
}