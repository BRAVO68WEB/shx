import React from "react";

interface DashboardLayoutProps{
    children:React.ReactNode
}

const Layout = ({children}:DashboardLayoutProps) => {
    return <div className="flex min-h-screen">
        <div className="sidebar w-full max-w-xs h-screen bg-gray-800"></div>
        <main>{children}</main>

    </div>
}

export default Layout