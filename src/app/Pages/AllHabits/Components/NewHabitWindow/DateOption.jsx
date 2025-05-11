import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function DateOption({ selectedDate, setSelectedDate }) {
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate.toDate());
    };

    return (
        <div className="mt-3 flex flex-col gap-2">
            <span className="font-medium opacity-85">Select Date</span>
            <div className="p-1 bg-slate-50 rounded-xl">
                <DateCalendar
                    value={dayjs(selectedDate)}
                    onChange={handleDateChange}
                    disablePast
                    views={['day']}
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        height: '270px',
                        '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
                            justifyContent: 'space-around',
                            width: '100%',
                            margin: 0,
                        },
                        '& .MuiPickersCalendarHeader-root': {
                            paddingLeft: '8px',
                            paddingRight: '8px',
                            marginTop: '6px',
                            paddingBottom: '6px',
                            minHeight: '44px',
                            height: '44px'
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            fontSize: '1rem'
                        },
                        '& .MuiDateCalendar-root': {
                            padding: '0',
                        },
                        "& .MuiPickersDay-root": {
                            fontWeight: '400',
                            borderRadius: '50%',
                            fontSize: '0.8rem',
                            margin: '1px',
                            padding: 0,
                            height: '30px',
                            width: '30px',
                            "&.Mui-selected": {
                                border: "none",
                                backgroundColor: "#9EC77D",
                                color: "white",
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
                            backgroundColor: "#4B5563",
                            color: "white",
                            "&.Mui-selected": {
                                backgroundColor: "#9EC77D",
                            }
                        },
                        "& .MuiDayCalendar-weekContainer": {
                            margin: '3px 0',
                        },
                        "& .MuiDayCalendar-header": {
                            height: '28px',
                            marginBottom: '4px',
                        },
                        "& .MuiDayCalendar-weekDayLabel": {
                            width: '30px',
                            height: '28px',
                            fontSize: '0.75rem',
                            maxWidth: '30px',
                            overflow: 'hidden',
                            textOverflow: 'clip',
                            fontWeight: '600',
                        }
                    }}
                />
            </div>
        </div>
    );
}