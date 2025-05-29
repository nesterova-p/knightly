import React from 'react';
import './PixelButton.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PixelButton({
                                children,
                                onClick,
                                disabled = false,
                                size = 'medium',
                                variant = 'primary',
                                className = '',
                                type = 'button',
                                ...props
                            }) {
    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return 'px-4 py-2 text-sm min-h-[40px]';
            case 'large':
                return 'px-8 py-4 text-lg min-h-[60px]';
            case 'medium':
            default:
                return 'px-6 py-3 text-base min-h-[50px]';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'secondary':
                return 'pixel-button-secondary';
            case 'danger':
                return 'pixel-button-danger';
            case 'primary':
            default:
                return 'pixel-button-primary';
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                pixel-button 
                ${getVariantClasses()} 
                ${getSizeClasses()} 
                ${disabled ? 'pixel-button-disabled' : ''} 
                ${className}
            `.trim()}
            {...props}
        >
            <span className="pixel-button-text">
                {children}
            </span>
        </button>
    );
}

export function PixelButtonIcon({
                                    icon,
                                    children,
                                    iconPosition = 'left',
                                    ...buttonProps
                                }) {
    return (
        <PixelButton {...buttonProps}>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {iconPosition === 'left' && icon && (
                    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                )}
                {children}
                {iconPosition === 'right' && icon && (
                    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                )}
            </div>
        </PixelButton>
    );
}