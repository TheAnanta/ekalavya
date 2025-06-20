import { useAuthContext } from "@/context/AuthContext";
import {
  signInWithEkalavyaCustomCredential,
  signInWithGoogleAsPopup,
} from "@/lib/firebase";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInButton() {
  const apiHost = "http://127.0.0.1:5001/ekalavya-theananta/asia-south1/api";
  const user = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customClaims, setCustomClaims] = useState<any>(undefined);
  useEffect(() => {
    async function fetchCustomClaims() {
      if (user) {
        try {
          const token = await user.getIdTokenResult();
          setCustomClaims(token.claims);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching custom claims:", error);
          setLoading(false);
        }
      }
    }
    fetchCustomClaims();
  }, [user]);

  return (
    <>
      {user && customClaims ? (
        <a href="/profile">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              referrerPolicy="no-referrer"
              className="w-10 rounded-full h-10 object-cover"
            />
          ) : (
            <span className="material-symbols-outlined !text-3xl">
              account_circle
            </span>
          )}
        </a>
      ) : loading ? (
        <progress className="w-10 h-10 rounded-full animate-spin border-4 border-t-transparent border-blue-500" />
      ) : (
        <button
          onClick={() => {
            setLoading(true);
            signInWithGoogleAsPopup(
              async (user: User | null) => {
                if (!user) {
                  alert("User not found");
                  return;
                }
                const response = await fetch(`${apiHost}/login`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                  },
                });
                if (response.status === 404) {
                  // User not found, redirect to signup
                  const signupResponse = await fetch(`${apiHost}/register`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      emailId: user.email,
                      userName: (user.displayName || user.email!.split("@")[0])
                        .split(" ")
                        .join("")
                        .toLowerCase(),
                      uid: user.uid,
                    }),
                  });
                  if (signupResponse.ok) {
                    // Handle successful login
                    const signUpResult = await signupResponse.json();
                    console.log("Registration successful:", signupResponse);
                    alert("Signed in successfully.");
                    // Optionally, you can store user data in context or local storage
                    // For example, you can set user data in context
                  } else {
                    // Handle error
                    alert(
                      "Error signing in: " +
                        (await signupResponse.json()).message
                    );
                    return;
                  }
                } else if (response.ok) {
                  // Handle successful login
                  const result = await response.json();
                  console.log("Login successful:", result);
                  // Optionally, you can store user data in context or local storage
                  // For example, you can set user data in context
                  signInWithEkalavyaCustomCredential(
                    result.token,
                    () => {
                      router.refresh();
                      window.localStorage.setItem(
                        "username",
                        result.data.userName
                      );
                      window.localStorage.setItem(
                        "userData",
                        JSON.stringify(result.data)
                      );
                    },
                    (failure: string) => {
                      alert("Error signin in: " + failure);
                    }
                  );
                } else {
                  // Handle error
                  alert("Error signing in: " + (await response.json()).message);
                  return;
                }
              },
              (failure: string) => {
                alert("Error signin in: " + failure);
              }
            );
          }}
          className="border-2 border-black py-2 px-8 rounded-full cursor-pointer font-medium text-sm"
        >
          sign in
        </button>
      )}
    </>
  );
}
