package com.marin.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

import com.marin.chatter.Chatter;
import com.marin.server.Intercommunicator;

public class ChatReader extends Thread {
    private Socket chatterSocket;
    private Chatter chatter;

    public ChatReader(Socket chatterSocket, Chatter chatter) {
        this.chatterSocket = chatterSocket;
        this.chatter = chatter;

        init();
    }

    private void init() {
        start();
    }

    @Override
    public void run() {
        super.run();
        String msg = "";
        
        try (BufferedReader chatterReader = new BufferedReader(new InputStreamReader(chatterSocket.getInputStream()))) {
            while (chatter.serverOnline) {
                // Recibo de mensaje:
                msg = "";

                while (msg == null || msg.equals("")) {
                    try {
                        msg = chatterReader.readLine();
                    } catch (IOException ioe) {
                        continue;
                    }
                }

                System.out.print(msg + "\n");

                if (msg.equals(Intercommunicator.ENDING_MESSAGE)) {
                    chatter.endChatter();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
