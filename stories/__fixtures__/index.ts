interface User {
  code?: string;
  createdAt: string;
  email: string;
  id?: string;
  name: string;
  picture?: string;
  role: string;
  team: string;
}

export const areas = [
  { label: 'Data', value: 'data' },
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
];

export const contractTypes = [
  { label: 'Full-time', name: 'full-time' },
  { label: 'Part-time', name: 'part-time' },
  { label: 'Freelance', name: 'freelance' },
];

export const frameworks = [
  { label: '.Net', value: 'dotnet' },
  { label: 'Angular', value: 'angular' },
  { label: 'Flutter', value: 'flutter' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
];

export const languages = [
  { label: 'C#', value: 'csharp' },
  { label: 'Dart', value: 'dart' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Kotlin (Java)', value: 'kotlin' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'PHP', value: 'php' },
  { label: 'Python', value: 'python' },
  { label: 'Swift', value: 'swift' },
  { label: 'TypeScript', value: 'typescript' },
];

export const specializations = [
  { label: 'Back-End', value: 'back-end' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Front-End', value: 'front-end' },
  { label: 'Full Stack', value: 'full-stack' },
];

export const seniorities = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid-Level', value: 'mid-level' },
  { label: 'Senior', value: 'senior' },
  { label: 'Specialist', value: 'specialist' },
  { label: 'Leadership', value: 'leadership' },
];

export const users: User[] = [
  {
    code: '9fVV6tDTxaTgfY1jnGodqxZYe951fYqJ',
    createdAt: '2021-11-19T15:12:14.397Z',
    email: 'brya_huffordmb@example.com',
    name: '',
    team: 'Engineering',
    role: 'admin',
  },
  {
    code: '2nTrMIrgodTYiGnnSwGEJXliALm9zC8O',
    createdAt: '2021-10-11T19:06:35.104Z',
    email: 'bijan_tothpb@example.com',
    name: '',
    team: 'Engineering',
    role: 'admin',
  },
  {
    createdAt: '2021-11-16T14:13:00.030Z',
    email: 'consuella_segarsd@example.com',
    id: '57f21c5f-44aa-4b53-a365-99c2e54971eb',
    name: 'Jarrad Creswell',
    team: 'Product',
    role: 'admin',
  },
  {
    createdAt: '2021-09-22T20:34:51.695Z',
    email: 'karyl_pare4fc@example.com',
    id: 'b02c9299-00ec-4b26-81df-622edaf4e14b',
    name: 'Rakesha Clodfelter',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14Ghak3M3EVHA9yE3TTycb5THvcBW7m928ao4Z-6-=s96-c',
    team: 'Engineering',
    role: 'admin',
  },
  {
    code: 'XEn10dfdhbDcS3oD4npN61VGZs7BFMqY',
    createdAt: '2021-10-11T18:56:02.696Z',
    email: 'rajiv_clancyqi@example.com',
    name: '',
    team: 'Engineering',
    role: 'admin',
  },
  {
    createdAt: '2021-10-22T12:53:44.798Z',
    email: 'hendrick_rawlinsd4@example.com',
    id: '91ef7e8a-09e8-453b-b9a1-ff412f4e6cba',
    name: 'Lura Styron',
    team: 'Engineering',
    role: 'admin',
  },
  {
    createdAt: '2021-09-29T19:30:01.410Z',
    email: 'derrik_reeve6p@example.com',
    id: '4c1d03f1-13d5-472b-bf21-1354f1046355',
    name: 'Jarek Herod',
    team: 'Sales',
    role: 'admin',
  },
  {
    createdAt: '2021-10-25T18:26:58.496Z',
    email: 'neill_pettykhit@example.com',
    id: '6874d557-fbea-4a27-acf8-5b6512f73fa1',
    name: 'Mercedez Maisonet',
    team: 'Engineering',
    role: 'admin',
  },
  {
    createdAt: '2021-09-29T19:46:05.497Z',
    email: 'lashunda_albertrk@example.com',
    id: '8c8b7a22-b8e2-40e7-878f-da3343a4852c',
    name: 'Comfort Marrufo',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14Ggg4jII7scEcJSgIIeCtRpjnP8cG135nwaVHZQC=s96-c',
    team: 'Product',
    role: 'admin',
  },
  {
    createdAt: '2021-11-22T14:35:36.054Z',
    email: 'brie_pendergraft1dy@example.com',
    id: '61e5189e-5d1f-43f4-8552-4bc11c682b50',
    name: 'Leshea Redding',
    team: 'Sales',
    role: 'admin',
  },
  {
    createdAt: '2021-10-22T21:25:40.965Z',
    email: 'sianna_innissk@example.com',
    id: 'fb1a35bc-df84-479a-bcd8-549eee904191',
    name: 'Kindall Tiger',
    team: 'Sales',
    role: 'admin',
  },
  {
    createdAt: '2021-11-08T23:28:15.401Z',
    email: 'catoya_lumpkinn@example.com',
    id: '9b6cddb4-f319-4876-9f1d-c8037a5e9612',
    name: 'Gwendolyne Wray',
    team: 'Engineering',
    role: 'admin',
  },
  {
    createdAt: '2021-10-25T19:47:18.117Z',
    email: 'alysia_cairns4fn@example.com',
    id: '578182f9-126c-4f29-af75-42de87026cc7',
    name: 'Sharity Demelo',
    team: 'Sales',
    role: 'admin',
  },
  {
    createdAt: '2021-09-28T20:42:18.978Z',
    email: 'ruston_kuntzesq@example.com',
    id: '5a615d5d-e984-45ff-95e1-a1fa30847420',
    name: 'Jamarl Reveles',
    team: 'Product',
    role: 'admin',
  },
  {
    createdAt: '2021-10-11T15:39:37.055Z',
    email: 'doc_streeter4dq@example.com',
    id: '62227255-1a72-4021-9fed-1a55af471956',
    name: 'Kendrell Zamarripa',
    team: 'Product',
    role: 'admin',
  },
];
