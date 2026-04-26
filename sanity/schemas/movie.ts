export default {
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'poster', title: 'Poster', type: 'image', options: { hotspot: true } },
    { name: 'whyRecommend', title: 'Why Nimesh Recommends It', type: 'text' },
    {
      name: 'whereToWatch',
      title: 'Where to Watch',
      type: 'string',
      options: { list: ['Netflix', 'Prime Video', 'Apple TV+', 'Disney+', 'YouTube', 'Mubi', 'Other'] },
    },
    {
      name: 'moods',
      title: 'Moods',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Restless', 'Cozy', 'Melancholic', 'Hyped', 'Sunny', 'Rainy', 'Stormy', 'Foggy'] },
    },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
