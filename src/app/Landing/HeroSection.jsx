export default function HeroSection() {
    return (
        <div
            className={'flex flex-col mx-16 items-center mt-[100px] gap-6'}>
            <span className="font-bold text-3xl text-center">
                Start your habit <span className="text-primary"> journey! </span>
            </span>
            <p className="text-center text-sm sm:w-[430px]  w-[370px]">
                Feeling overwhelmed? Our easy-to-use habit tracker helps you take
                control of your day and achieve your goals.
            </p>

            <button className={`block text-sm font-light rounded-lg  px-9 py-3  text-primary border border-primary transition focus:outline-none hover:bg-primary hover:text-white`}
                    type="button">
                {`Let's get started!`}
            </button>

        </div>
    )
}
