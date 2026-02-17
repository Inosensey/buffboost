interface BuffInterface {
    name: string,
    emoji: string,
    price?: number,
    type: string,
    description: string,
    tagline: string,
}

interface headerInterface {
  [key: string]: {
    title: string;
    description: string;
  };
}