import {useEffect, useRef} from "react";
import "./css/popup-menu.css";
import close_icon from "./assets/images/close-icon.png";

const PopupMenu = ({visible, onClose, title, style = {}, children}) => {
    const popupRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };

    const preventEvents = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.addEventListener('wheel', preventEvents, { passive: false });
            popupRef.current.addEventListener('mousedown', preventEvents, { passive: false });
        }

        return () => {
            if (popupRef.current) {
                popupRef.current.removeEventListener('wheel', preventEvents);
                popupRef.current.removeEventListener('mousedown', preventEvents);
            }
        };
    });

    if (visible) {
        document.addEventListener('keydown', handleKeyDown);

        return (
            <div
                className={`popup-container`}
                ref={popupRef}
            >
                <div
                    className={`popup-bg`}
                    onClick={onClose}
                />
                <div
                    className={`popup-window`}
                    style={style}
                >
                    <div className={`popup-top-bar`}>
                        <div className={`popup-top-bar-title`}>
                            {title}
                        </div>
                        <div
                            className={`popup-top-bar-close-button`}
                            onClick={onClose}
                        >
                            <img
                                className={`popup-top-bar-close-button-icon`}
                                src={close_icon}
                                alt={`close-icon`}
                            />
                        </div>
                    </div>
                    <div className={`popup-content-container`}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
};

export default PopupMenu;