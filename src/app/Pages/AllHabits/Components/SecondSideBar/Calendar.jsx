import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";


export default function Calendar() {
    return (
        <div className="flex mx-4 flex-col gap-6 justify-center items-center mt-14 rounded-xl p-5 pt-7 bg-slate-50 ">

                <DateCalendar
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
                            justifyContent: 'space-around',
                            width: '100%'
                        },
                        '& .MuiPickersCalendarHeader-root': {
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        },
                        "& .MuiPickersDay-root": {
                            fontWeight: '400',
                            borderRadius: '50%',
                        "&.Mui-selected": {
                            border: "none",
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            fontWeight: 'bold',
                                "&:focus, &:hover": {
                                    backgroundColor: "#9EC77D",
                                }
                            },
                        "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                        },
                        "& .MuiPickersDay-today": {
                            border: "none",
                            outline: "none !important",
                            backgroundColor: "#9EC77D",
                            color: "white",
                        }
                    }}
                />
        </div>
    )
}