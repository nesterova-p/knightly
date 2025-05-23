import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useGlobalContextProvider } from "../../../../contextApi";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    }
};

const getAreaIcon = (areaName) => {
    switch(areaName.toLowerCase()) {
        case 'study':
            return <SchoolIcon sx={{ color: '#9EC77D', mr: 1 }} />;
        case 'code':
            return <CodeIcon sx={{ color: '#9EC77D', mr: 1 }} />;
        default:
            return null;
    }
};

function getStyles(name, selectedAreas, theme) {
    return {
        fontWeight: selectedAreas.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: selectedAreas.includes(name) ? '#f0f0f0' : 'transparent',
    };
}

export default function MultipleSelectChip({ onChange }) {
    const theme = useTheme();
    const { allAreasObject, habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;
    const { openHabitWindow } = habitWindowObject;
    const { selectedItems } = selectedItemsObject;

    const [selectedAreas, setSelectedAreas] = React.useState([]);
    const [selectedAreasItems, setSelectedAreasItems] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSelectedAreas(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    React.useEffect(() => {
        if (openHabitWindow) {
            if (selectedItems && selectedItems.areas) {
                const areaNames = selectedItems.areas.map(area => area.name);
                setSelectedAreas(areaNames);
                setSelectedAreasItems(selectedItems.areas);
            } else {
                setSelectedAreas([]);
                setSelectedAreasItems([]);
            }
        } else {
            setSelectedAreas([]);
            setSelectedAreasItems([]);
        }
    }, [openHabitWindow]);

    const filteredAreas = allAreas.filter((area) => area.name !== "All");

    React.useEffect(() => {
        const selectedAreasObjects = selectedAreas.map((selectedArea) => {
            return allAreas.find((area) => area.name === selectedArea);
        }).filter(Boolean);

        const hasChanged = selectedAreasObjects.length !== selectedAreasItems.length ||
            selectedAreasObjects.some((obj, index) => obj?.id !== selectedAreasItems[index]?.id);

        if (hasChanged) {
            setSelectedAreasItems(selectedAreasObjects);
        }
    }, [selectedAreas, allAreas, selectedAreasItems]);

    React.useEffect(() => {
        if (onChange && selectedAreasItems.length >= 0) {
            onChange(selectedAreasItems);
        }
    }, [selectedAreasItems, onChange]);

    return (
        <div style={{ marginBottom: '16px' }}>
            <FormControl sx={{
                m: 0,
                width: "100%",
                "& .Mui-focused .MuiInputLabel-root": {
                    color: "#9EC77D",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#9EC77D",
                },
                "& .MuiOutlinedInput-root": {
                    borderRadius: '8px',
                }
            }}>
                <InputLabel id="area-multiple-chip-label"
                            sx={{
                                color: '#9EC77D',
                                "&.Mui-focused": {
                                    color: "#9EC77D",
                                },
                            }}>
                    Choose Your Area...
                </InputLabel>
                <Select
                    labelId="area-multiple-chip-label"
                    id="area-multiple-chip"
                    multiple
                    value={selectedAreas}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Choose Your Area..." />}
                    sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9EC77D",
                        },
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    sx={{
                                        bgcolor: '#f0f0f0',
                                        color: '#666',
                                        borderRadius: '16px',
                                        height: '28px',
                                        '& .MuiChip-label': {
                                            fontWeight: 500,
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={{
                        ...MenuProps,
                        PaperProps: {
                            ...MenuProps.PaperProps,
                            style: {
                                ...MenuProps.PaperProps.style,
                                backgroundColor: 'white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }
                        }
                    }}
                >
                    {filteredAreas.map((area) => (
                        <MenuItem
                            key={area.id}
                            value={area.name}
                            style={getStyles(area.name, selectedAreas, theme)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: '#f0f7eb',
                                },
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                            }}
                        >
                            {getAreaIcon(area.name)}
                            {area.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}