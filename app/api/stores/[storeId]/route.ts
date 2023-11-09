import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH (
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    if (userId === null) return new Response('Unauthorized', { status: 401 })

    const body = await req.json()
    const { name } = body
    if (name === null) return new Response('Name is required', { status: 400 })

    const { storeId } = params
    if (storeId === null) return new Response('Store id is required', { status: 400 })

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId
      },
      data: {
        name
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_PATCH]', error)
    return new Response('Internal error', { status: 500 })
  }
}

export async function DELETE (
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    if (userId === null) return new Response('Unauthorized', { status: 401 })

    const { storeId } = params
    if (storeId === null) return new Response('Store id is required', { status: 400 })

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}
