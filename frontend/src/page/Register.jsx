import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle registration
    }

    return (
        <section className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
                <div className="glass p-8 rounded-2xl shadow-2xl border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            Hey, new to UnCloud? 👋
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Create an account and start using decentralized storage
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            placeholder="Enter your name"
                            title="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            placeholder="Enter your email"
                            title="Email address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            placeholder="Create a password"
                            title="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button type="submit" className="w-full mt-6">
                            Create Account
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
