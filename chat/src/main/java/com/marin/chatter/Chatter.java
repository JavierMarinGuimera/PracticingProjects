package com.marin.chatter;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

import com.marin.enums.ExampleNames;
import com.marin.server.ChatServer;
import com.marin.utils.ChatReader;
import com.marin.utils.ChatWriter;

public class Chatter extends Thread {
    private static Chatter thisChatter;

    public String chatterName;
    public Boolean serverOnline = false;

    public static void main(String[] args) {
        ExampleNames[] names = ExampleNames.values();
        
        thisChatter = new Chatter(ExampleNames.JAVI.getName());
    }

    public Chatter(String chatterName) {
        this.chatterName = chatterName;

        init();
    }

    private void init() {
        start();
    }

    public void endChatter() {
        this.serverOnline = false;

        synchronized (this) {
            thisChatter.notify();
        }
    }

    @Override
    public void run() {
        super.run();

        try {
            Socket chatterSocket = new Socket("localhost", ChatServer.PORT);
            chatterSocket.setSoTimeout(ChatServer.DEFAULT_TIMEOUT);

            if (chatterSocket.isConnected()) {
                serverOnline = true;
            }

            ChatWriter writer = new ChatWriter(chatterSocket, this);
            ChatReader reader = new ChatReader(chatterSocket, this);

            synchronized (this) {
                while (serverOnline) {
                    try {
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }

            try {
                writer.join();
                reader.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
