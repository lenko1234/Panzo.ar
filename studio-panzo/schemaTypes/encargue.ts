import {defineField, defineType} from 'sanity'

export const encargue = defineType({
  name: 'encargue',
  title: 'Encargues (Pedido Previo)',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID Único (Número)',
      type: 'number',
      description: 'Número identificador del encargue para compatibilidad (ej. 201...)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      description: 'Número para ordenar los productos (ej. 1, 2, 3...). Menor número va primero.',
      initialValue: 1,
    }),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredientes / Descripción',
      type: 'text',
    }),
    defineField({
      name: 'video',
      title: 'Video en Loop (MP4)',
      type: 'file',
      description: 'Video demostrativo que se reproducirá en bucle continuo.',
      options: {
        accept: 'video/mp4',
      },
    }),
    defineField({
      name: 'whatsappMsg',
      title: 'Mensaje Personalizado de WhatsApp',
      type: 'string',
      description: 'Texto que se enviará automáticamente por WhatsApp cuando toquen "Encargar Ahora".',
    }),
  ],
})
