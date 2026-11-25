import type { SiteConfig } from '@portfolio/shared';

export const selectedWorkProjectIds = [
  'illustration-axel',
  'commission-ffxiv-oc',
  'commission-pink',
  'project-16',
  'illustration-na',
  'illustration-aa',
  'illustration-10',
  'project-1'
] as const;

const config: SiteConfig = {
  name: 'Sandra Suh',
  tagline: 'Illustration Artist',
  socialLinks: {
    bluesky: 'https://bsky.app/profile/mewondacat.bsky.social',
    vgen: 'https://vgen.co/mewondacat',
    email: 'mewondacat@gmail.com'
  },
  navItems: [
    { label: 'Gallery', path: '/' },
    {
      label: 'Work',
      path: '/category/illustrations',
      children: [
        { label: 'Illustration', path: '/category/illustrations' },
        { label: 'Sketchbook', path: '/category/sketchbook' },
        { label: 'Animation', path: '/category/animation' },
        { label: 'Sculpture', path: '/category/sculptures' },
        { label: 'Concepts', path: '/category/concepts' }
      ]
    },
    {
      label: 'Commissions',
      path: '/category/commissions',
      children: [
        { label: 'Commission Art', path: '/category/commissions' },
        { label: 'Commission Info', path: '/commission-info' }
      ]
    },
    { label: 'About Me & Contact', path: '/about' }
  ],
  projects: [
    {
      id: 'sketch-skull-butterfly',
      title: 'Sketchbook 1',
      imageAlt: 'Graphite still-life sketch of a skull topped by a butterfly',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/sketch-skull-butterfly.jpg',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/sketchbook1'
    },
    {
      id: 'sketch-animal-study',
      title: 'Sketchbook 2',
      imageAlt: 'Graphite animal study featuring a close view of a pair of eyes and a separate shaded form',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/sketch-animal-study.jpg',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: true,
      path: '/project/sketchbook2'
    },
    {
      id: 'traditional-cat-reference',
      title: 'Sketchbook 3',
      imageAlt: 'Pencil drawing of a cat displayed above the photographic reference used for the study',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/traditional-cat-reference.jpg',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/sketchbook3'
    },
    {
      id: 'traditional-floral-sword',
      title: 'Sketchbook 4',
      imageAlt: 'Hand-painted fantasy sword surrounded by green leaves and red-orange flourishes',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/traditional-sword.jpg',
      aspectRatio: '2475 / 3979',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/sketchbook4'
    },
    {
      id: 'traditional-adventure-time-style',
      title: 'Sketchbook 5',
      imageAlt: 'Hand-painted cartoon character seated at a table in an Adventure Time-inspired style',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/traditional-adventure-time-style.jpg',
      aspectRatio: '3093 / 2772',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/sketchbook5'
    },
    {
      id: 'sketchbook-seated-figure-study',
      title: 'Sketchbook 6',
      imageAlt: 'Pencil figure study of a seated woman with one leg crossed over the other',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/sketchbook-seated-figure-study.png',
      aspectRatio: '623 / 764',
      objectFit: 'contain',
      showOnHome: false,
      contentWarning: 'Figure Drawing / Nudity',
      path: '/project/sketchbook6'
    },
    {
      id: 'sketchbook-standing-male-figure-study',
      title: 'Sketchbook 7',
      imageAlt: 'Pencil anatomy study of a nude standing male figure leaning on a staff',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/sketchbook-standing-male-figure-study.png',
      aspectRatio: '861 / 1148',
      objectFit: 'contain',
      showOnHome: false,
      contentWarning: 'Figure Drawing / Nudity',
      path: '/project/sketchbook7'
    },
    {
      id: 'sketchbook-figure-foot-anatomy-study',
      title: 'Sketchbook 8',
      imageAlt: 'Pencil anatomy studies of a nude standing figure and two detailed feet',
      category: 'sketchbook',
      size: 'medium',
      image: '/assets/sketchbook-figure-foot-anatomy-study.png',
      aspectRatio: '615 / 527',
      objectFit: 'contain',
      showOnHome: false,
      contentWarning: 'Figure Drawing / Nudity',
      path: '/project/sketchbook8'
    },
    {
      id: 'sculpture-creature-front',
      title: 'Sculpture 1',
      imageAlt: 'Front view of a wearable cardboard creature sculpture with horns, fins, and layered armor',
      category: 'sculptures',
      size: 'medium',
      image: '/assets/sculpture-creature-front.jpg',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/sculpture1'
    },
    {
      id: 'sculpture-creature-profile',
      title: 'Sculpture 2',
      imageAlt: 'Profile view of a wearable cardboard creature sculpture with layered spines, fins, and a tail',
      category: 'sculptures',
      size: 'medium',
      image: '/assets/sculpture-creature-profile.jpg',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/sculpture2'
    },
    {
      id: 'sculpture-swan-koi-relief',
      title: 'Sculpture 3',
      imageAlt: 'Sculptural relief of a white swan standing over a pond filled with pink and orange koi',
      category: 'sculptures',
      size: 'medium',
      image: '/assets/sculpture-swan-koi-relief.png',
      aspectRatio: '773 / 853',
      objectFit: 'contain',
      showOnHome: true,
      path: '/project/sculpture3'
    },
    {
      id: 'animation-pendulum',
      title: 'Animation 1',
      imageAlt: 'A colorful pendulum character swinging against a blue background',
      category: 'animation',
      size: 'hero',
      image: '/assets/pendulum_finalized.gif',
      aspectRatio: '16 / 9',
      objectFit: 'contain',
      maxWidth: '960px',
      showOnHome: true,
      path: '/project/animation1'
    },
    {
      id: 'project-1',
      title: 'Illustration 1',
      imageAlt: 'Winged celestial character surrounded by blue and violet organic forms',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/athena.png',
      showOnHome: false,
      path: '/project/illustration1'
    },
    {
      id: 'project-16',
      title: 'Illustration 2',
      imageAlt: 'Blue and violet digital portrait with a red geometric focus over one eye',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/mainpageimage6.jpg',
      showOnHome: true,
      path: '/project/illustration2'
    },
    {
      id: 'illustration-10',
      title: 'Illustration 3',
      imageAlt: 'Magenta-toned digital portrait of a dark-haired character wearing pink sunglasses',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/illustration-10.png',
      aspectRatio: '2480 / 3508',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/illustration3'
    },
    {
      id: 'illustration-axel',
      title: 'Illustration 4',
      imageAlt: 'Fiery digital fan art of Axel from Kingdom Hearts',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/axel-fanart.png',
      aspectRatio: '2480 / 3508',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/illustration4'
    },
    {
      id: 'illustration-na',
      title: 'Illustration 5',
      imageAlt: 'Red and orange close-up portrait with glowing golden spiral eyes and violet highlights',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/na.png',
      aspectRatio: '4 / 5',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/illustration5'
    },
    {
      id: 'illustration-aa',
      title: 'Illustration 6',
      imageAlt: 'Black-and-white close-up portrait with dark hair and a spiral-patterned eye',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/aa.png',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/illustration6'
    },
    {
      id: 'project-sketch',
      title: 'Illustration 7',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/sketch.jpg',
      showOnHome: false,
      path: '/project/illustration7'
    },
    {
      id: 'project-sketch2',
      title: 'Illustration 8',
      category: 'illustrations',
      size: 'medium',
      image: '/assets/sketch2.jpg',
      showOnHome: false,
      path: '/project/illustration8'
    },
    {
      id: 'project-8',
      title: 'Commission 1',
      imageAlt: 'Cat-eared character with golden eyes against a warm yellow background',
      category: 'commissions',
      size: 'medium',
      image: '/assets/kat.png',
      showOnHome: false,
      path: '/project/comms1'
    },
    {
      id: 'project-12',
      title: 'Commission 2',
      category: 'commissions',
      size: 'medium',
      image: '/assets/rester.png',
      path: '/project/comms2'
    },
    {
      id: 'comm-3',
      title: 'Commission 3',
      category: 'commissions',
      size: 'medium',
      image: '/assets/comm_3.png',
      showOnHome: false,
      path: '/project/comms3'
    },
    {
      id: 'comm-2',
      title: 'Commission 4',
      category: 'commissions',
      size: 'medium',
      image: '/assets/comm_2.jpg',
      showOnHome: false,
      path: '/project/comms4'
    },
    {
      id: 'comm-1',
      title: 'Commission 5',
      category: 'commissions',
      size: 'hero',
      image: '/assets/comm_1.jpg',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/comms5'
    },
    {
      id: 'commission-ffxiv-oc',
      title: 'Commission 6',
      imageAlt: 'Cat-eared FFXIV original character with braids making peace signs against a yellow background',
      category: 'commissions',
      size: 'medium',
      image: '/assets/ffxiv_oc.jpg',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/comms6'
    },
    {
      id: 'commission-pink',
      title: 'Commission 7',
      imageAlt: 'Pink-haired character with braided buns holding a gold staff against a blue background',
      category: 'commissions',
      size: 'medium',
      image: '/assets/pink.png',
      aspectRatio: '2480 / 3508',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/comms7'
    },
    {
      id: 'commission-badaboo',
      title: 'Commission 8',
      imageAlt: 'Rabbit-eared chibi character in a red shirt and black vest holding a knife and a basket',
      category: 'commissions',
      size: 'medium',
      image: '/assets/badaboo.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/comms8'
    },
    {
      id: 'commission-peetapoo',
      title: 'Commission 9',
      imageAlt: 'Chibi witch in a purple hat and dress drinking bubble tea',
      category: 'commissions',
      size: 'medium',
      image: '/assets/peetapoo.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/comms9'
    },
    {
      id: 'comm-4',
      title: 'Concept 1',
      category: 'concepts',
      size: 'medium',
      image: '/assets/comm_4.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept1'
    },
    {
      id: 'concept-merow',
      title: 'Concept 2',
      imageAlt: 'Two illustrated characters debating sushi over the phone',
      category: 'concepts',
      size: 'medium',
      image: '/assets/merow.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept2'
    },
    {
      id: 'comm-image1',
      title: 'Concept 3',
      category: 'concepts',
      size: 'medium',
      image: '/assets/image-1.jpg',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept3'
    },
    {
      id: 'comm-5',
      title: 'Concept 4',
      category: 'concepts',
      size: 'medium',
      image: '/assets/comm_5.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept4'
    },
    {
      id: 'concept-example',
      title: 'Concept 5',
      imageAlt: 'Two illustrated characters posing with drinks and a cat against a blue background',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept-example.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept5'
    },
    {
      id: 'concept-window-portrait',
      title: 'Concept 6',
      imageAlt: 'Two illustrated characters standing together in front of an arched window',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept-window-portrait.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept6'
    },
    {
      id: 'project-17',
      title: 'Concept 7',
      imageAlt: 'Teal-haired character posed beside a television in a softly lit room',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept.jpg',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept7'
    },
    {
      id: 'project-18',
      title: 'Concept 8',
      imageAlt: 'Two stylized characters together in a dark purple-toned scene',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept2.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept8'
    },
    {
      id: 'concept-3',
      title: 'Concept 9',
      imageAlt: 'Two stylized characters in a dark teal game-inspired scene with humorous dialogue',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept3.jpg',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept9'
    },
    {
      id: 'concept-adventures-of-bingus',
      title: 'Concept 10',
      imageAlt: 'Two cat-eared characters with oversized swords posed before explosions on an Adventures of Bingus cover',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept-adventures-of-bingus.jpg',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept10'
    },
    {
      id: 'concept-cowboy-character',
      title: 'Concept 11',
      imageAlt: 'Monochrome cowboy character wearing two stacked hats and a scarf on a textured tan background',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept-cowboy-character.png',
      aspectRatio: '1 / 1',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept11'
    },
    {
      id: 'commission-tenko',
      title: 'Concept 12',
      imageAlt: 'Cat-eared maid posing with Mudkip, Marill, and Skitty',
      category: 'concepts',
      size: 'medium',
      image: '/assets/commission-tenko.png',
      aspectRatio: '4 / 5',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept12'
    },
    {
      id: 'illustration-va',
      title: 'Concept 13',
      imageAlt: 'Blonde character in a white and blue outfit standing beneath gothic arches on a moonlit balcony',
      category: 'concepts',
      size: 'medium',
      image: '/assets/illustration-va.png',
      aspectRatio: '5950 / 3850',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept13'
    },
    {
      id: 'concept-beach-help',
      title: 'Concept 14',
      imageAlt: 'Illustrated character in a black dress on a beach, with someone drowning in the background',
      category: 'concepts',
      size: 'medium',
      image: '/assets/concept-beach-help.jpg',
      aspectRatio: '4 / 5',
      objectFit: 'contain',
      showOnHome: false,
      path: '/project/concept14'
    }
  ]
};

export const siteConfig: SiteConfig = {
  ...config,
  projects: config.projects.map((project) => ({
    ...project,
    image: project.image
      ? `${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, '')}`
      : project.image
  }))
};
