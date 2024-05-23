import {getTimezones} from '../services/taskratchet/getTimezones';

export default async function fetchTimezoneList(): Promise<
  {key: number; value: string}[]
> {
  let rawTimezoneList = [];

  try {
    rawTimezoneList = await getTimezones();
  } catch (e) {
    console.error('Error getting timezones:', e);
  }

  return rawTimezoneList.map((timezone, index) => ({
    key: index,
    value: timezone,
  }));
}
