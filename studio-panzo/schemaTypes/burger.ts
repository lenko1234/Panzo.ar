import {defineField, defineType} from 'sanity'

export const burger = defineType({
  name: 'burger',
  title: 'Hamburguesas',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID Único (Número)',
      type: 'number',
      description: 'Número identificador del producto para el carrito (ej. 101, 102...)',
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
      name: 'ingredients',
      title: 'Ingredientes',
      type: 'text',
      description: 'Ingredientes del producto. Los números se formatearán con estilo destacado en la web.',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'variants',
      title: 'Variantes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          title: 'Variante',
          fields: [
            defineField({
              name: 'type',
              title: 'Tipo (ej. Simple, Doble, Porción)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Precio (ARS)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: 'type',
              subtitle: 'price',
            },
            prepare(selection) {
              const {title, subtitle} = selection
              return {
                title: title,
                subtitle: subtitle ? `$${subtitle}` : '',
              }
            }
          }
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
