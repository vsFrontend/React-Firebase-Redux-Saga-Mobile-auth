import PropTypes from "prop-types";

function Profile({ name, email, image = "./images/default.png", phone }) {
  return (
    <div class="card mb-3">
      <img src={image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{name || email}</h5>
        <p class="card-text">{email || phone}</p>
      </div>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Profile;
