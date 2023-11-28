import { faker } from '@faker-js/faker';

interface User {
  avatar?: string;
  code?: string;
  createdAt: string;
  email: string;
  id?: string;
  name: string;
  role: string;
  team: string;
  username: string;
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

function randomValue(value: string) {
  return Math.round(Math.random()) ? value : '';
}

function createRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const code = randomValue(faker.string.nanoid());

  return {
    avatar: faker.image.avatar(),
    createdAt: faker.date.past().toISOString(),
    code,
    email: faker.internet
      .email({ firstName, lastName, provider: 'example.com' })
      .toLocaleLowerCase(),
    name: `${firstName} ${lastName}`,
    id: code ? '' : faker.string.uuid(),
    username: faker.internet.userName({ firstName, lastName }),
    team: faker.commerce.department(),
    role: faker.helpers.fake(['admin', 'user']),
  };
}

export const users: User[] = faker.helpers.multiple(createRandomUser, {
  count: 50,
});
