import {SignIn} from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div
            className={"flex justify-center items-center flex-col gap-10 w-full h-screen bg-primary"}>

            <SignIn/>
        </div>
    )
}