'use client';

import { Button } from "@mui/material";

import { Container } from "@mui/material";

export default function TogglePage({toggle, setToggle}) {
    return (
        <Container maxWidth="sm" className="relative z-10">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
            <div className="flex bg-gray-100 p-1 rounded-2xl">
                <Button className="flex-1 py-2.5 rounded-xl text-[14px] font-bold bg-white text-[#2463eb] shadow-sm" onClick={() => setToggle("login")}>
                    Se connecter
                </Button>
                <Button className="flex-1 py-2.5 rounded-xl text-[14px] font-bold text-gray-500 hover:text-gray-700 transition-colors no-underline text-center" onClick={() => setToggle("register")}>
                    S&apos;inscrire
                </Button>
            </div>
        </div>
        </Container>
    );
}