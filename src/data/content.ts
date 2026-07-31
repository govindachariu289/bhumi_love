export interface Chapter {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  text: string;
  icon: string;
}

export interface PhotoStoryItem {
  src: string;
  caption: string;
  position: string;
  tint: string;
}

export const chapters: Chapter[] = [
  {
    id: "ch1",
    date: "18 November 2025",
    title: "The Day We Met",
    subtitle: "Chapter One",
    text: "A virtual island. Two strangers in a crowd of thousands. You were just another avatar in Free Fire Social Island — but something about you made me stop. Maybe it was the way you moved, maybe it was fate deciding to show up as a friend request. That one click changed everything.",
    icon: "🏝️",
  },
  {
    id: "ch2",
    date: "The Days After",
    title: "First Conversations",
    subtitle: "Chapter Two",
    text: "What started as casual hellos turned into hours of talking. Late nights that bled into early mornings. You told me things nobody else knew, and I told you things I didn't even know I felt. Every message from you became the highlight of my day. I didn't fall for you all at once — I fell a little more with every word.",
    icon: "💬",
  },
  {
    id: "ch3",
    date: "Every Day Since",
    title: "Favorite Memories",
    subtitle: "Chapter Three",
    text: "The inside jokes nobody else understands. The voice calls where silence felt comfortable. The moments you made me laugh so hard I forgot what I was stressed about. Every shared secret, every virtual adventure, every 'goodnight' that I never wanted to send — these are the memories I'll carry forever.",
    icon: "✨",
  },
  {
    id: "ch4",
    date: "Right Now",
    title: "Today & Always",
    subtitle: "Chapter Four",
    text: "Here we are. Still talking, still laughing, still making each other's hearts skip. What started inside a game became the most real thing in my life. You are my favorite notification, my best reason to smile, and the person I want to tell everything to — first and last, every single day.",
    icon: "💗",
  },
];

/*
 * ── HOW TO USE YOUR OWN PHOTOS ─────────────────────────────────────
 * Drop the six uploaded photos into  public/photos/  named exactly:
 *   p1.jpg  p2.jpg  p3.jpg  p4.jpg  p5.jpg  p6.jpg
 * The story panels below are already wired to those paths.
 * If a file is missing, an elegant glass placeholder renders instead,
 * so the experience never breaks.
 */
export const photoStories: PhotoStoryItem[] = [
  {
    src: "/photos/p1.jpg",
    caption: "Grace in every step.",
    position: "50% 26%",
    tint: "from-amber-500/25",
  },
  {
    src: "/photos/p2.jpg",
    caption: "The smile I'll never get tired of.",
    position: "70% 45%",
    tint: "from-rose-600/30",
  },
  {
    src: "/photos/p3.jpg",
    caption: "Beauty beyond words.",
    position: "50% 38%",
    tint: "from-red-600/25",
  },
  {
    src: "/photos/p4.jpg",
    caption: "Elegance beyond words.",
    position: "76% 42%",
    tint: "from-purple-500/25",
  },
  {
    src: "/photos/p5.jpg",
    caption: "Your eyes tell stories.",
    position: "50% 30%",
    tint: "from-pink-400/25",
  },
  {
    src: "/photos/p6.jpg",
    caption: "Forever my favorite person ❤️",
    position: "50% 36%",
    tint: "from-rose-400/25",
  },
];

export const reasons = [
  { title: "Your Smile", text: "It lights up every dark corner of my world." },
  { title: "Your Eyes", text: "They hold galaxies I want to explore forever." },
  { title: "Your Kindness", text: "You make the world gentler just by existing." },
  { title: "Your Elegance", text: "Everything you do has a quiet grace to it." },
  { title: "Your Laugh", text: "The most beautiful sound I've ever heard." },
  { title: "Simply... You", text: "Every version, every mood, every moment — all of you." },
];

export const letterLines = [
  "My dearest Bhumika,",
  "",
  "I never imagined that a game could give me the most real thing I've ever felt. But here we are — and I wouldn't change a single pixel of how we began.",
  "",
  "You walked into my world on that virtual island, and suddenly the real world became more beautiful because you were in it. Every conversation with you feels like coming home. Every laugh we share rewrites my definition of happiness.",
  "",
  "I love the way you make ordinary moments extraordinary. I love how you understand my silence as well as my words. I love that you chose to stay, even when the game ended and real life began.",
  "",
  "You are my unexpected miracle. My favorite chapter. My forever reason to smile.",
  "",
  "I promise to choose you — in every timeline, every universe, every version of this life. Because loving you is the best decision I never had to think about.",
  "",
  "Forever Yours,",
  "Govindachari ❤️",
];

export const START_DATE = new Date("2025-11-18T00:00:00");
