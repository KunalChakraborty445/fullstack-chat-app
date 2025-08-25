import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";



export const useAuthStore = create((set,get) =>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn:false, //here extra 'g'
    isUpdatingProfile:false,
    onlineUsers:[],
    socket:null,



    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance("/auth/check");

            set({authUser:res.data});//here it is check it ,,if not ,,,it coming from the backend
            get().connectSocket(); // Connect socket after auth check
        } catch (error) {
            console.log("Error checking auth:", error);
            // If there's an error, we assume the user is not authenticated
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

   signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data }); // ✅ now user is stored in Zustand
        toast.success("Account created successfully");

        get().connectSocket(); // Connect socket after signup
        return true; // ✅ let component know signup worked
    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
        return false;
    } finally {
        set({ isSigningUp: false });
    }
},


    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Loggin in successfully");

            get().connectSocket(); // Connect socket after login
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket(); // always call the function, not optional chaining
        } catch (error) {
            const message = error?.response?.data?.message || "Logout failed. Please try again.";
            toast.error(message);
            console.error("Logout error:", error);
        }
    },


  
  updateProfile: async (data) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    set({ authUser: res.data });
    toast.success("Profile updated successfully");  // ✅ should show
  } catch (error) {
    console.log("error in update profile:", error);
    toast.error(error.response?.data?.message || "Failed to update profile");

  } finally {
    set({ isUpdatingProfile: false });
  }
},

    connectSocket: () =>{
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;


        const socket = io(BASE_URL,  {
            query: {
                userId: authUser._id,
            }
        } );
        socket.connect();

        set({ socket: socket});

        socket.on("getOnlineUsers", (userIds) =>{
            set({ onlineUsers: userIds});
        })
        
    },
    disconnectSocket: () =>{
        if(get().socket?.connected) get().socket.disconnect();
    },



}));



