export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'period', title: 'Period', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image' }] },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
