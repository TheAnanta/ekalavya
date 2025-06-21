/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthContext } from "@/context/AuthContext";
import { signInWithEkalavyaCustomToken } from "@/lib/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

interface GoogleCredentialResponse {
  credential?: string; // This is the Google ID Token (JWT)
  select_by?: "auto" | "user" | "shared";
  // Other fields might exist
}

export default function SignInButton() {
  const apiHost =
    "https://asia-south1-ekalavya-theananta.cloudfunctions.net/api";
  const user = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Replace with your Google Cloud Web Client ID
  const GOOGLE_CLIENT_ID =
    "233530770064-63e8b8vfeuc65ft7gajjnnh0krbit9v0.apps.googleusercontent.com";
  // Replace with your backend endpoint that exchanges Google ID Token for Firebase Custom Token
  const YOUR_BACKEND_AUTH_ENDPOINT = `${apiHost}/login`; // e.g., http://localhost:3000/api/google-auth

  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false); // New state for script load status

  // Effect to load Google GSI script dynamically
  useEffect(() => {
    const scriptId = "google-gsi-client-script";
    if (document.getElementById(scriptId)) {
      setIsGoogleScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Identity Services script loaded.");
      setIsGoogleScriptLoaded(true);
      if ((window as any).google) {
        initializeGoogleSignIn();
      }
    };
    script.onerror = () => {
      console.error("Failed to load Google Identity Services script.");
      setLoading(false); // Stop loading indicator if script fails
      alert("Failed to load Google Sign-In script. Please try again later.");
    };

    document.head.appendChild(script);
  }, []); // Runs once on mount

  // Callback function for Google Sign-In
  const handleGoogleSignInResponse = async (
    response: GoogleCredentialResponse
  ) => {
    const googleIdToken = response.credential;

    if (!googleIdToken) {
      console.error("Google ID Token not found in response:", response);
      setLoading(false);
      alert("Google Sign-In failed: No ID token received.");
      return;
    }

    try {
      // Step 3: Send Google ID Token to your backend
      const res = await fetch(YOUR_BACKEND_AUTH_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${googleIdToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to get Firebase Custom Token from backend"
        );
      }

      const data = await res.json();
      const firebaseCustomToken = data.token;

      if (!firebaseCustomToken) {
        throw new Error("Firebase Custom Token not received from backend.");
      }

      // Step 4: Use the Firebase Custom Token to sign in to Firebase Auth on the client
      await signInWithEkalavyaCustomToken(
        firebaseCustomToken,
        (user: User) => {
          console.log("Successfully signed into Firebase with custom token!");
          setLoading(false);
          // onSignInSuccess(); // Notify parent component of success
        },
        (error: any) => {
          console.error("Firebase sign-in failed:", error);
          setLoading(false);
          alert("Firebase sign-in failed: " + error.message);
        }
      );
    } catch (error: any) {
      console.error("Sign-in process failed:", error);
      setLoading(false);
      alert(error); // Notify parent component of error
    }
  };

  // Function to initialize and render Google's button programmatically
  // This is used to trigger the popup flow from your custom button click
  const initializeGoogleSignIn = () => {
    if (!(window as any).google) {
      console.error("Google Identity Services script not available.");
      return;
    }

    console.log("Initializing Google Sign-In...");

    // Initialize Google Identity Services
    (window as any).google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleSignInResponse,
    });

    // We'll create a hidden div and render Google's button there.
    // Clicking our custom button will programmatically click this hidden Google button.
    // This is a common workaround to correctly trigger Google's popups from custom buttons.
    const googleButtonContainerId = "hidden-google-signin-container";
    let container = document.getElementById(googleButtonContainerId);
    if (!container) {
      container = document.createElement("div");
      container.id = googleButtonContainerId;
      container.style.display = "none"; // Keep it hidden
      document.body.appendChild(container);

      (window as any).google.accounts.id.renderButton(container, {
        type: "standard", // "icon" is also an option
        theme: "outline",
        size: "large",
        click_listener: () => {
          // This is the click listener for Google's *internal* button.
          // It will trigger the actual Google authentication flow.
          console.log("Hidden Google button clicked.");
        },
      });
    }
  };

  return (
    <>
      {user ? (
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
      ) : (
        <button
          onClick={() => {
            setLoading(true);
            const hiddenGoogleButton = document.querySelector(
              '#hidden-google-signin-container div[role="button"]'
            );
            if (hiddenGoogleButton instanceof HTMLElement) {
              hiddenGoogleButton.click();
            } else {
              console.log(
                document.querySelector("#hidden-google-signin-container")
              );
              console.error("Hidden Google sign-in button not found.");
              setLoading(false);
              alert("Google Sign-In was not ready.");
            }
          }}
          className={`border-2 border-black py-2 px-8 rounded-full font-medium text-sm
                  ${
                    loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
          disabled={loading}
        >
          {loading ? "signing in..." : "sign in"}
        </button>
      )}
    </>
  );
}
