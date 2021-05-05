export const mockValues = {
  docs: [
    {
      id: '1',
      data: () => ({
        lastDate: { toDate: () => '1995-12-17T03:24:00' },
        name: 'Banana',
      }),
    },
    {
      id: '2',
      data: () => ({
        lastDate: { toDate: () => '1995-12-17T03:24:00' },
        name: 'Oranges',
      }),
    },
    {
      id: '3',
      data: () => ({
        lastDate: { toDate: () => '1995-12-17T03:24:00' },
        name: 'Beer',
      }),
    },
  ],
};
