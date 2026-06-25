import { Message } from "@/generated/prisma/client";
import { create } from "zustand";

export interface Chat {
  id: string;
  title: string;
}

export type ChatMode = "TEXT" | "IMAGE";

interface ChatStore {
  chats: Chat[];
  selectedChat: Chat | null;
  messages: Message[];
  mode: ChatMode;

  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  removeChat: (chatId: string) => void;

  setSelectedChat: (
    chat: Chat | null
  ) => void;

  setMessages: (
    messages: Message[]
  ) => void;

  addMessage: (
    message: Message
  ) => void;

  clearMessages: () => void;

  setMode: (
    mode: ChatMode
  ) => void;
}

export const useChatStore =
  create<ChatStore>((set) => ({
    chats: [],

    selectedChat: null,

    messages: [],

    mode: "TEXT",

    setChats: (chats) =>
      set({
        chats,
      }),

    addChat: (chat) =>
      set((state) => ({
        chats: [
          chat,
          ...state.chats,
        ],
      })),

    removeChat: (chatId) =>
      set((state) => ({
        chats:
          state.chats.filter(
            (chat) =>
              chat.id !== chatId
          ),
      })),

    setSelectedChat: (
      chat
    ) =>
      set({
        selectedChat: chat,
      }),

    setMessages: (
      messages
    ) =>
      set({
        messages,
      }),

    addMessage: (
      message
    ) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    clearMessages: () =>
      set({
        messages: [],
      }),

    setMode: (mode) =>
      set({
        mode,
      }),
  }));
