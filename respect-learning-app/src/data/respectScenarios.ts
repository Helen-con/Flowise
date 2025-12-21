export interface RespectScenario {
  id: string
  title: string
  scenario: string
  options: {
    text: string
    isHealthy: boolean
    explanation: string
  }[]
  respectPrinciple: string
}

export const respectScenarios: RespectScenario[] = [
  {
    id: '1',
    title: 'Checking Your Phone',
    scenario: 'Your partner asks to see your phone to check your messages. They say they just want to make sure you\'re not talking to anyone "suspicious."',
    options: [
      {
        text: 'This is normal - they care about me',
        isHealthy: false,
        explanation: 'Healthy relationships are built on trust. Constantly checking your phone is a sign of control, not care. Everyone deserves privacy.'
      },
      {
        text: 'This is a red flag - invasion of privacy',
        isHealthy: true,
        explanation: 'Correct! You have a right to privacy. A healthy partner trusts you and doesn\'t need to monitor your communications.'
      }
    ],
    respectPrinciple: 'Privacy & Trust'
  },
  {
    id: '2',
    title: 'Going Out With Friends',
    scenario: 'You want to hang out with friends, but your partner gets upset and says you spend too much time with them and not enough time together.',
    options: [
      {
        text: 'I should cancel to keep the peace',
        isHealthy: false,
        explanation: 'In healthy relationships, both people maintain their own friendships and interests. Isolating you from friends is a warning sign.'
      },
      {
        text: 'I can see my friends - we can plan time together too',
        isHealthy: true,
        explanation: 'Exactly! Healthy relationships allow for independence. You should both maintain friendships outside the relationship.'
      }
    ],
    respectPrinciple: 'Independence & Balance'
  },
  {
    id: '3',
    title: 'Sharing Passwords',
    scenario: 'Your partner wants you to share all your social media passwords "so we have no secrets."',
    options: [
      {
        text: 'Sharing passwords shows trust and commitment',
        isHealthy: false,
        explanation: 'Sharing passwords is actually about control, not trust. You don\'t need to prove your trustworthiness by giving up your privacy.'
      },
      {
        text: 'I can be trusted without sharing my passwords',
        isHealthy: true,
        explanation: 'Correct! Trust doesn\'t require surveillance. You have a right to keep your accounts private.'
      }
    ],
    respectPrinciple: 'Privacy & Boundaries'
  },
  {
    id: '4',
    title: 'Pressure to Send Photos',
    scenario: 'Your partner keeps asking you to send intimate photos. When you say no, they say "If you loved me, you would."',
    options: [
      {
        text: 'Maybe I should send them to prove my love',
        isHealthy: false,
        explanation: 'Never! This is manipulation. A respectful partner would never pressure you or make you feel guilty for saying no.'
      },
      {
        text: 'No means no - they should respect my decision',
        isHealthy: true,
        explanation: 'Absolutely right! Consent means respecting "no" without guilt-tripping. This pressure is a major red flag.'
      }
    ],
    respectPrinciple: 'Consent & Boundaries'
  },
  {
    id: '5',
    title: 'Controlling What You Wear',
    scenario: 'Your partner tells you your outfit is too revealing and asks you to change before going out.',
    options: [
      {
        text: 'They\'re just looking out for me',
        isHealthy: false,
        explanation: 'This is about control, not care. You have the right to choose what you wear. A healthy partner trusts and respects your choices.'
      },
      {
        text: 'I can wear what I want - it\'s my choice',
        isHealthy: true,
        explanation: 'Correct! You have autonomy over your own body and choices. No one should control how you dress.'
      }
    ],
    respectPrinciple: 'Autonomy & Respect'
  },
  {
    id: '6',
    title: 'Apologizing After Arguments',
    scenario: 'After an argument where your partner called you names, they apologize and promise it won\'t happen again. This is the third time this month.',
    options: [
      {
        text: 'Everyone makes mistakes - I should forgive them',
        isHealthy: false,
        explanation: 'A pattern of hurtful behavior followed by apologies is a cycle of abuse. Verbal abuse is never acceptable, even with apologies.'
      },
      {
        text: 'This is a pattern - apologies don\'t fix repeated harm',
        isHealthy: true,
        explanation: 'Exactly! Watch for patterns, not just promises. Repeated verbal abuse is serious, regardless of apologies.'
      }
    ],
    respectPrinciple: 'Respect & Safety'
  },
  {
    id: '7',
    title: 'Financial Control',
    scenario: 'Your partner wants to manage all your money "to help you save better" and asks you to check with them before making any purchases.',
    options: [
      {
        text: 'They\'re helping me be financially responsible',
        isHealthy: false,
        explanation: 'Financial control is a form of abuse. You should have autonomy over your own money and spending decisions.'
      },
      {
        text: 'I should control my own finances',
        isHealthy: true,
        explanation: 'Correct! Financial independence is important. A healthy partner might help with advice, but wouldn\'t control your money.'
      }
    ],
    respectPrinciple: 'Autonomy & Equality'
  },
  {
    id: '8',
    title: 'Location Sharing',
    scenario: 'Your partner installed a location-sharing app on your phone and gets upset when you turn it off.',
    options: [
      {
        text: 'It\'s for safety - I should keep it on',
        isHealthy: false,
        explanation: 'Constant location tracking is about control and surveillance, not safety. You have a right to privacy and freedom of movement.'
      },
      {
        text: 'Constant tracking is controlling behavior',
        isHealthy: true,
        explanation: 'Right! While occasionally sharing your location is fine, required constant tracking is a red flag for controlling behavior.'
      }
    ],
    respectPrinciple: 'Privacy & Trust'
  }
]
