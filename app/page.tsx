'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Trophy } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              Welcome to Difazio Tennis
            </h1>
            <p className="text-lg text-gray-600">
              Your tennis ladder management system
            </p>
          </div>

          {/* Ladder Link Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Tennis Ladder
              </CardTitle>
              <CardDescription>
                View and manage your club's tennis ladder rankings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push('/ladder')}
                className="w-full"
                size="lg"
              >
                Go to Ladder
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
