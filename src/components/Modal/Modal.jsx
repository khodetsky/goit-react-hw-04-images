import { useEffect } from 'react';
import { ModalStyles, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({onClose, children}) => {

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        }
        
        window.addEventListener('keydown', handleKeyDown)
        return () => {
          window.removeEventListener('keydown', handleKeyDown)
        };
    }, [onClose]);

    const handleOverlayClck = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <Overlay onClick={handleOverlayClck}>
            <ModalStyles>
                {children}
            </ModalStyles>
        </Overlay>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any,
}