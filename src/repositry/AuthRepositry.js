import { googleProvider, auth, db } from "../firebaseconfig";

class AuthRepository {
  signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      let userData = query.docs[0]?.data();
      if (query.docs.length === 0) {
        const savedData = await db.collection("users").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
        userData = (await savedData.get()).data();
      
      }
      return userData;
    } catch (err) {
      console.error(err);
      throw err.message;
    }
  };

  registerWithEmailAndPassword = async ({ name, email, password }) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const data = await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
     
      const temp = await (await data.get()).data();
     
      return temp;
    } catch (err) {
      throw err.message;
    }
  };

  logInWithEmailAndPassword = async ({ email, password }) => {
    try {
      const data = await auth.signInWithEmailAndPassword(email, password);
      return data;
    } catch (err) {
      throw err.message;
    }
  };

  logout = () => {
    auth.signOut();
  };
}
export default new AuthRepository();
