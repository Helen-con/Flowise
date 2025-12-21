export interface FlagQuestion {
  id: string
  statement: string
  flagType: 'red' | 'green'
  category: string
  explanation: string
}

export const flagQuestions: FlagQuestion[] = [
  // RED FLAGS
  {
    id: 'r1',
    statement: 'They want to know your phone password and check your messages regularly',
    flagType: 'red',
    category: 'Trust & Privacy',
    explanation: 'Red Flag! Constantly checking your phone is a sign of controlling behavior, not trust. Everyone deserves privacy in a healthy relationship.'
  },
  {
    id: 'r2',
    statement: 'They get angry or upset when you spend time with friends or family',
    flagType: 'red',
    category: 'Independence',
    explanation: 'Red Flag! Isolation from loved ones is a major warning sign. Healthy relationships encourage maintaining other important relationships.'
  },
  {
    id: 'r3',
    statement: 'They pressure you to send intimate photos and get upset when you say no',
    flagType: 'red',
    category: 'Consent',
    explanation: 'Red Flag! This is sexual coercion. A respectful partner accepts "no" without pressuring or guilt-tripping you.'
  },
  {
    id: 'r4',
    statement: 'They call you names or put you down, especially in front of others',
    flagType: 'red',
    category: 'Respect',
    explanation: 'Red Flag! Verbal abuse and public humiliation are never acceptable. This is emotional abuse, not playful teasing.'
  },
  {
    id: 'r5',
    statement: 'They blame you for their angry outbursts or say "you made me do it"',
    flagType: 'red',
    category: 'Accountability',
    explanation: 'Red Flag! Everyone is responsible for their own actions. Blaming you for their behavior is manipulation and avoiding accountability.'
  },
  {
    id: 'r6',
    statement: 'They threaten to hurt themselves if you try to end the relationship',
    flagType: 'red',
    category: 'Manipulation',
    explanation: 'Red Flag! This is emotional manipulation. You are not responsible for their mental health or their choices.'
  },
  {
    id: 'r7',
    statement: 'They control what you wear or how you style your hair/makeup',
    flagType: 'red',
    category: 'Autonomy',
    explanation: 'Red Flag! Controlling your appearance is about power and control. You have autonomy over your own body and choices.'
  },
  {
    id: 'r8',
    statement: 'They track your location constantly and get upset if you turn it off',
    flagType: 'red',
    category: 'Privacy',
    explanation: 'Red Flag! Constant surveillance is controlling behavior. While occasionally sharing locations is fine, required tracking is not.'
  },
  {
    id: 'r9',
    statement: 'They push you to go further physically than you\'re comfortable with',
    flagType: 'red',
    category: 'Consent',
    explanation: 'Red Flag! Pressuring someone sexually is never okay. Consent means enthusiastic agreement without pressure.'
  },
  {
    id: 'r10',
    statement: 'They break or throw things when they\'re angry, even if not at you',
    flagType: 'red',
    category: 'Safety',
    explanation: 'Red Flag! Destruction of property is a warning sign of potential physical violence. This is meant to intimidate you.'
  },

  // GREEN FLAGS
  {
    id: 'g1',
    statement: 'They respect your decision when you say "no" to anything',
    flagType: 'green',
    category: 'Respect',
    explanation: 'Green Flag! Respecting boundaries and accepting "no" without getting upset is a sign of a healthy, respectful relationship.'
  },
  {
    id: 'g2',
    statement: 'They encourage you to spend time with friends and family',
    flagType: 'green',
    category: 'Independence',
    explanation: 'Green Flag! Healthy relationships support independence and maintaining other important relationships in your life.'
  },
  {
    id: 'g3',
    statement: 'They apologize sincerely when they\'ve done something wrong',
    flagType: 'green',
    category: 'Accountability',
    explanation: 'Green Flag! Taking responsibility and offering genuine apologies shows emotional maturity and respect.'
  },
  {
    id: 'g4',
    statement: 'They support your goals and celebrate your successes',
    flagType: 'green',
    category: 'Support',
    explanation: 'Green Flag! A healthy partner is genuinely happy for your achievements and supports your ambitions.'
  },
  {
    id: 'g5',
    statement: 'They communicate openly and honestly about their feelings',
    flagType: 'green',
    category: 'Communication',
    explanation: 'Green Flag! Open, honest communication is the foundation of a healthy relationship. No games or manipulation.'
  },
  {
    id: 'g6',
    statement: 'They trust you and don\'t constantly need to know where you are',
    flagType: 'green',
    category: 'Trust',
    explanation: 'Green Flag! Trust and giving each other space shows a secure, healthy relationship without controlling behaviors.'
  },
  {
    id: 'g7',
    statement: 'They listen to you and value your opinions, even when you disagree',
    flagType: 'green',
    category: 'Respect',
    explanation: 'Green Flag! Mutual respect means valuing each other\'s perspectives, even during disagreements.'
  },
  {
    id: 'g8',
    statement: 'They share responsibilities fairly and contribute equally',
    flagType: 'green',
    category: 'Equality',
    explanation: 'Green Flag! Healthy relationships are partnerships where both people contribute and share responsibilities.'
  },
  {
    id: 'g9',
    statement: 'They respect your privacy and don\'t demand access to your accounts',
    flagType: 'green',
    category: 'Privacy',
    explanation: 'Green Flag! Everyone deserves privacy. Trust doesn\'t require surveillance or access to all your accounts.'
  },
  {
    id: 'g10',
    statement: 'They handle disagreements calmly and work together to find solutions',
    flagType: 'green',
    category: 'Conflict Resolution',
    explanation: 'Green Flag! Healthy conflict resolution means working together respectfully, without yelling, insults, or violence.'
  }
]
