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
        <div className="flex w-full flex-col gap-2 justify-center items-center mt-5 mb-5 rounded-lg p-4" // Usunąłem mx-2 sm:mx-4, max-sm:mx-2, bg-slate-50
             style={{
                 backgroundColor: 'rgb(83,55,34,0.3)',
                 backdropFilter: 'blur(2px)',
             }}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    onChange={handleOnChangeDate}
                    value={value}
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        transform: { xs: 'scale(0.85)', sm: 'scale(1)' },
                        '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
                            justifyContent: 'space-around',
                            width: '100%'
                        },
                        '& .MuiPickersCalendarHeader-root': {
                            paddingLeft: { xs: '5px', sm: '10px' },
                            paddingRight: { xs: '5px', sm: '10px' },
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, // Zwiększono rozmiar
                            color: '#FFE4B5', // Jasny kremowy kolor
                            fontWeight: 'bold',
                            textShadow: '1px 1px 0px #000000', // Pixelowy text-shadow
                            fontFamily: 'var(--pixelify-font)' // Pixelowy font
                        },
                        "& .MuiPickersDay-root": {
                            fontWeight: '600', // Zwiększono font-weight
                            borderRadius: '0px', // Kwadratowe zamiast okrągłe (pixelowy styl)
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, // Zwiększono rozmiar
                            padding: { xs: '0.5rem', sm: '0.6rem', md: '0.8rem' },
                            margin: { xs: '1px', sm: '2px' },
                            color: '#FFE4B5', // Jasny kremowy kolor
                            textShadow: '1px 1px 0px #000000', // Pixelowy text-shadow
                            fontFamily: 'var(--pixelify-font)', // Pixelowy font
                            "&.Mui-selected": {
                                border: "2px solid #FFFFFF",
                                backgroundColor: "#9EC77D",
                                color: "white",
                                textShadow: '1px 1px 0px #000000',
                                "&:focus, &:hover": {
                                    backgroundColor: "#9EC77D",
                                }
                            },
                            "&:hover": {
                                backgroundColor: "rgba(255, 228, 181, 0.2)", // Hover z kremowym kolorem
                            },
                        },
                        "& .MuiPickersDay-today": {
                            border: "2px solid #FF6B6B", // Czerwona ramka dla dzisiaj
                            backgroundColor: "rgba(255, 107, 107, 0.3)",
                            color: "#FFE4B5",
                            textShadow: '1px 1px 0px #000000',
                            "&.Mui-selected": {
                                backgroundColor: "#9EC77D",
                                border: "2px solid #FFFFFF",
                            }
                        },
                        "& .MuiPickersYear-yearButton": {
                            color: '#FFE4B5',
                            fontFamily: 'var(--pixelify-font)',
                            textShadow: '1px 1px 0px #000000',
                            "&.Mui-selected": {
                                backgroundColor: "#9EC77D",
                                color: "white"
                            }
                        },
                        "& .MuiPickersCalendarHeader-switchViewButton": {
                            color: '#FFE4B5',
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                            color: '#FFE4B5',
                        },
                        "& .MuiDayCalendar-weekDayLabel": {
                            color: '#D3D3D3', // Jasny szary dla dni tygodnia
                            fontWeight: 'bold',
                            textShadow: '1px 1px 0px #000000',
                            fontFamily: 'var(--pixelify-font)'
                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}