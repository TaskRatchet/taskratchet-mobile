import type {taskType} from '../../components/types';
import fetch1 from './fetch1';

export async function getTasks(): Promise<taskType[]> {
  const response = await fetch1('me/tasks', true);
  return response.json() as unknown as taskType[];
}
