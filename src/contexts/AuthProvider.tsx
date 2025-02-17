import { createContext, useEffect, useState, ReactNode } from "react";
import { 
    User, 
    createUserWithEmailAndPassword, 
    getAuth, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import app from "../config/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Define the context type
interface AuthContextType {
    registerNewUser: (email: string, password: string) => Promise<any>;
    loginWithEmail: (email: string, password: string) => Promise<any>;
    loginWithGoogle: () => Promise<any>;
    updateUser: (updateData: { displayName?: string; photoURL?: string }) => Promise<any>;
    logOutUser: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

// Create context with proper type
export const AuthProviderContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const axiosPublic = useAxiosPublic();

    // Create user 
    const registerNewUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const loginWithEmail = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Login / Register 
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update user profile
    const updateUser = (updateData: { displayName?: string; photoURL?: string }) => {
        return updateProfile(auth.currentUser as User, updateData);
    };

    // Log out user 
    const logOutUser = () => {
        return signOut(auth);
    };

    // Forgot password
    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    // On Auth state change 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Generate token
                const userInfo = { email: currentUser.email };
                const { data } = await axiosPublic.post("/jwt", userInfo);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
            } else {
                // Remove token 
                localStorage.removeItem("token");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, axiosPublic]);

    const authInfo: AuthContextType = {
        registerNewUser,
        loginWithEmail,
        loginWithGoogle,
        updateUser,
        logOutUser,
        resetPassword,
        user,
        setUser,
        loading
    };

    return (
        <AuthProviderContext.Provider value={authInfo}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;
