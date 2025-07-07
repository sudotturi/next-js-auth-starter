import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Database, Shield, Zap, Users, Code } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SF Sudofolks</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge className="mb-4" variant="secondary">
            Open Source
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Next.js Starter Kit
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A production-ready starter template with Next.js 14, TypeScript, Prisma, PostgreSQL, 
            NextAuth.js, and shadcn/ui. Everything you need to build modern web applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
            </Link>
            <Link href="https://github.com/yourusername/nextjs-starter" target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with modern technologies and best practices for scalable, maintainable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Next.js 14</CardTitle>
              <CardDescription>
                Built with the latest Next.js App Router, TypeScript, and Tailwind CSS
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>PostgreSQL + Prisma</CardTitle>
              <CardDescription>
                Type-safe database access with Prisma ORM and PostgreSQL
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>NextAuth.js</CardTitle>
              <CardDescription>
                Complete authentication with email/password and Google OAuth
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>
                Beautiful, accessible components built with Radix UI and Tailwind
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete user registration, login, and session management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Github className="h-8 w-8 text-gray-600 mb-2" />
              <CardTitle>Open Source</CardTitle>
              <CardDescription>
                MIT licensed, free to use for personal and commercial projects
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-gray-600">
              Carefully selected technologies that work great together
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "Next.js",
              "TypeScript",
              "PostgreSQL",
              "Prisma",
              "NextAuth.js",
              "Tailwind CSS",
              "shadcn/ui",
              "Radix UI",
            ].map((tech) => (
              <div key={tech} className="text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-2">
                  <span className="text-sm font-medium text-gray-900">{tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Clone the repository and have your application running in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Users className="mr-2 h-4 w-4" />
                Try the Demo
              </Button>
            </Link>
            <Link href="https://github.com/yourusername/nextjs-starter" target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-blue border-white hover:bg-white hover:text-blue-600">
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Code className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-lg font-bold">SF Starter</span>
            </div>
            <div className="flex space-x-6">
              <Link href="https://github.com/yourusername/nextjs-starter" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 Sudofolks. Open source under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}