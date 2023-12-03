package com.marin.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

public class ChatManager extends Thread {
    private static final String ASKING_MSG = "¿Qué quieres hacer?";
    private static final String HAS_TO_BE_NUMBER = "¡La opción tiene que ser un número!";
    private static final String WRONG_OPTION = "¡Tienes que elegir una opción disponible!";

    private static BufferedReader consoleReader;

    public static void main(String[] args) {
        new ChatManager();
    }

    public ChatManager() {
        System.out.println("¡ChatManager iniciado!");
        init();
    }

    public void init() {
        this.start();
    }

    public static String writeMessage() {
        if (consoleReader == null) {
            consoleReader = new BufferedReader(new InputStreamReader(System.in));
        }

        try {
            return consoleReader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    private void showMenu() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Elige una de las opciones: \n");
        stringBuilder.append("\t 0: Cerrar servidor. \n");
        stringBuilder.append("\t 1: Mostrar chats activos. \n");

        System.out.println(stringBuilder.toString());
    }

    @Override
    public void run() {
        super.run();

        Scanner sc = new Scanner(System.in);

        Integer optionChosen;

        while (ChatServer.serverActive) {
            System.out.println(ASKING_MSG);
            showMenu();

            try {
                optionChosen = Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException nfe) {
                System.out.println(HAS_TO_BE_NUMBER);
                continue;
            }

            switch (optionChosen) {
                case 0:
                    ChatServer.shutdownServer();
                    break;

                case 1:
                    System.out.println("INPROGRESS");
                    break;

                default:
                    System.out.println(WRONG_OPTION);
                    break;
            }
        }

        System.out.println(ChatServer.CLOSED_SERVER);

        sc.close();
    }
}
