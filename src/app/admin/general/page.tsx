"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/core/ui/card";
import { Button } from "@/components/core/ui/button";
import { Settings, User, Building2, Globe, Bell, Palette } from "lucide-react";

export default function GeneralSettingsPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profile
                        </CardTitle>
                        <CardDescription>Your personal account settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">User Name</p>
                                <p className="text-sm text-muted-foreground">user@example.com</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Edit Profile</Button>
                    </CardContent>
                </Card>

                {/* Business Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Business
                        </CardTitle>
                        <CardDescription>Your business information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Business Name</span>
                                <span className="text-sm font-medium">My Business</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Industry</span>
                                <span className="text-sm font-medium">E-Commerce</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Edit Business Info</Button>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>Configure your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Email notifications</span>
                                <span className="text-sm text-green-500">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Push notifications</span>
                                <span className="text-sm text-green-500">Enabled</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            Appearance
                        </CardTitle>
                        <CardDescription>Customize your interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Theme</span>
                                <span className="text-sm font-medium">Dark</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Language</span>
                                <span className="text-sm font-medium">English</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
