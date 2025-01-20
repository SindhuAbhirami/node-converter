#!/usr/bin/env node

// Include the readline module for user input
const readline = require('readline');

// Set a fixed exchange rate
const exchangeRate = 82; // Example: 1 USD = 82 INR

// Create an interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to convert currency based on user input
function convertCurrency() {
  // Prompt the user to enter the amount and currency
  rl.question('\nEnter amount to convert (format: 100 INR or 100 USD, or type "exit" to quit): ', (input) => {
    // Check if the user wants to exit
    if (input.toLowerCase() === 'exit') {
      console.log('Exiting...');
      rl.close();
      return;
    }

    // Use a regular expression to parse the input
    const match = input.match(/^(\d+\.?\d*)\s*(INR|USD)$/i);
    if (!match) {
      console.log('Invalid input. Please enter in format: 100 INR or 100 USD.');
      return convertCurrency(); // Prompt again if input is invalid
    }

    // Extract the amount and currency type from the input
    const amount = parseFloat(match[1]);
    const currency = match[2].toUpperCase();
    let convertedAmount;

    // Perform the conversion
    if (currency === 'INR') {
      convertedAmount = (amount / exchangeRate).toFixed(2);
      console.log(`${amount} INR = ${convertedAmount} USD`);
    } else if (currency === 'USD') {
      convertedAmount = (amount * exchangeRate).toFixed(2);
      console.log(`${amount} USD = ${convertedAmount} INR`);
    }

    // Call the function recursively to allow multiple conversions
    convertCurrency();
  });
}

// Start the conversion process
convertCurrency();
