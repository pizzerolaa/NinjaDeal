'use strict';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Lock, User, KeyRound } from 'lucide-react';
import { Button } from '@components/ui/button';
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, 
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import {Tabs, TabsList, TabsContent, TabsTrigger} from '@components/ui/tabs';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
})

const registerSchema = z.object({
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters long.',
    }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
});

function Auth() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    //we define a form using the useForm hook from react-hook-form
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    //we define a function to handle the form submission
    function handleLoginSubmit(data: z.infer<typeof loginSchema>) {
        console.log('Login Data:', data);
    }

    function handleRegisterSubmit(data: z.infer<typeof registerSchema>) {
        console.log('Register Data:', data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:hover:sr-only p-8 rounded-xl shadow-2xl">
                <div className='text-center'>
                    <h2 className='mt-6 text-3xl font-extrabold text-black dark:text-white'>
                        Welcome to Ninja Deal
                    </h2>
                    <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                        {activeTab === 'login' ? 'Sign in to your account' : 'Create an account'}
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='login'>Login</TabsTrigger>
                        <TabsTrigger value='register'>Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value='login'>
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className='space-y-6'>
                                <FormField
                                    control={loginForm.control}
                                    name='email'
                                    render={({ field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                                    <Input className='pl-10' type='email' placeholder='you@example.com' {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={loginForm.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                                    <Input className='pl-10' type='password' placeholder='••••••••' {...field}/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className='flex items-center justify-between'>
                                    {/* aqui va el link a la pagina de recuperar contraseña */}
                                    <Link to='/' className='text-sm font-medium text-primary hover:underline'>
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Button type='submit' className='w-full bg-red-800 hover:bg-red-900'>Sign in</Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value='register'>
                        <Form {...registerForm}>
                            <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className='space-y-6'>
                                <FormField
                                    control={registerForm.control}
                                    name='username'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <Input className="pl-10" placeholder="john" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registerForm.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                                    <Input className='pl-10' type='email' placeholder='you@example.com' {...field}/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registerForm.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                                    <Input className='pl-10' type='password' placeholder='••••••••' {...field}/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registerForm.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <KeyRound className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                                    <Input className='pl-10' type='password' placeholder='••••••••' {...field}/>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit' className='w-full bg-red-800 hover:bg-red-900'>Sign up</Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs> 
            </div>
        </div>
    );
}

export default Auth;