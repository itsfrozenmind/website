export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Live', 'Building', 'Paused'] },
    },
    { name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'link', title: 'External Link', type: 'url' },
    { name: 'whatAndWhy', title: 'What & Why', type: 'text' },
    { name: 'howItWorks', title: 'How It Works', type: 'text' },
    { name: 'arcadeEmbed', title: 'Arcade / Demo Embed URL', type: 'url' },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
