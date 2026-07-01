import {defineField, defineType} from 'sanity'

export const bebida = defineType({
  name: 'bebida',
  title: 'Bebidas',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID Único (Número)',
      type: 'number',
      description: 'Número identificador del producto para el carrito (ej. 5, 6, 7...)',
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
      name: 'description',
      title: 'Descripción / Presentación',
      type: 'string',
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
      name: 'price',
      title: 'Precio (ARS)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'icon',
      title: 'Ícono Phosphor',
      type: 'string',
      description: 'Nombre de la clase del ícono de Phosphor (ej. ph-fill ph-wine, ph-fill ph-beer-bottle, ph-fill ph-package)',
      initialValue: 'ph-fill ph-wine',
    }),
  ],
})
