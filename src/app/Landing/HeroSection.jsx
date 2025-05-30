"use client";
import React from 'react';
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import WoodenBoardChainChain from '../../components/pixel-ui/WoodenBoardChainChain/WoodenBoardChainChain';
import Flag from '../../components/pixel-ui/Flag/Flag';
import LogoAndName from './LogoAndName';
import { PixelButton } from '../../components/pixel-ui/PixelButton/PixelButton';

export default function HeroSection() {
    const { userId } = useAuth();

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* background landscape */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/landing-landscape.png')`,
                    imageRendering: 'pixelated'
                }}
            />

            {/* wooden background */}
            <div className="absolute top-0 right-0 bottom-0 z-5
                           w-[100vw]
                           sm:w-[500px]
                           md:w-[600px]
                           lg:w-[580px]
                           xl:w-[620px]"
                 style={{
                     backgroundImage: `url('/darkWoodBg.png')`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center right',
                     backgroundRepeat: 'no-repeat',
                     imageRendering: 'pixelated'
                 }} />

            {/* wooden board chain */}
            <div className="absolute top-0 right-0 bottom-0 z-10
                           w-[100vw]
                           sm:w-[500px]
                           md:w-[600px]
                           lg:w-[580px]
                           xl:w-[620px]
                           flex items-center justify-center">
                <WoodenBoardChain>
                    <Flag>
                        <LogoAndName />
                    </Flag>

                    <div className="flex flex-col gap-3 sm:gap-4 w-full mt-6 sm:mt-8">
                        {userId ? (
                            <Link href="/dashboard">
                                <PixelButton variant="primary" size="medium" className="w-full">
                                    Dashboard
                                </PixelButton>
                            </Link>
                        ) : (
                            <>
                                <Link href="/sign-in">
                                    <PixelButton variant="primary" size="medium" className="w-full">
                                        Sign In
                                    </PixelButton>
                                </Link>
                                <Link href="/sign-up">
                                    <PixelButton variant="primary" size="medium" className="w-full">
                                        Sign Up
                                    </PixelButton>
                                </Link>
                            </>
                        )}
                    </div>
                </WoodenBoardChain>
            </div>
        </div>
    );
}