package com.marin.server;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class ChatServer extends Thread {
    public static final Integer PORT = 999;
    public static final int DEFAULT_TIMEOUT = 5000;
    public static final String CLOSED_SERVER = "Server cerrado.";

    public static Boolean serverActive = true;

    private static ChatServer chatServer;

    public ChatServer() {
        init();
    }

    public void init() {
        start();
    }

    public static void shutdownServer() {
        serverActive = false;

        synchronized (chatServer) {
            chatServer.notify();
        }
    }

    @Override
    public void run() {
        super.run();

        chatServer = this;

        ServerSocket serverSocket;
        try {
            serverSocket = new ServerSocket(PORT);

            Socket chatter1 = serverSocket.accept();
            chatter1.setSoTimeout(DEFAULT_TIMEOUT);

            Socket chatter2 = serverSocket.accept();
            chatter2.setSoTimeout(DEFAULT_TIMEOUT);

            System.out.println("Chatters connected!");

            Intercommunicator chatter1Tochatter2 = new Intercommunicator(chatter1.getInputStream(),
                    chatter2.getOutputStream());
            Intercommunicator chatter2Tochatter1 = new Intercommunicator(chatter2.getInputStream(),
                    chatter1.getOutputStream());

            synchronized (chatServer) {
                while (serverActive) {
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }

            // Esperamos a los hilos.
            try {
                chatter1Tochatter2.join();
                chatter2Tochatter1.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
