package com.marin.utils;

import java.io.IOException;
import java.io.PrintStream;
import java.net.Socket;

import com.marin.chatter.Chatter;
import com.marin.server.ChatManager;
import com.marin.server.ChatServer;

public class ChatWriter extends Thread {
    private Socket chatterSocket;
    private Chatter chatter;

    public ChatWriter(Socket chatterSocket, Chatter chatter) {
        this.chatterSocket = chatterSocket;
        this.chatter = chatter;
        init();
    }

    private void init() {
        start();
    }

    @Override
    public void run() {
        String outgoingMessage;
        try (PrintStream out = new PrintStream(chatterSocket.getOutputStream())) {
            while (chatter.serverOnline) {
                outgoingMessage = "";
                
                while (outgoingMessage.equals("")) {
                    try {
                        outgoingMessage = ChatManager.writeMessage();
                    } catch (Exception e) {
                        if (ChatServer.serverActive) {
                            continue;
                        } else {
                            break;
                        }
                    }
                }

                if (ChatServer.serverActive && !outgoingMessage.equals("")) {
                    out.println(chatter.chatterName + ": " + outgoingMessage);
                    out.flush();
                }
            }

            chatterSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
