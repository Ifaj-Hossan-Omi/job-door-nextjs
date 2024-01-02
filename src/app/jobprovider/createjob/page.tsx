"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
// import { useRouter } from 'next/router';


const formSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(3),
        company: z.string(),
        address: z.string(),
        profilePicture: z.unknown().refine(value => value instanceof File, {
            message: 'Expected a File',
        }),
    })

export default function Signup() {
    const [alertMessage, setAlertMessage] = useState(null);
    // const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            company: "",
            address: "",
            profilePicture: "",
        },
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("profilePicture", file);
        }
    };

    // const handleSubmit = async (values: z.infer<typeof formSchema>) => {



    //     const response = await fetch("http://localhost:3000/jobprovider/createAccount", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //         body: JSON.stringify(values),
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     // console.log(data.accessToken);

    //     if (response.status === 201) {
    //         // window.location.href = "/dashboard";
    //         // document.cookie = `accessToken=${data.accessToken}; max-age=86400; path=/, HttpOnly=true`;
    //         // window.location.href = "/dashboard";
    //     } else {
    //         alert("Invalid credentials");
    //     }

    // };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();

        // Append all text fields
        for (const key in values) {
            if (key !== "profilePicture" && values[key]) {
                formData.append(key, values[key]);
            }
        }

        // Append file separately
        if (values.profilePicture) {
            formData.append("profilePicture", values.profilePicture);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/jobprovider/createAccoun`, {
            method: "POST",
            body: formData, // send formData as body
        });

        const data = await response.json();
        console.log(data);

        if (response.status !== 201) {
            setAlertMessage(data.message);
        } else {
            window.location.href = "/auth/login";
            // router.push("/auth/login");
            console.log(data);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
            <Card className="px-10 pt-3">
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="max-w-md w-full flex flex-col gap-4 mt-5"
                        >
                            {alertMessage && (
                                <Alert>
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle>Error!</AlertTitle>
                                    <AlertDescription>
                                        {alertMessage}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="email"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="username"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Company</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="company"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="address"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Profile Picture</FormLabel>
                                            <FormControl>
                                                <input type="file" name="profilePicture" onChange={handleImageUpload} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />


                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div >
    );
}