export default function HeroSection() {
    return (
        <div
            className={'flex flex-col mx-4 sm:mx-8 md:mx-16 items-center mt-[60px] sm:mt-[80px] md:mt-[100px] gap-4 sm:gap-6 px-4'}>
            <span className="font-bold text-2xl sm:text-3xl text-center">
                Start your habit <span className="text-primary"> journey! </span>
            </span>
            <p className="text-center text-sm max-w-[320px] sm:max-w-[430px] w-full px-2">
                Feeling overwhelmed? Our easy-to-use habit tracker helps you take
                control of your day and achieve your goals.
            </p>

            <button className={`block text-sm font-light rounded-lg px-6 sm:px-9 py-3 text-primary border border-primary transition focus:outline-none hover:bg-primary hover:text-white`}
                    type="button">
                {`Let's get started!`}
            </button>

        </div>
    )
}