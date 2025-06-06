import UserProfile from "../../AllHabits/Components/SecondSideBar/UserProfile";
import MainStats from "../../AllHabits/Components/SecondSideBar/MainStats";
import Calendar from "../../AllHabits/Components/SecondSideBar/Calendar";
import DarkMode from "../../AllHabits/Components/DarkMode";
import { useUser } from "@clerk/nextjs";
import WoodenBoardChain from "../../../../components/pixel-ui/WoodenBoardChain/WoodenBoardChain";

export function AllHabitsRight() {
    const { user } = useUser();

    return (
        <div className="max-xl:w-full flex flex-col items-center mr-2 sm:mr-4 -mt-12 sm:-mt-14 -ml-2 sm:-ml-3 rounded-lg relative wooden-top-bar pixel-element px-0 py-0 overflow-hidden"
             style={{
                 backgroundImage: `url('/darkWoodBg.png')`,
                 backgroundSize: '100% 100%',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 imageRendering: 'pixelated',
                 width: '35%',
                 minHeight: '100vh',
                 borderRadius: '0.375rem'
             }}>


            <div className="relative z-10 w-full max-w-xs pb-4 mt-36">
                <div className="px-4 mb-2 w-full pt-1">
                    <div className="flex flex-col mb-2 mt-0">
                        <span className="text-lg sm:text-xl text-yellow-100">
                            <span className="font-bold">Hi</span>
                            <span className="font-light">, {user?.firstName || user?.username || 'Polinka'}</span>
                        </span>
                        <span className="font-light text-[12px] text-yellow-200">welcome back!</span>
                    </div>
                    <DarkMode/>
                </div>

                <div className="w-full flex justify-center items-center -mt-14 sm:-mt-16">
                    <div style={{ transform: 'scale(0.6)', transformOrigin: 'center' }}>
                        <WoodenBoardChain>
                            <MainStats/>
                        </WoodenBoardChain>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center mb-28 px-2">
                    <div className="w-full max-w-sm"
                         style={{
                             padding: '2px',
                             borderWidth: '16px',
                             borderStyle: 'solid',
                             borderImageSource: `url('/UI-books-&-more_0000_page.png')`,
                             borderImageSlice: '16 fill',
                             borderImageWidth: '16px',
                             borderImageRepeat: 'stretch',
                             imageRendering: 'pixelated',
                             WebkitImageRendering: 'pixelated',
                             MozImageRendering: '-moz-crisp-edges',
                             backgroundColor: '#fbe0b4',
                             borderRadius: '8px',
                             minHeight: '320px'
                         }}>
                        <Calendar/>
                    </div>
                </div>
            </div>
        </div>
    )
}