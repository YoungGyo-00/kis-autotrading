package com.example.kisautotrading.global.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateUtil {
    public static String getTodayDateString() {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return today.format(formatter);
    }

    public static String convertToDashFormat(String yyyymmdd) {
        try {
            DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            LocalDate date = LocalDate.parse(yyyymmdd, inputFormatter);
            DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return date.format(outputFormatter);
        } catch (DateTimeParseException e) {
            System.err.println("Invalid date format. Please use 'yyyymmdd' format.");
            return null;
        }
    }
}
