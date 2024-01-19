"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const SessionContext = ({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
