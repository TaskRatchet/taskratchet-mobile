import fetch2 from './fetch2';

export default async function deleteMe(): Promise<void> {
  await fetch2('me', true, 'DELETE');
}
