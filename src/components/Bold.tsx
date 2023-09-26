/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";

export default function Bold({ children }: { children: React.ReactNode }) {
    return (
        <span
            css={css`
                font-weight: bold;
            `}
        >
            {children}
        </span>
    );
}
