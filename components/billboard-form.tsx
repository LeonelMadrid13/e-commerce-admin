/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import * as z from 'zod'
import axios from 'axios'
import * as React from 'react'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { type Billboard } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AlertModel from '@/components/models/alert-model'
import ApiAlert from '@/components/ui/api-alert'
import useOrigin from '@/hooks/use-origin'

interface BillboardFormProps {
  initialData: Billboard | null
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const title = initialData ? 'Edit Billboard' : 'Create Billboard'
  const description = initialData ? 'Edit a Billboard' : 'Add a new Billboard'
  const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  })

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${params.storeId}`, values)
      router.refresh()
      toast.success('Store updated')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('Store deleted')
    } catch (error) {
      toast.error('Make sure you have no products and categories in your store')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModel
        isOpen={open}
        onClose={() => { setOpen(false) }}
        onConfirm={() => { onDelete() }}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description}/>
        {initialData && (
          <Button
          disabled={loading}
          variant='destructive'
          size='sm'
          onClick={() => { setOpen(true) }}
          >
            <Trash className='w-4 h-4'/>
          </Button>
        )}
      </div>
      <Separator/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Billboard label' {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
      <Separator/>
    </>
  )
}

export default BillboardForm
