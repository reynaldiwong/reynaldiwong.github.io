import { profileImage } from './profile-image';
import { hobbiesImage } from './hobbies-image';

export const content = {
  meta: {
    title: "Rey — Home",
    description: "Reynaldi Wong - DevOps Engineer",
  },
  hero: {
    startDate: "2022-08-01",
    image: profileImage,
    json: {
      name: "Reynaldi Wong",
      role: "DevOps Engineer", // Corresponds to "class" in the JSON display
      origin: "Mechatronics Engineering",
    },
  },
  bio: {
    tagline:
      '"You should enjoy the little detours to the fullest. Because that\'s where you\'ll find things more important than what you want."',
    intro: [
      "Hi, My name is <strong>Reynaldi Wong</strong>. You can call me <strong>Rey</strong>. I’ve always been a lazy person. And because of that, I constantly ask myself <em>\"What if I could just automate everything?\"</em> That mindset led me to study Mechatronics Engineering.",
      "After graduating, I began working with microcontrollers and machines, using tools like Arduino, PLCs, and even Raspberry Pi. And then, Somewhere along the way, somehow i began working as a DevOps Engineer. That discovery changed my direction.",
      "I feel that this line of work still stays close to what I love, which is automation with the fact that i almost can do everything, while on the other side, there is many limitation when you handle physical stuff. Atleast that's what i feel. But, if we talk about the details, I know that it leans more toward being a Platform Engineer rather than a DevOps Engineer. 😂",
      "I really enjoy working with Kubernetes, Docker, and Jenkins. How a deployment pipeline for a containerized application can be automated and how you can make it faster with only tweaking your current scripts.",
      "Currently I’m working as a DevOps Engineer at <strong>Digital Daya Teknologi</strong>, Mainly focusing on improving the deployment pipeline for fintech applications.",
    ],
    contact: {
      text: "Anyway, feel free to get in touch with me. Whether you have a question, a project idea, or just want to say hi, I'd love to hear from you!",
      email: "reynaldiwong@gmail.com",
      social: {
        linkedin: "https://linkedin.com/in/reynaldiwong/",
        github: "https://github.com/reynaldiwong/",
        discord: "https://discord.com/users/149162915444817920",
      },
    },
  },
  experience: [
    {
      year: "2023 — Present",
      role: "DevOps Engineer",
      company: "Digital Daya Teknologi",
      description:
        "Maintained and developed cloud infrastructure and CI/CD pipelines for applications at Nobu Bank.",
      bottomLine: "Improve scripts maintainability and deployment time by ~40%",
    },
    {
      year: "2021 — 2023",
      role: "Project Supervisor",
      company: "Dankos Farma (a Kalbe Company)",
      description:
        "Designed and provisioned on-premise infrastructure, including servers and networking, for data center.",
      bottomLine:
        "Implementing data centralization to consolidate all factory data onto a single server for corporate-scale operations.",
    },
    {
      year: "2019 — 2021",
      role: "Automation Specialist",
      company: "Finusolprima Farma Internasional (a Kalbe Company)",
      description:
        "Designed and provisioned on-premise infrastructure, including servers and networking, for data center.",
      bottomLine:
        "Implementing data centralization to consolidate all factory data onto a single server for corporate-scale operations.",
    },
  ],
  hobbies: {
    description:
      "Outside works, I'm a person of simple pleasures. I love to play video games. 🎮",
    vibe: "Vibin while working 🎧",
    image: "/images/skyrim.gif",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/playlist/4S5qFLA6lAJQvIS9uQiWE0?utm_source=generator&theme=0",
  },
  tools: {
    title: "Rey — Tools",
    description: "Just a bunch of tools to help you and me.",
    tagline: "Just a bunch of tools to help you and me.",
  },
};
