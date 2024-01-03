"use client";
import { Pencil, Trash2, Users } from "lucide-react";
import React, { useState, useEffect } from 'react';

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Cookies from "js-cookie";

type Job = {
    id: number,
    title: string,
    jobType: string,
    description: string,
    salary: number,
    vacancy: number,
    address: string,
    JobLocationType: string,
};
async function getJobs() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/job/showPostedJobs`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
    });

    const data = await response.json();
    console.log(data);
    return data;
};

const handleDelete = async (id: number) => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/job/deleteJob/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export default function AllJobs() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        getJobs().then((data) => {
            setJobs(data);
        });
    }, [AlertDialogAction]);

    return (
        <main>
            <div className="grid grid-cols-3 gap-8 mx-5">
                {jobs.map((job: Job) => (
                    <Card key={job.id} className="px-100 pt-3 flex flex-col">
                        <CardHeader>
                            <div>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>Job type: {job.jobType}</p>
                            <p>Salary: {job.salary}</p>
                            <p>Vacancy: {job.vacancy}</p>
                            <p>Address: {job.address}</p>
                            <p>Location type: {job.JobLocationType}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button className=' my-2'>
                                <Pencil className="mr-2 h-4 w-4" />
                                <a href={`/jobprovider/editjob/${job.id}`}>Edit</a>

                            </Button>
                            <Button className=' my-2' variant="secondary">
                                <Users className="mr-2 h-4 w-4" />
                                <a href={`/jobprovider/deletejob/${job.id}`}>Show Applicaents jobs</a>
                            </Button>
                            <Button className=' my-2' variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <AlertDialog>
                                    <AlertDialogTrigger>Open</AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your posted job.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(job.id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}