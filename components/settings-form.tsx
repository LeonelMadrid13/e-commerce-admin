/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import * as z from 'zod'
import axios from 'axios'
import * as React from 'react'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { type Store } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from './ui/input'
import AlertModel from './models/alert-model'
import ApiAlert from './ui/api-alert'

interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const onSubmit = async (values: SettingsFormValues) => {
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
        <Heading title='settings' description='Manage store preferences'/>
        <Button
        disabled={loading}
        variant='destructive'
        size='sm'
        onClick={() => { setOpen(true) }}
        >
          <Trash className='w-4 h-4'/>
        </Button>
      </div>
      <Separator/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='StoreName' {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save
          </Button>
        </form>
      </Form>
      <Separator/>
      <ApiAlert
      title='NEXT_PUBLIC_API_URL'
      description={`${origin}/api/${params.storeId}`}
      variant='public'
      />
    </>
  )
}

export default SettingsForm
