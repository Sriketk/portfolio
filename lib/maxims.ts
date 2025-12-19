export type Maxim = {
  text: string;
  link?: string;
};

const maxims: Maxim[] = [
  {
    text: "Those who were seen dancing were thought to be insane by those who could not hear the music.",
    link: "https://www.youtube.com/watch?v=LYigiwbaX_U&list=RDLYigiwbaX_U&start_radio=1",
  },
  {
    text: "Look to your left and look to your right. The only people who will never tell you no are sitting with you right now.",
    link: "https://www.youtube.com/watch?v=x1RFAp0mLWM",
  },
  {
    text: "Quantity leds to quality",
    link: "https://x.com/spenserskates/status/1999541174999093329?s=20",
  },
  {
    text: "I was the last hope. If not me then who?",
    link: "https://www.youtube.com/shorts/SviwsbTVa4Q",
  },
  {
    text: "The answer you are looking for lies in the work you are afraid to put in.",
  },
  {
    text: "Langauage is a lossy compression of thought.",
    link: "https://www.youtube.com/watch?v=d6EMk6dyrOU",
  }
];

export function getMaxims(): Maxim[] {
  return maxims;
}
