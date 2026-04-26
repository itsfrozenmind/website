export default {
  name: 'calvinHobbes',
  title: 'Calvin & Hobbes Strip',
  type: 'document',
  fields: [
    { name: 'image', title: 'Strip Image', type: 'image', options: { hotspot: true } },
    { name: 'altText', title: 'Alt Text / Caption', type: 'string' },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
