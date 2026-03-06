'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function WaitlistHero() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '905eedf2-f663-4b8e-b56f-be8fb3c0cbc3',
          subject: 'New Waitlist Lead',
          email: email,
        }),
      })

      const data = await response.json()

      if (response.status === 200) {
        toast.success('Thanks for joining the waitlist!')
        setEmail('')
      } else {
        toast.error(data.message || 'Failed to submit email.')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative h-[100dvh] w-full bg-background flex flex-col items-center justify-center overflow-hidden">


      {/* Content */}
      <div className="flex w-full flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-4xl space-y-4 text-center">
          {/* Logo */}
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="name-with-tagline-bg-removed.png" 
              alt="StndOut" 
              className="mx-auto h-auto max-h-[300px] w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] object-contain text-foreground"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="font-serif text-balance text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {'Something amazing is launching soon'}
          </motion.h1>

          {/* Subheading */}
          <div className="space-y-4">
            <motion.p 
              className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {'Join our waitlist to be the first to know when we launch. Get exclusive early access and special perks.'}
            </motion.p>
          </div>

          {/* Email Form */}
          <div className="mx-auto max-w-md space-y-4 pt-4">
            <form onSubmit={handleSubmit} className="relative">
              {/* Web3Forms required hidden fields for static HTML (Optional but safe to include since we are doing a fetch anyway) */}
              <input type="hidden" name="access_key" value="905eedf2-f663-4b8e-b56f-be8fb3c0cbc3" />
              <input type="hidden" name="subject" value="New Waitlist Lead" />

              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'relative z-10 h-14 w-full rounded-full border-0 bg-primary px-8 text-base text-primary-foreground shadow-sm transition-shadow duration-200',
                    'placeholder:text-primary-foreground/60',
                    'focus:shadow-md focus:outline-none'
                  )}
                  required
                />
                {isLoading && (
                  <div className="pointer-events-none absolute right-6 top-1/2 z-20 -translate-y-1/2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-foreground/60" />
                  </div>
                )}
              </motion.div>
              <button type="submit" className="sr-only">
                Submit
              </button>
            </form>

            <p className="mt-2 text-sm text-muted-foreground">
              {'Press '}<kbd className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-medium">{'Enter'}</kbd>{' to submit'}
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{'No spam, ever'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{'Exclusive early access'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{'Unsubscribe anytime'}</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
