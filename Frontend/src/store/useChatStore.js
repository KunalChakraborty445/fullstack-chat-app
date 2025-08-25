import { create } from 'zustand'
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { subscribeWithSelector } from 'zustand/middleware';
import { Socket } from 'socket.io-client';
import { useAuthStore } from './userAuthStore';


export const useChatStore =create((set,get) => ({
    messages:[],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,




    getUsers: async () => {
        set({ isUserLoading: true }); 
            try {
                const res = await axiosInstance.get('/messages/user');
                set({ users: res.data });
            } catch (error) {
                toast.error(error.response.data.message);
            }finally {
                set({ isUserLoading: false });
            }    
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data.message });
        } catch (error) {
            toast.error(error.response.data.message);
        }finally {
            set({ isMessagesLoading: false });
        }
    },


    sendMessage: async (messageData) => {
  const { selectedUser } = get();
  try {
    const res = await axiosInstance.post(
      `/messages/send/${selectedUser._id}`,
      messageData
    );

    set((state) => {
      console.log("Previous messages state:", state.messages);
      console.log("New message from backend:", res.data);

      return {
        messages: Array.isArray(state.messages)
          ? [...state.messages, res.data]
          : [res.data], // fallback if it's not an array
      };
    });
  } catch (error) {
    console.error("Send message error:", error);
    toast.error(error?.response?.data?.message || "Failed to send message");
  }
},

    subscribeToMessages: () =>{
        const  { selectedUser } = get();
        if(!selectedUser) return;  

        const socket = useAuthStore.getState().socket;

        //todo optimize this later

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return; // only add if the message is from the selected user

          set({
            messages: [...get().messages, newMessage]
          });  
        });
    },

    unSubcribeFromMessages: () =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),


    
})) ;