"use client";

import {SignOutButton, useUser} from "@clerk/nextjs";

export default function Dashboard() {
    const { user } = useUser();
    return (
        <div> hello, {user?.lastName} <SignOutButton>Sign Out</SignOutButton></div>
    )
}