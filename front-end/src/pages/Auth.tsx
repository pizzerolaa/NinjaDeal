'use strict';

//import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
//import { Mail, Lock, User, FileText, UserCircle } from 'lucide-react';
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

const forSchema = z.object({
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters long.',
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
})

function Auth() {
    //we define a form using the useForm hook from react-hook-form
    const form = useForm<z.infer<typeof forSchema>>({
        resolver: zodResolver(forSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    //we define a function to handle the form submission
    function onSubmit(values: z.infer<typeof forSchema>) {
        console.log(values);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Sign in</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Username' {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email' placeholder='ex@example.com' {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Password' {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
            </div>
        </div>
    );
}

export default Auth;