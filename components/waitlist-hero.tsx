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
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setEmail('')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-background">


      {/* Content */}
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 sm:px-8">
        <div className="w-full max-w-4xl space-y-12 text-center">
          {/* Logo */}
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="/stndout-logo.svg" 
              alt="StndOut" 
              className="h-64 w-64 text-foreground"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="font-serif text-balance text-5xl font-normal leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
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
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <input
                  type="email"
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

            <p className="text-sm text-muted-foreground">
              {'Press '}<kbd className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-medium">{'Enter'}</kbd>{' to submit'}
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
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
