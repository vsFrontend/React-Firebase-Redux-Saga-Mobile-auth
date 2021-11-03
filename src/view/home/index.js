import { connect } from "react-redux";

import Profile from "../../components/profile";
import Layout from "../../layout";
import { logOut } from "../../redux/auth/actions";

function Index({ dispatch, user }) {
  const { name, email, phone } = user;

  async function handleLogout() {
    dispatch(logOut());
  }

  return (
    <Layout>
      <div className="container">
        <Profile name={name} email={email} phone={phone} />
      </div>
      <div className="w-100 text-center mt-2">
        <button className="btn" variant="link" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </Layout>
  );
}

export default connect(({ auth }) => auth)(Index);
