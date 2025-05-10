import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar() {
    return (
        <div className="flex mx-4 w-full flex-col gap-6 justify-center items-center mt-5 mb-5 rounded-xl p-3 pt-5 bg-slate-50 max-sm:mx-2">
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
                    '& .MuiPickersCalendarHeader-label': {
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                    },
                    "& .MuiPickersDay-root": {
                        fontWeight: '400',
                        borderRadius: '50%',
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        padding: { xs: '0.5rem', sm: '0.75rem' },
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
                        border: "1px solid #cfcfcf",
                        backgroundColor: "#9EC77D",
                        color: "white",
                    }
                }}
            />
        </div>
    )
}