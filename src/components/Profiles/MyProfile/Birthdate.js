import React from 'react';
import PropTypes from 'prop-types';
import { getAge } from 'src/selectors/user';

const Birthdate = ({
  editBirthdate,
  handleSubmitBirthdate, dateOfBirth, editFormToggle, user, onChangeProfileInput, isEditing,
}) => (
  <>
    {isEditing && editBirthdate ? (
      <form type="submit" onSubmit={handleSubmitBirthdate}>
        <div>
          <label htmlFor="dateOfBirth">
            <input
              name="dateOfBirth"
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              className="myprofile__user--edit-input"
              onChange={(e) => onChangeProfileInput('dateOfBirth', e.target.value)}
              required
            />
          </label>
        </div>
        <div className="myprofile__user--submit-container">
          <button className="myprofile__user--edit-submit-btn" type="submit">Envoyer</button>
          <button
            type="button"
            onClick={() => editFormToggle('editBirthdate')}
            className="myprofile__user--close-edit-btn"
          >
            <i className="fas fa-times-circle" />
          </button>
        </div>
      </form>
    ) : (
      <div className="myprofile__user--age">
        {getAge(user.birthdate)} ans
        {isEditing && (
          <button
            type="button"
            onClick={() => editFormToggle('editBirthdate')}
            className="myprofile__user--edit-age"
          >
            <i className="fas fa-pen" />
          </button>
        )}
      </div>
    )}
  </>
);

Birthdate.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  editBirthdate: PropTypes.bool.isRequired,
  handleSubmitBirthdate: PropTypes.func.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  editFormToggle: PropTypes.func.isRequired,
  user: PropTypes.shape({
    birthdate: PropTypes.string,
  }),
  onChangeProfileInput: PropTypes.func.isRequired,
};

Birthdate.defaultProps = {

  user: {
    birthdate: '',
  },
};

export default Birthdate;
