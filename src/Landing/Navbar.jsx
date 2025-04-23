"use client";

import AppIcon from '@/temp/AppIcon'
import {useAuth} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    const {userId} = useAuth();
    return (
        <header>
            <div className="p-8 px-20">
                <div className="sm:flex sm:items-center sm:justify-between">
                    {/* Logo + nazwa */}
                    <div className="flex gap-2 items-center justify-center sm:justify-start">
                        <div className="p-2 rounded-md bg-primary">
                            <AppIcon color="#FFFFFF" height={34} width={34} />
                        </div>
                        <span className="text-2xl font-light">
                            <span className="font-bold text-black">
                                Knightly
                            </span>
                        </span>
                    </div>

                    {/* Buttons */}

                    <div>
                        {userId ? (
                            <Link href={"/dashboard"}>
                                <button className={"block    rounded-lg  px-9 py-3 text-sm font-medium text-white transition bg-primary"}>
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                <Link href={"/sign-in"}>
                                    <button
                                    type="button"
                                    className="block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-white bg-primary transition focus:outline-none"
                                    >
                                    Sign In
                                    </button>
                                </Link>
                                <Link href={"/sign-up"}>
                                    <button
                                        type="button"
                                        className="block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-primary border border-primary transition focus:outline-none hover:bg-primary hover:text-white"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    )
}
