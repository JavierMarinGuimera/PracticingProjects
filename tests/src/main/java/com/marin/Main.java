package com.marin;

import java.util.HashMap;

public class Main {

    public static String findShortestSubsequence(String input, String target) {
        if (input == null || target == null || input.length() < target.length()) {
            return "";
        }

        HashMap<Character, Integer> targetFreq = new HashMap<>();
        for (char ch : target.toCharArray()) {
            targetFreq.put(ch, targetFreq.getOrDefault(ch, 0) + 1);
        }

        int left = 0;
        int right = 0;
        int minLen = Integer.MAX_VALUE;
        int count = target.length();

        String result = "";

        while (right < input.length()) {
            char rightChar = input.charAt(right);

            if (targetFreq.containsKey(rightChar)) {
                if (targetFreq.get(rightChar) > 0) {
                    count--;
                }
                targetFreq.put(rightChar, targetFreq.get(rightChar) - 1);
            }

            while (count == 0) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    result = input.substring(left, right + 1);
                }

                char leftChar = input.charAt(left);

                if (targetFreq.containsKey(leftChar)) {
                    targetFreq.put(leftChar, targetFreq.get(leftChar) + 1);
                    if (targetFreq.get(leftChar) > 0) {
                        count++;
                    }
                }

                left++;
            }

            right++;
        }

        return result;
    }

    public static void main(String[] args) {
        String input = "ADOBECODEBANC";
        String target = "ABC";
        String shortestSubsequence = findShortestSubsequence(input, target);
        System.out.println("Shortest Subsequence: " + shortestSubsequence);
    }
}