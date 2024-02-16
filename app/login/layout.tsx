"use client"
import React, { Children, useEffect } from "react";
import {
    Alert, FlexGrid,
    H3,
    Body1,
    Spacing,
    theme,
    ThemeProps, Caption, H1, ThemeProvider, Card,
} from "@burstsms/react-components";
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Body1> {children}</Body1>
        </ThemeProvider >
        )
}