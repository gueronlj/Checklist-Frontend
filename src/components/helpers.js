import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export function createUser( email, password ) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(`${user} was created`);
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return `${errorCode}:${errorMessage}`;
    });
}

export function loginUser( email, password ) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`${errorCode}:${errorMessage}`);
  })
}

export function addObserver(user){
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(`${user.email} logged in`);
    } else {
      // User is signed out
      console.log(`logged out`);
    }
  })
}

export function logoutUser(){
  const auth = getAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  console.log(error.message);
});
}
