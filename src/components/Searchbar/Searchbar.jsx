import { Formik} from "formik";
import { SearchbarStyles, SearchForm, SearchFormButton, SearchFormInput  } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
    return (
        <SearchbarStyles>
            <Formik initialValues={{searchValue: ''}} onSubmit={onSubmit}>
                <SearchForm>
                    <SearchFormButton type="submit">
                        Search
                        {/* <SearchFormButtonLabel></SearchFormButtonLabel> */}
                    </SearchFormButton>
                    <SearchFormInput
                        name="searchValue"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </Formik>
        </SearchbarStyles>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
