import {UserButton, useUser} from "@clerk/nextjs";

export default function UserProfile() {
    const userButtonAppearance = {
        elements: {
            userButtonAvatar: "w-14 h-14",
            userButtonPopover: 'text-primary',
        }
    }

    const { user } = useUser();

    return (
        <div className="flex flex-col items-center justify-center mt-9 gap-3">
            <UserButton appearance={userButtonAppearance} />
            {user && (
                <div>
                    <span>{user.fullName} </span>
                </div>
            )}
        </div>
    )
}