export const mockValues = {
  docs: [
    {
      id: '1',
      data: () => ({
        lastDate: { toDate: () => '2020-12-01T03:24:00' },
        name: 'Banana',
        times: 7,
        time: 2,
        lastEstimate: 14,
      }),
    },
    {
      id: '2',
      data: () => ({
        lastDate: { toDate: () => '2020-12-07T03:24:00' },
        name: 'Oranges',
        times: 3,
        time: 8,
        lastEstimate: 2,
      }),
    },
    {
      id: '3',
      data: () => ({
        lastDate: { toDate: () => '2020-12-07T03:24:00' },
        name: 'Champagne',
        times: 0,
        time: 14,
        lastEstimate: 7,
      }),
    },
  ],
};
