'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be a positive number'),
  image: z.string().url('Image must be a valid URL'),
  quantity: z.coerce.number().int().min(0, 'Quantity must be 0 or more'),
  categoryIds: z.array(z.string()).nonempty('Minst en kategori krävs'),
});

export default function AdminForm() {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      image: '',
      quantity: 1,
      categoryIds: [],
    },
  });

  const handleSubmit = async (product: z.infer<typeof schema>) => {
    try {
      const res = await fetch('/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          categories: {
            connect: product.categoryIds.map((id) => ({ id })),
          },
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error('Server error response:', text);
        throw new Error('Failed to add product');
      }

      console.log('Success response:', text);
      form.reset();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  return (
    <main>
      <Box
        component='form'
        data-cy='product-form'
        onSubmit={form.handleSubmit(handleSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          mx: 'auto',
          marginBottom: '50px',
          marginTop: '70px',
        }}>
        <Typography
          variant='h3'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'primary.main',
            marginBottom: 9,
          }}>
          Lägg till en produkt
        </Typography>
        <TextField
          slotProps={{
            htmlInput: { 'data-cy': 'product-title' },
            formHelperText: { 'data-cy': 'product-title-error' } as any,
          }}
          label='Title'
          {...form.register('title')}
          error={Boolean(form.formState.errors.title)}
          helperText={form.formState.errors.title?.message as string}
        />
        <TextField
          slotProps={{
            htmlInput: { 'data-cy': 'product-description' },
            formHelperText: { 'data-cy': 'product-description-error' } as any,
          }}
          label='Description'
          {...form.register('description')}
          error={Boolean(form.formState.errors.description)}
          helperText={form.formState.errors.description?.message as string}
        />
        <TextField
          slotProps={{
            htmlInput: { 'data-cy': 'product-price' },
            formHelperText: { 'data-cy': 'product-price-error' } as any,
          }}
          label='Price'
          {...form.register('price', { valueAsNumber: true })}
          error={Boolean(form.formState.errors.price)}
          helperText={form.formState.errors.price?.message as string}
        />
        <TextField
          slotProps={{
            htmlInput: { 'data-cy': 'product-image' },
            formHelperText: { 'data-cy': 'product-image-error' } as any,
          }}
          label='Image'
          {...form.register('image')}
          error={Boolean(form.formState.errors.image)}
          helperText={form.formState.errors.image?.message as string}
        />
        <TextField
          slotProps={{
            htmlInput: { 'data-cy': 'product-quantity' },
            formHelperText: { 'data-cy': 'product-quantity-error' } as any,
          }}
          label='Quantity'
          {...form.register('quantity', { valueAsNumber: true })}
          error={Boolean(form.formState.errors.quantity)}
          helperText={form.formState.errors.quantity?.message as string}
        />

        <FormControl
          fullWidth
          error={!!form.formState.errors.categoryIds}>
          <InputLabel id='category-label'>Kategorier</InputLabel>
          <Select
            labelId='category-label'
            multiple
            {...form.register('categoryIds')}
            value={form.watch('categoryIds') || []}
            renderValue={(selected) =>
              categories
                .filter((cat) => selected.includes(cat.id))
                .map((cat) => cat.name)
                .join(', ')
            }>
            {categories.map((cat) => (
              <MenuItem
                key={cat.id}
                value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {form.formState.errors.categoryIds?.message as string}
          </FormHelperText>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          color='primary'>
          Add Product
        </Button>
      </Box>
    </main>
  );
}
