package com.marin.server;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;

public class Intercommunicator extends Thread {
    public static final String ENDING_MESSAGE = "!END";

    private BufferedReader chatterReceiving;
    private PrintStream chatterSending;

    public Intercommunicator(InputStream chatterReceiving, OutputStream chatterSending) {
        this.chatterReceiving = new BufferedReader(new InputStreamReader(chatterReceiving));
        this.chatterSending = new PrintStream(chatterSending);

        init();
    }
    
    private void init() {
        start();
    }

    @Override
    public void run() {
        super.run();

        String msg = "";

        while (ChatServer.serverActive) {
            try {
                msg = chatterReceiving.readLine();
            } catch (Exception e) {
                if (!ChatServer.serverActive) {
                    break;
                } else {
                    continue;
                }
            }

            chatterSending.println(msg);
            chatterSending.flush();

            msg = "";
        }

        chatterSending.println(ENDING_MESSAGE);
    }
}
