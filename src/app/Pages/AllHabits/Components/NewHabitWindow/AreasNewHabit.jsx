import React, { memo, useCallback } from 'react';
import MultipleSelectChip from '../NewHabitWindow/MultipleSelectChip';

function AreasNewHabit({ onChange }) {
    const getSelectedItems = useCallback((selectedItems) => {
        if (onChange) {
            onChange(selectedItems);
        }
    }, [onChange]);

    return (
        <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Areas</h3>
            <MultipleSelectChip onChange={getSelectedItems} />
        </div>
    );
}

export default memo(AreasNewHabit);