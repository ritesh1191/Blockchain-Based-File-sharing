import { Link } from "react-router-dom"
import React, { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            // await login({email,password})
        } catch (e) {
        }
    }

    return (
        <section className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
                <div className="glass p-8 rounded-2xl shadow-2xl border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            Welcome to UnCloud! 👋
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Sign in to access your decentralized file storage
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                        <Input
                            placeholder="Enter your email"
                            title="Email address"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <Input
                            placeholder="Enter your password"
                            title="Password"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                        <Button type="submit" className="w-full mt-6">
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account yet?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
