import {SignIn, SignUp} from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div
            className={"flex justify-center items-center flex-col gap-10 w-full h-screen bg-primary"}>

            <SignUp/>
        </div>
    )
}