import { Button, BtnContainer } from './LoadMoreBtn.styled';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({onLoadMore}) => {
    return (
        <BtnContainer>
            <Button type="button" onClick={onLoadMore}>Load more</Button>
        </BtnContainer>
    )
}

LoadMoreBtn.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}