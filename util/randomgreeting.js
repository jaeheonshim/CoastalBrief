const greetings = [
    "We're glad you're here.",
    "Ready to plan the perfect vacation?",
    "Thanks for stopping by.",
    "Ready... set... go!",
    "It's great to see you.",
    "Pleased to meet you."
];

module.exports = () => greetings[Math.floor(Math.random() * greetings.length)];