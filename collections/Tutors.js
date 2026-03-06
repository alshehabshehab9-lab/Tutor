// collections/Tutors.js
const Tutors = {
  slug: 'tutors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'specialty',
      type: 'relationship',
      relationTo: 'subjects',
      hasMany: true,
    },
    {
      name: 'bio',
      type: 'richText',
      localized: true,
    },
    {
      name: 'meetingLink',
      type: 'text',
    },
  ],
};

module.exports = Tutors;
