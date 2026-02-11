const grammarPoliceData = {
  primary: [
    { sentence: ["She", "don't", "like", "apples."], errorIndex: 1, correction: "doesn't" },
    { sentence: ["The", "childs", "are", "playing."], errorIndex: 1, correction: "children" },
    { sentence: ["He", "goed", "to", "school."], errorIndex: 1, correction: "went" },
    { sentence: ["I", "has", "a", "new", "bag."], errorIndex: 1, correction: "have" },
    { sentence: ["They", "is", "my", "best", "friends."], errorIndex: 1, correction: "are" },
    { sentence: ["We", "was", "happy", "yesterday."], errorIndex: 1, correction: "were" },
    { sentence: ["Her", "runned", "to", "the", "park."], errorIndex: 0, correction: "She" },
    { sentence: ["The", "dog", "catched", "the", "ball."], errorIndex: 2, correction: "caught" }
  ],
  secondary: [
    { sentence: ["Their", "going", "to", "the", "cinema."], errorIndex: 0, correction: "They're" },
    { sentence: ["She", "should", "of", "studied", "harder."], errorIndex: 2, correction: "have" },
    { sentence: ["Everyone", "brought", "their", "own", "lunch."], errorIndex: 2, correction: "his or her" },
    { sentence: ["Me", "and", "my", "friend", "went", "shopping."], errorIndex: 0, correction: "My friend and I" },
    { sentence: ["The", "affect", "of", "the", "rain", "was", "severe."], errorIndex: 1, correction: "effect" },
    { sentence: ["He", "did", "good", "on", "the", "test."], errorIndex: 2, correction: "well" },
    { sentence: ["I", "could", "care", "less", "about", "it."], errorIndex: 1, correction: "couldn't" },
    { sentence: ["Your", "the", "best", "student", "here."], errorIndex: 0, correction: "You're" }
  ],
  adult: [
    { sentence: ["Irregardless", "of", "the", "outcome,", "we", "proceed."], errorIndex: 0, correction: "Regardless" },
    { sentence: ["The", "data", "shows", "a", "clear", "trend."], errorIndex: 2, correction: "show" },
    { sentence: ["Please", "revert", "back", "to", "me", "soon."], errorIndex: 2, correction: "(remove 'back')" },
    { sentence: ["I", "would", "like", "to", "farther", "discuss", "this."], errorIndex: 4, correction: "further" },
    { sentence: ["Between", "you", "and", "I,", "this", "is", "wrong."], errorIndex: 3, correction: "me," },
    { sentence: ["The", "principle", "reason", "is", "cost."], errorIndex: 1, correction: "principal" },
    { sentence: ["She", "literally", "died", "of", "embarrassment."], errorIndex: 1, correction: "figuratively" },
    { sentence: ["Less", "people", "attended", "this", "year."], errorIndex: 0, correction: "Fewer" }
  ]
};

export default grammarPoliceData;
