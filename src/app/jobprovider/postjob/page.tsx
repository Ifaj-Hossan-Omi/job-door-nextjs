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
import Cookies from "js-cookie";
// import { useRouter } from 'next/router';


const formSchema = z
    .object({
        title: z.string(),
        jobType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP"]),
        description: z.string(),
        salary: z.number(),
        vacancy: z.number(),
        address: z.string(),
        JobLocationType: z.enum(["Remote", "Office", "Hybrid"]),
    })

export default function CreateJob() {
    const [alertMessage, setAlertMessage] = useState(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            salary: 0,
            vacancy: 0,
            address: "",
        },
    });

    const jobType = form.watch("jobType");
    const JobLocationType = form.watch("JobLocationType");

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/job/postjob`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);

        if (response.status !== 201) {
            setAlertMessage(data.message);
        } else {
            // window.location.href = "/auth/login";
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
                                name="title"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="title"
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
                                name="jobType"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Job type</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an job type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                                                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="description"
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
                                name="salary"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Salary</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="salary"
                                                    type="number"
                                                    {...parseInt(field)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="vacancy"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Vacancy</FormLabel>
                                            <FormControl>
                                                <Input placeholder="vacancy" type="number" {...parseInt(field)} />
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
                                name="JobLocationType"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Job location type</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an location type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Remote">Remote</SelectItem>
                                                    <SelectItem value="Office">Office</SelectItem>
                                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                </SelectContent>
                                            </Select>
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