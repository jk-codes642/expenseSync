import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginFrom, setLoginFrom] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    setLoading(true);
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("confirmpassword: ", confirmPassword);

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User: ", user);
            toast.success("User craeted");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password should be match !");
        setLoading(false);
      }
    } else {
      toast.error("All fields are required!");
      setLoading(false);
    }
  };

  const loginWithEmail = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User logged in successfully!");
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are required!");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    setLoading(true);

    if (!user) return;

    const userRefer = doc(db, "users", user.uid);
    const userData = await getDoc(userRefer);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
        // toast.success("doc created");
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    } else {
      // toast.error("DOC already exits");
      setLoading(false);
    }
  };

  const googleAuth = () => {
    setLoading(true)
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          createDoc(user)
          setLoading(false)
          navigate('/dashboard')
          toast.success('User authenticated')
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          setLoading(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
        });
    } catch (e) {
      setLoading(false)
      toast.error(e.message)
    }
  };

  return (
    <>
      {loginFrom ? (
        <>
          {" "}
          <>
            <div className="w-[70%] max-w-[600px] h-auto mt-10 shadow-2xl border py-[1rem] px-[1.5rem]">
              <h2 className="font-medium text-[1.5rem] text-center mb-4">
                Login on{" "}
                <span className="text-[#000435]">
                  Expense<span className="font-bold">Sync</span>
                </span>
              </h2>
              <form>
                <Input
                  label={"Email"}
                  type={"email"}
                  state={email}
                  setState={setEmail}
                  placeholder={"john@gmail.com"}
                />
                <Input
                  label={"Password"}
                  type={"password"}
                  state={password}
                  setState={setPassword}
                  placeholder={"example@123"}
                />

                <Button
                  text={
                    loading ? "Loading..." : "Login Using Email and Password"
                  }
                  blue={false}
                  disabled={loading}
                  onClick={loginWithEmail}
                />
                <p className="text-center">OR</p>
                <Button
                  text={loading ? "Loading..." : "Login Using Google"}
                  blue={true}
                  onClick={googleAuth}
                />
                <p
                  className="text-center text-base cursor-pointer"
                  onClick={() => setLoginFrom(!loginFrom)}
                >
                  Don't have an account ? Click here.
                </p>
              </form>
            </div>
          </>
        </>
      ) : (
        <>
          <div className="w-[70%] max-w-[600px] h-auto mt-10 shadow-2xl border py-[1rem] px-[1.5rem]">
            <h2 className="font-medium text-[1.5rem] text-center mb-4">
              Sign up on{" "}
              <span className="text-[#000435]">
                Expense<span className="font-bold">Sync</span>
              </span>
            </h2>
            <form>
              <Input
                label={"Username"}
                state={name}
                setState={setName}
                placeholder={"John"}
              />
              <Input
                label={"Email"}
                type={"email"}
                state={email}
                setState={setEmail}
                placeholder={"john@gmail.com"}
              />
              <Input
                label={"Password"}
                type={"password"}
                state={password}
                setState={setPassword}
                placeholder={"example@123"}
              />
              <Input
                label={"Confirm Password"}
                type={"password"}
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder={"example@123"}
              />

              <Button
                text={
                  loading ? "Loading..." : "Sign Up Using Email and Password"
                }
                blue={false}
                disabled={loading}
                onClick={signupWithEmail}
              />
              <p className="text-center">OR</p>
              <Button
                text={loading ? "Loading..." : "Sign Up Using Google"}
                blue={true}
                onClick={googleAuth}
              />
              <p
                className="text-center text-base cursor-pointer"
                onClick={() => setLoginFrom(!loginFrom)}
              >
                Already have an account ? Click here.
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignup;
