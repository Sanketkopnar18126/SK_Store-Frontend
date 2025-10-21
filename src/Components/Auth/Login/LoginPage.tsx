import { Button } from '../../Ui/button'
import { Card, CardContent } from '../../Ui/card'

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 mb-6 text-center text-sm">
            Sign in to continue to your account
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-indigo-600 hover:underline hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition-all"
            >
              Sign in
            </Button>

            <p className="text-center text-sm text-gray-500 mt-3">
              Don’t have an account?{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
