'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminPanel } from '@/components/admin-panel'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { SiteAdminLogout } from '@/components/site-admin-logout'
import { HomeLink } from '@/components/home-link'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/site-admin/check')
      const data = await response.json()
      setIsAuthenticated(data.authenticated || false)
      if (!data.authenticated) {
        router.push('/ladder')
      }
    } catch (error) {
      router.push('/ladder')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push('/ladder')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Site Admin Panel
            </h1>
            <p className="text-lg text-gray-600">
              Manage clubs: create new clubs, delete existing ones. Each club gets its own URL.
            </p>
          </div>
          <AdminPanel />
          
          {/* Home Link */}
          <HomeLink />
        </div>
      </div>
    </div>
  )
}

