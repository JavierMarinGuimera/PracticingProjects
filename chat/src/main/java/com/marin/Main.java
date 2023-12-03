package com.marin;

import com.marin.server.ChatManager;
import com.marin.server.ChatServer;

public class Main {
    public static void main(String[] args) {
        /**
         * We initialize the chatServer to handle the chatters.
         * The server will start itself automatically.
         */
        new ChatServer();

        /**
         * Let's initialize the ChatCommander to handle the server.
         */
        new ChatManager();
    }
}