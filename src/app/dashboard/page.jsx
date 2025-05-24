"use client";
import Sidebar from "../../app/Sidebar/Sidebar";
import {useGlobalContextProvider} from "../contextApi";
import {useCallback, useEffect, useState} from "react";
import Areas from "../Pages/Areas/Areas";
import Statistics from "../Pages/Statistics/Statistics";
import AllHabits from "../AllHabits";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { requestNotificationPermission, checkScheduledNotifications } from "../utils/notificationFunctions";
import toast from "react-hot-toast";

export default function Dashboard() {
    const {menuItemsObject} = useGlobalContextProvider();
    const {menuItems} = menuItemsObject;
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [notificationPermission, setNotificationPermission] = useState('default');
    const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
    const [isClient, setIsClient] = useState(false);

    let selectedComponent = null;

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
    }, []);

    useEffect(() => {
        if (!isClient) return;
        checkScheduledNotifications();
        const interval = setInterval(checkScheduledNotifications, 60000);
        return () => clearInterval(interval);
    }, [isClient]);

    useEffect(() => {
        if (!isClient || hasRequestedPermission) return;

        const requestPermissionOnLoad = async () => {
            if (typeof window === 'undefined' || !('Notification' in window)) return;
            if (Notification.permission === 'granted' || Notification.permission === 'denied') {
                setNotificationPermission(Notification.permission);
                return;
            }
            if (localStorage.getItem('notificationDeclined')) return;

            setTimeout(async () => {
                setHasRequestedPermission(true);
                toast.loading('Enable notifications for habit reminders?', {
                    duration: 2000,
                    id: 'permission-request'
                });

                setTimeout(async () => {
                    const granted = await requestNotificationPermission();
                    if (granted) {
                        setNotificationPermission('granted');
                        toast.success('Great! You\'ll receive habit reminders', {
                            id: 'permission-result'
                        });
                    } else {
                        setNotificationPermission('denied');
                        localStorage.setItem('notificationDeclined', 'true');
                        toast.error('No problem! You can enable notifications later in settings', {
                            id: 'permission-result'
                        });
                    }
                }, 1500);
            }, 2000);
        };

        requestPermissionOnLoad();
    }, [isClient, hasRequestedPermission]);

    const handleRequestPermission = useCallback(async () => {
        localStorage.removeItem('notificationDeclined');
        const granted = await requestNotificationPermission();
        if (granted) {
            setNotificationPermission('granted');
            toast.success('Notifications enabled!');
        } else {
            setNotificationPermission('denied');
            toast.error('Notifications disabled. You can enable them in your browser settings.');
        }
    }, []);

    useEffect(() => {
        menuItems.forEach(menuItem => {
            if (menuItem.isSelected) {
                setSelectedMenu(menuItem);
            }
        })
    }, [menuItems]);

    switch (selectedMenu && selectedMenu.name) {
        case "All Habits":
            selectedComponent = <AllHabits />;
            break;
        case "Statistics":
            selectedComponent = <Statistics />;
            break;
        case "Areas":
            selectedComponent = <Areas />;
            break;
        default:
            selectedComponent = null;
    }

    return(
        <div className="flex bg-slate-50">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Sidebar />
                {selectedComponent}
                <SoftLayer/>

                {isClient && notificationPermission === 'denied' && (
                    <div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm">
                                    Notifications are disabled.
                                    <button
                                        onClick={handleRequestPermission}
                                        className="ml-2 text-yellow-800 underline hover:text-yellow-900"
                                    >
                                        Enable now
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </LocalizationProvider>
        </div>
    )
}

function SoftLayer(){
    const {openSideBarObject} = useGlobalContextProvider();
    const {openSideBar} = openSideBarObject;
    return (
        <div className={`w-full h-full bg-black fixed top-0 left-0 opacity-25 z-40 ${openSideBar ? "fixed" : "hidden"} `}>
        </div>
    )
}