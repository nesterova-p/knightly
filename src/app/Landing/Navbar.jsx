"use client";

import AppIcon from '../../temp/AppIcon'
import {useAuth} from "@clerk/nextjs";
import Link from "next/link";
import LogoAndName from "./LogoAndName";

export default function Navbar() {
    const {userId} = useAuth();
    return (
        <header>
            <div className="p-4 px-4 sm:p-6 sm:px-8 md:p-8 md:px-20">
                <div className="sm:flex sm:items-center sm:justify-between">
                    {/* Logo + name */}
                    <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                        <LogoAndName/>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center">
                        {userId ? (
                            <Link href={"/dashboard"}>
                                <button className={"block rounded-lg px-6 sm:px-9 py-3 text-sm font-medium text-white transition bg-primary"}>
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
                                <Link href={"/sign-in"}>
                                    <button
                                        type="button"
                                        className="block w-full sm:w-32 rounded-lg px-6 sm:px-9 py-3 text-sm font-medium text-white bg-primary transition focus:outline-none"
                                    >
                                        Sign In
                                    </button>
                                </Link>
                                <Link href={"/sign-up"}>
                                    <button
                                        type="button"
                                        className="block w-full sm:w-32 rounded-lg px-6 sm:px-9 py-3 text-sm font-medium text-primary border border-primary transition focus:outline-none hover:bg-primary hover:text-white"
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