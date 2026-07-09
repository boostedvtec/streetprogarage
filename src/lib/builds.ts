export type BuildPhoto = {
  src: string;
  alt: string;
  label: string;
};

export const buildPhotos: BuildPhoto[] = [
  {
    src: "/images/builds/civic-k24-turbo.jpeg",
    alt: "Street PRO Garage K24 turbo Honda at a night car meet",
    label: "K24 Turbo Build",
  },
  {
    src: "/images/builds/d16-turbo.jpg",
    alt: "Honda D16 turbo build with front-mount intercooler and oil cooler",
    label: "Honda D16 Turbo",
  },
  {
    src: "/images/builds/2jzgte-single-turbo.jpg",
    alt: "Toyota 2JZ-GTE single turbo engine bay",
    label: "2JZ-GTE Single Turbo",
  },
  {
    src: "/images/builds/b18-turbo.jpg",
    alt: "Honda Civic B18 turbo build",
    label: "Honda B18 Turbo",
  },
];

export type DynoResult = {
  src: string;
  alt: string;
  label: string;
};

export const dynoResults: DynoResult[] = [
  {
    src: "/images/builds/honda-d16-turbo-dyno.jpg",
    alt: "Honda D16 turbo dyno graph — 207WHP",
    label: "Honda D16 Turbo — 207WHP",
  },
  {
    src: "/images/builds/k24-remote-tune-dyno.jpg",
    alt: "K24 remote tune dyno graph — 444WHP, 389 lb-ft",
    label: "K24 Remote Tune — 444WHP",
  },
  {
    src: "/images/builds/k24-turbo-before-after-dyno.jpg",
    alt: "K24 turbo before and after dyno comparison — 24.8% gain",
    label: "K24 Turbo — Before & After (+24.8%)",
  },
  {
    src: "/images/builds/r18-turbo-dyno.jpg",
    alt: "Honda R18 turbo dyno graph — 211HP",
    label: "Honda R18 Turbo — 211HP",
  },
];
