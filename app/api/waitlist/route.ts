import { NextResponse } from 'next/server'
import { z } from 'zod'
import { neon } from '@neondatabase/serverless'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[v0] Request body:", body)

    // Validate email format using Zod
    const result = emailSchema.safeParse(body)

    if (!result.success) {
      console.log("[v0] Validation failed:", result.error.errors)
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email } = result.data
    console.log("[v0] DATABASE_URL exists:", !!process.env.DATABASE_URL)
    console.log("[v0] DATABASE_URL prefix:", process.env.DATABASE_URL?.substring(0, 20))
    const sql = neon(process.env.DATABASE_URL!)

    try {
      // Check if email already exists
      console.log("[v0] Checking if email exists:", email)
      const existingEmail = await sql`
        SELECT email FROM waitlist WHERE email = ${email}
      `
      console.log("[v0] Existing email result:", existingEmail)

      if (existingEmail.length > 0) {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        )
      }

      // Insert new waitlist entry
      console.log("[v0] Inserting email:", email)
      await sql`
        INSERT INTO waitlist (email) VALUES (${email})
      `
      console.log("[v0] Insert successful")

      return NextResponse.json(
        { message: 'Successfully joined the waitlist!' },
        { status: 201 }
      )
    } catch (dbError: any) {
      console.log("[v0] DB error:", dbError?.message, "code:", dbError?.code)
      // Handle unique constraint violation (duplicate email)
      if (dbError?.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist' },
          { status: 409 }
        )
      }
      throw dbError
    }
  } catch (error: any) {
    console.error('[v0] Waitlist submission error:', error?.message, error?.stack)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
