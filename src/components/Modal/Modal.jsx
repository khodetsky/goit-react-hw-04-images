import { Component } from 'react';
import { ModalStyles, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClck = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    
    render() {
        return (
            <Overlay onClick={this.handleOverlayClck}>
                <ModalStyles>
                    {this.props.children}
                </ModalStyles>
            </Overlay>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any,
}