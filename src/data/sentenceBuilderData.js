const sentenceBuilderData = {
  primary: [
    { words: ["The", "cat", "sat", "on", "the", "mat"], correct: "The cat sat on the mat." },
    { words: ["I", "like", "to", "eat", "ice", "cream"], correct: "I like to eat ice cream." },
    { words: ["She", "is", "playing", "in", "the", "garden"], correct: "She is playing in the garden." },
    { words: ["My", "dog", "runs", "very", "fast"], correct: "My dog runs very fast." },
    { words: ["We", "go", "to", "school", "every", "day"], correct: "We go to school every day." },
    { words: ["The", "bird", "sings", "a", "beautiful", "song"], correct: "The bird sings a beautiful song." }
  ],
  secondary: [
    { words: ["Although", "it", "was", "raining", "we", "went", "outside"], correct: "Although it was raining we went outside." },
    { words: ["She", "studied", "hard", "because", "she", "wanted", "to", "pass"], correct: "She studied hard because she wanted to pass." },
    { words: ["The", "teacher", "who", "taught", "us", "grammar", "was", "excellent"], correct: "The teacher who taught us grammar was excellent." },
    { words: ["If", "I", "had", "more", "time", "I", "would", "read", "more"], correct: "If I had more time I would read more." },
    { words: ["Neither", "the", "students", "nor", "the", "teacher", "was", "late"], correct: "Neither the students nor the teacher was late." },
    { words: ["He", "not", "only", "speaks", "English", "but", "also", "French"], correct: "He not only speaks English but also French." }
  ],
  adult: [
    { words: ["I", "am", "writing", "to", "inquire", "about", "the", "position"], correct: "I am writing to inquire about the position." },
    { words: ["Please", "find", "attached", "my", "resume", "for", "your", "review"], correct: "Please find attached my resume for your review." },
    { words: ["We", "would", "appreciate", "your", "prompt", "response", "to", "this", "matter"], correct: "We would appreciate your prompt response to this matter." },
    { words: ["The", "quarterly", "report", "indicates", "significant", "growth", "in", "revenue"], correct: "The quarterly report indicates significant growth in revenue." },
    { words: ["I", "look", "forward", "to", "hearing", "from", "you", "soon"], correct: "I look forward to hearing from you soon." },
    { words: ["Could", "you", "please", "clarify", "the", "terms", "of", "the", "agreement"], correct: "Could you please clarify the terms of the agreement." }
  ]
};

export default sentenceBuilderData;
