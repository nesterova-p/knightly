import { useGlobalContextProvider } from "../../../../contextApi";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

export default function Calendar() {
    const { darkModeObject, selectedCurrentDayObject, offsetDayObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { selectedCurrentDay, setSelectedCurrentDay } = selectedCurrentDayObject;
    const { setOffsetDay } = offsetDayObject;

    const value = selectedCurrentDay
        ? dayjs(selectedCurrentDay)
        : null;

    function handleOnChangeDate(newDate) {
        const jsDate = newDate.toDate();
        const currentDate = new Date();
        const differenceInMs = jsDate.getTime() - currentDate.getTime();
        const differenceInDays = differenceInMs / (1000 * 3600 * 24);

        setOffsetDay(Math.floor(differenceInDays + 1));
    }

    return (
        <div className={`flex mx-4 w-full flex-col gap-6 justify-center items-center mt-5 mb-5 rounded-xl p-3 pt-5 ${isDarkMode ? 'bg-gray-800' : 'bg-slate-50'} max-sm:mx-2`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    onChange={handleOnChangeDate}
                    value={value}
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
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            color: isDarkMode ? '#FFFFFF' : '#1F2937'
                        },
                        "& .MuiPickersDay-root": {
                            fontWeight: '400',
                            borderRadius: '50%',
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            padding: { xs: '0.5rem', sm: '0.75rem' },
                            color: isDarkMode ? '#FFFFFF' : '#1F2937',
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
                        "& .MuiPickersYear-yearButton": {
                            color: isDarkMode ? '#FFFFFF' : '#1F2937',
                            "&.Mui-selected": {
                                backgroundColor: "#9EC77D",
                                color: "white"
                            }
                        },
                        "& .MuiPickersCalendarHeader-switchViewButton": {
                            color: isDarkMode ? '#FFFFFF' : '#1F2937',
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                            color: isDarkMode ? '#FFFFFF' : '#1F2937',
                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}