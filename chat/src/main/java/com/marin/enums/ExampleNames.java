package com.marin.enums;

public enum ExampleNames {
    JAVI("Javi"),
    BECKY("Becky"),
    ALEX("Álex"),
    MADE("Made"),
    JONI("Joni"),
    SERGIO("Sergio"),
    ALVARO("Álvaro");

    private String name;

    private ExampleNames (String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
