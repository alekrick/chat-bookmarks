interface TopicResponse {
  keywords: string[];
  responses: string[];
}

const topics: TopicResponse[] = [
  {
    keywords: [
      "recipe",
      "cook",
      "food",
      "meal",
      "dinner",
      "lunch",
      "breakfast",
      "chicken",
      "pasta",
      "salad",
      "bake",
      "ingredient",
      "calories",
      "diet",
    ],
    responses: [
      `Here's a quick and easy approach:

**Ingredients (serves 2):**
- 2 chicken breasts (or thighs for more flavour)
- 1 tbsp olive oil
- 2 cloves garlic, minced
- Salt, pepper, and your favourite seasoning
- Fresh lemon juice to finish

**Steps:**
1. Pat the chicken dry and season generously on both sides
2. Heat oil in a skillet over medium-high heat
3. Cook 6–7 minutes per side until golden and cooked through (internal temp 165°F / 74°C)
4. Rest for 5 minutes before slicing

**Tip:** Pound the chicken to an even thickness before cooking so it cooks evenly. You can pair this with roasted vegetables or a simple green salad.

Want me to suggest a specific side dish or sauce to go with it?`,

      `Great question! Here's a balanced meal plan idea:

**Breakfast (~400 kcal)**
- Greek yogurt with berries and a drizzle of honey
- Handful of granola or nuts

**Lunch (~550 kcal)**
- Grilled chicken wrap with mixed greens, hummus, and cucumber
- Side of fruit

**Dinner (~600 kcal)**
- Baked salmon with roasted sweet potato and steamed broccoli
- Olive oil and lemon dressing

**Snacks (~200 kcal)**
- Apple with almond butter, or a small handful of trail mix

This gives you roughly 1,750 kcal with a good balance of protein, carbs, and healthy fats. You can adjust portions up or down depending on your goals.`,
    ],
  },
  {
    keywords: [
      "travel",
      "trip",
      "vacation",
      "flight",
      "hotel",
      "visit",
      "country",
      "city",
      "beach",
      "dubai",
      "europe",
      "japan",
      "italy",
    ],
    responses: [
      `Here are my top recommendations:

**Best Time to Visit:** Shoulder season (spring or early autumn) gives you fewer crowds and better prices while still having great weather.

**Must-Do Experiences:**
- Walk through the old town / historic district — most cities have one and it's the best way to get a feel for the culture
- Try at least one local restaurant away from the tourist areas (ask hotel staff for their personal favourites)
- Set aside a half-day with no plan — some of the best travel moments come from just wandering

**Practical Tips:**
- Book accommodation with free cancellation in case plans change
- Get a local SIM card or eSIM at the airport — it's almost always cheaper than roaming
- Keep a photo of your passport on your phone as a backup

**Budget Estimate:** For a comfortable mid-range trip, budget roughly $120–180/day per person including accommodation, food, and activities. This varies a lot by destination though.

Would you like me to help plan a specific itinerary?`,

      `That's a wonderful destination choice! Here's what I'd suggest:

**Getting Around:**
The most efficient way is usually a mix of public transport for longer distances and walking for exploring neighbourhoods. Ride-hailing apps work well in most major cities too.

**Where to Stay:**
Look for accommodation in a central neighbourhood — you'll save time and money on transportation, and you'll be close to restaurants and nightlife. Boutique hotels and well-reviewed Airbnbs often offer better value than chain hotels.

**Food & Dining:**
- Street food and local markets are often the most authentic (and affordable) way to eat
- Lunch menus at restaurants are typically 30–40% cheaper than dinner
- Ask locals — people love sharing their favourite spots

**What to Pack:**
Comfortable walking shoes are non-negotiable. A light layers approach works for most climates. And always bring a portable charger.

Let me know your dates and I can suggest a more detailed plan!`,
    ],
  },
  {
    keywords: [
      "code",
      "programming",
      "javascript",
      "python",
      "react",
      "api",
      "database",
      "bug",
      "error",
      "deploy",
      "function",
      "app",
      "software",
      "typescript",
      "css",
      "html",
      "frontend",
      "backend",
    ],
    responses: [
      `Here's how I'd approach this:

**Architecture Overview:**
The cleanest pattern for this is to separate your concerns into three layers:

1. **Data layer** — handles API calls and state management
2. **Business logic** — processes and transforms data
3. **Presentation** — renders the UI

**Implementation:**

\`\`\`typescript
// Keep your API calls in a dedicated service
async function fetchData(endpoint: string) {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}
\`\`\`

**Key Considerations:**
- Add error handling early — it's much harder to retrofit later
- Use TypeScript interfaces to define your data shapes upfront
- Write at least basic tests for your business logic layer

**Common Pitfall:** Avoid putting API calls directly in your components. It makes them hard to test and leads to duplicated logic. A service layer or custom hooks (in React) keep things clean.

Want me to show a more complete example?`,

      `Good question — this is a common challenge. Here's what I recommend:

**The Problem:**
Most issues like this come down to either state management getting out of sync, or async operations not being handled properly.

**Solution:**

First, make sure your data flow is unidirectional:
\`\`\`
User Action → State Update → Re-render → UI
\`\`\`

If you're seeing stale data, check for these common causes:
- Closures capturing old state values (use functional updates)
- Missing dependency arrays in useEffect
- Race conditions with concurrent API calls

**Debugging Approach:**
1. Add \`console.log\` at each step of the data flow to find where things diverge
2. Check the Network tab for unexpected API responses
3. Use React DevTools to inspect component state

**Best Practice:** Consider using a state management solution (even just React Context + useReducer) once your app has more than 3-4 pieces of shared state. It makes the data flow much easier to reason about.

Let me know if you'd like help debugging a specific issue.`,
    ],
  },
  {
    keywords: [
      "product",
      "startup",
      "business",
      "strategy",
      "market",
      "user",
      "customer",
      "growth",
      "retention",
      "metric",
      "kpi",
      "roadmap",
      "feature",
      "launch",
      "mvp",
    ],
    responses: [
      `Great question — let me break this down from a product perspective.

**Framework: The RICE Prioritisation Model**

When deciding what to build next, score each initiative on:
- **Reach** — How many users will this impact?
- **Impact** — How much will it move the needle per user? (1-3 scale)
- **Confidence** — How sure are you about the estimates? (percentage)
- **Effort** — How many person-weeks will it take?

**Score = (Reach × Impact × Confidence) / Effort**

**Practical Application:**
Most teams make the mistake of building what's loudest (squeaky wheel features) rather than what's most impactful. The RICE framework forces you to quantify trade-offs.

**My Recommendation:**
1. List your top 10 candidate features or initiatives
2. Score each one honestly — get input from engineering, design, and sales
3. Sort by RICE score and commit to the top 3 for this quarter
4. Revisit quarterly as your data and market understanding evolves

The key insight is that saying "no" to good ideas is what lets you execute great ones.

Want me to help you think through prioritisation for a specific set of features?`,

      `This is one of the most important questions to get right. Here's how I think about it:

**The Retention Curve Matters More Than Acquisition**

Most teams over-invest in top-of-funnel growth and under-invest in activation and retention. The math is simple:
- Improving retention by 5% can increase lifetime value by 25-95%
- Acquiring a new customer costs 5-7x more than retaining an existing one

**The Framework I'd Use:**

1. **Measure your activation rate** — What % of new signups reach your "aha moment"? If it's below 40%, fix this first.
2. **Map the user journey** — Where are people dropping off? Use cohort analysis to find the pattern.
3. **Identify your power users** — What do they do differently? Build your onboarding around those behaviours.

**Quick Wins:**
- Personalised onboarding flow based on user goals
- Triggered emails/notifications at key drop-off points
- Reduce time-to-value (how fast can someone get something useful?)

The companies that win long-term are the ones obsessed with making existing users successful, not just acquiring new ones.`,
    ],
  },
  {
    keywords: [
      "explain",
      "what is",
      "how does",
      "why",
      "difference",
      "meaning",
      "define",
      "understand",
      "concept",
      "work",
    ],
    responses: [
      `Let me explain this in a straightforward way.

**The Core Idea:**
Think of it as a system with inputs and outputs. The input is what you provide (your data, your question, your parameters), and the output is the result after processing.

**How It Works:**
1. First, the input is validated and normalised — this ensures consistency
2. Then it goes through the main processing pipeline, where the actual transformation happens
3. Finally, the output is formatted and returned to you

**An Analogy:**
It's like a coffee machine. You put in beans (input), the machine grinds, heats water, and brews (processing), and you get coffee (output). You don't need to understand every mechanical detail to use it effectively — but knowing the basics helps you make better coffee.

**Why It Matters:**
Understanding this concept unlocks a lot of other things. It's foundational to how most modern systems work, from web applications to data pipelines.

**Common Misconceptions:**
- It's not as complex as it first appears — most of the complexity is in the implementation details, not the concept itself
- You don't need to master it all at once — start with the basics and build up

Would you like me to go deeper on any particular part?`,

      `That's a great question — here's the clear breakdown:

**The Simple Version:**
At its core, the difference comes down to **control vs. convenience**. One approach gives you more fine-grained control but requires more setup and maintenance. The other abstracts away the details so you can move faster, but you trade off some flexibility.

**When to Use Each:**
- Choose the **hands-on approach** when you need precise control, have specific performance requirements, or are building something custom
- Choose the **managed approach** when speed of development matters more, you have a standard use case, or your team is small

**Real-World Example:**
It's like cooking at home vs. ordering from a restaurant. Cooking gives you full control over ingredients and portions, but takes time and skill. Ordering is faster and convenient, but you can't customise every detail.

**The Key Insight:**
Most experienced practitioners don't pick one exclusively — they use the right tool for each situation. Start with the simpler option and only switch when you hit a real limitation, not a theoretical one.

Does that clarify things? Happy to elaborate on any part.`,
    ],
  },
  {
    keywords: [
      "email",
      "write",
      "draft",
      "message",
      "letter",
      "text",
      "wording",
      "phrase",
      "tone",
      "professional",
      "formal",
    ],
    responses: [
      `Here's a draft you can customise:

---

**Subject:** Following up on our conversation

Hi [Name],

I hope you're doing well. I wanted to follow up on our recent discussion and share a few thoughts.

After reflecting on what we talked about, I think the best path forward would be to [specific action]. This approach would allow us to [benefit 1] while also [benefit 2].

Here's what I'd suggest for next steps:
1. [First action item] — by [date]
2. [Second action item] — by [date]
3. [Third action item] — by [date]

I'm happy to set up a quick call this week to align on the details. Would [day] or [day] work for you?

Looking forward to hearing your thoughts.

Best regards,
[Your name]

---

**Tips for the tone:**
- Keep sentences short and direct — busy people scan emails
- Lead with the most important point
- Always include a clear call to action (what do you want them to do?)
- End with something that makes it easy to respond

Want me to adjust the tone or tailor it to a specific situation?`,
    ],
  },
  {
    keywords: [
      "workout",
      "exercise",
      "gym",
      "fitness",
      "run",
      "weight",
      "muscle",
      "health",
      "sleep",
      "stress",
      "meditation",
      "yoga",
    ],
    responses: [
      `Here's a balanced approach that works for most people:

**Weekly Structure:**
- **3 days strength training** (full body or upper/lower split)
- **2 days cardio** (mix of steady-state and intervals)
- **2 days rest/active recovery** (walking, stretching, yoga)

**Sample Strength Session (45 min):**
1. Warm-up: 5 min light cardio + dynamic stretches
2. Compound movement: Squats or deadlifts — 3 sets of 8-10 reps
3. Push: Bench press or overhead press — 3 sets of 10
4. Pull: Rows or pull-ups — 3 sets of 10
5. Accessory: Core work + one isolation exercise — 2 sets of 12-15
6. Cool-down: 5 min stretching

**The Most Important Things:**
- **Consistency beats intensity** — 3 moderate sessions/week beats 1 extreme session
- **Progressive overload** — gradually increase weight, reps, or sets over time
- **Sleep is non-negotiable** — aim for 7-9 hours. This is when recovery happens
- **Nutrition supports your goals** — you can't out-train a poor diet

**Common Mistake:** Doing too much too soon. Start with weights that feel manageable and focus on form. Increase by ~5% per week.

Would you like me to create a more specific plan based on your goals?`,
    ],
  },
];

