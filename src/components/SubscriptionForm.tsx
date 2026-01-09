import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    callTime: z.string().min(1, { message: "Please select a call time" }),
    timezone: z.string().min(1, { message: "Please select a timezone" }),
    consent: z.boolean().default(false).refine((val) => val === true, {
        message: "You must agree to receive phone calls.",
    }),
});

export function SubscriptionForm() {
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            phone: "",
            callTime: "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            consent: false,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        // Format timestamp: "Wednesday, December 3, 2025 9:56 AM"
        const timestamp = format(new Date(), "EEEE, MMMM d, yyyy h:mm a");

        const payload = {
            firstname: values.firstName,
            phone: values.phone,
            time: values.callTime,
            timezone: values.timezone,
            consent: values.consent,
            timestamp,
        };

        try {
            // TODO: Replace with the actual Google Apps Script Web App URL provided by the user
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8kfXYTb2Y7nBML3wQDtW9jk0owoZs9nbnH1WIqfu3APtXTaF0cD5C7FPuSZzJRVlj/exec";



            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Important for Google Apps Script
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Since mode is 'no-cors', we can't read the response status directly,
            // but if it doesn't throw, we assume it went through.
            toast.success("Subscribed!", {
                description: "You have been successfully added to the list.",
            });

            form.reset();
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                            className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <PhoneInput
                                            placeholder="Phone Number"
                                            {...field}
                                            className="flex h-10 w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white [&_.PhoneInputCountrySelect]:text-black [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:text-white [&_.PhoneInputInput]:outline-none"
                                            defaultCountry="US"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="callTime"
                                render={({ field }) => (
                                    <FormItem className="w-full sm:w-1/2">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                                                    <SelectValue placeholder="Call Time" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                                                <SelectItem value="01:00 AM">1:00 AM</SelectItem>
                                                <SelectItem value="02:00 AM">2:00 AM</SelectItem>
                                                <SelectItem value="03:00 AM">3:00 AM</SelectItem>
                                                <SelectItem value="04:00 AM">4:00 AM</SelectItem>
                                                <SelectItem value="05:00 AM">5:00 AM</SelectItem>
                                                <SelectItem value="06:00 AM">6:00 AM</SelectItem>
                                                <SelectItem value="07:00 AM">7:00 AM</SelectItem>
                                                <SelectItem value="08:00 AM">8:00 AM</SelectItem>
                                                <SelectItem value="09:00 AM">9:00 AM</SelectItem>
                                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="timezone"
                                render={({ field }) => (
                                    <FormItem className="w-full sm:w-1/2">
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                                                    <SelectValue placeholder="Timezone" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Intl.supportedValuesOf('timeZone').map((tz) => (
                                                    <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-white data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-gray-400 font-normal">
                                            I agree to receive phone calls from Sunrise Manna. Standard rates may apply.
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Subscribing..."
                        ) : (
                            <>
                                <Phone className="mr-2 h-4 w-4" />
                                Call Me Tomorrow Morning
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