const fallbackResponses = [
  `That's a thoughtful question. Let me share my perspective.

The most important thing to consider here is your specific context — what works in one situation might not be the best fit in another. That said, there are some general principles worth keeping in mind:

**Start with clarity on what you're trying to achieve.** It sounds obvious, but many people jump to solutions before fully understanding the problem. Take a few minutes to write down what "success" looks like for you.

**Then, break it into smaller steps.** Large goals feel overwhelming, but a series of small, concrete actions feels manageable. Each completed step builds momentum.

**Finally, get feedback early.** Don't wait until you're "done" to share your work or get input. Early feedback saves time and often reveals things you hadn't considered.

Is there a specific aspect you'd like me to dig into?`,

  `Here's how I'd think about this:

**First, some context:** This is an area where there's been a lot of evolution over the past few years. What was considered standard practice even 2-3 years ago may not be the best approach today.

**The current consensus:**
1. Keep things simple until you have a clear reason to add complexity
2. Focus on the fundamentals — they rarely change even as trends shift
3. Learn from what others have done, but adapt it to your situation

**Actionable Advice:**
- Start with the default / most common approach. It's popular for a reason.
- Document your decisions and the reasoning behind them. Future-you will thank present-you.
- Set a review point (e.g., 2 weeks from now) to evaluate whether your approach is working

**A Useful Mental Model:**
Think of it as an experiment. You're testing a hypothesis about what will work. If the data tells you to adjust, that's not failure — that's learning.

What would be most helpful for me to focus on next?`,

  `I can help with that. Here's a structured way to approach it:

**Step 1: Define the Goal**
What does the ideal outcome look like? Be as specific as possible. "Better" isn't a goal — "reduce processing time by 30%" is.

**Step 2: Assess the Current State**
Where are you starting from? Understanding the gap between current and desired state helps you scope the effort realistically.

**Step 3: Identify the Constraints**
Every situation has constraints — time, budget, skills, dependencies. Name them upfront so you can work within them (or challenge the ones that shouldn't be constraints).

**Step 4: Choose Your Approach**
Given your goal and constraints, pick the approach that maximises learning and minimises risk. Usually that means starting small and iterating.

**Step 5: Execute and Measure**
Ship something, measure the result, and adjust. The cycle of build → measure → learn is how good outcomes happen.

This framework works for everything from planning a project to making a personal decision. The key is being honest at each step.

Would you like to walk through this framework for your specific situation?`,
];

export const getMockResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();

  for (const topic of topics) {
    const matchCount = topic.keywords.filter((kw) => lower.includes(kw)).length;
    if (matchCount > 0) {
      const hash = lower
        .split("")
        .reduce((acc, c) => acc + c.charCodeAt(0), 0);
      return topic.responses[hash % topic.responses.length];
    }
  }

  const hash = lower
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return fallbackResponses[hash % fallbackResponses.length];
};
